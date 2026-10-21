"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, checkPassword, createSessionToken, verifySessionToken } from "@/lib/auth";
import * as store from "@/lib/store";
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, UPLOAD_DIR, UPLOAD_TYPES } from "@/lib/uploads";
import { CATEGORIES, STYLES, type Category, type TemplateInput, type TemplateStyle } from "@/lib/types";

async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) redirect("/admin/login");
}

/** Refresh every public page that lists or shows templates. */
function refreshSite(slugs: string[] = []) {
  revalidatePath("/", "layout");
  for (const slug of slugs) revalidatePath(`/templates/${slug}`);
}

// ---------------------------------------------------------------- auth

export async function login(_: { error?: string } | undefined, form: FormData) {
  if (!process.env.ADMIN_PASSWORD) return { error: "ADMIN_PASSWORD is not configured on the server." };
  if (!(await checkPassword(String(form.get("password") ?? "")))) return { error: "That password didn't match." };
  const { token, maxAge } = await createSessionToken();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------------------------------------------------------------- uploads

async function saveUpload(file: File, kind: "image" | "video") {
  const ext = path.extname(file.name).toLowerCase();
  const type = UPLOAD_TYPES[ext];
  if (!type || !type.startsWith(kind)) throw new Error(`"${file.name}" isn't a supported ${kind} file.`);
  const limit = kind === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (file.size > limit) throw new Error(`"${file.name}" is larger than ${limit / 1024 / 1024} MB.`);
  const base = store.slugify(path.basename(file.name, ext)).slice(0, 40) || kind;
  const name = `${base}-${randomUUID().slice(0, 8)}${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/media/${name}`;
}

const files = (form: FormData, key: string) =>
  form.getAll(key).filter((v): v is File => v instanceof File && v.size > 0);

async function removeUploads(urls: string[]) {
  await Promise.all(
    urls
      .filter((u) => u.startsWith("/media/"))
      .map((u) => unlink(path.join(UPLOAD_DIR, path.basename(u))).catch(() => undefined)),
  );
}

// ---------------------------------------------------------------- templates

export type SaveState = { error?: string; ok?: boolean } | undefined;

export async function saveTemplate(id: string | null, _: SaveState, form: FormData): Promise<SaveState> {
  await requireAdmin();
  let saved;
  try {
    const title = String(form.get("title") ?? "").trim();
    const category = String(form.get("category")) as Category;
    const style = String(form.get("style")) as TemplateStyle;
    const price = Number(form.get("price"));
    const compareAt = Number(form.get("compareAtPrice") || 0);
    if (!title) return { error: "Give the template a name." };
    if (!CATEGORIES.includes(category)) return { error: "Choose a category." };
    if (!STYLES.includes(style)) return { error: "Choose a style." };
    if (!Number.isFinite(price) || price < 0) return { error: "Enter a valid price." };

    const existing = id ? await store.getTemplateById(id) : undefined;
    if (id && !existing) return { error: "This template no longer exists." };

    // Keep whichever existing images the editor left, then append new uploads.
    const kept: string[] = JSON.parse(String(form.get("previewImagesJson") || "[]"));
    const uploadedGallery = await Promise.all(files(form, "previewFiles").map((f) => saveUpload(f, "image")));
    const [thumbFile] = files(form, "thumbnailFile");
    const [videoFile] = files(form, "videoFile");
    let thumbnail = String(form.get("thumbnail") ?? "").trim();
    if (thumbFile) thumbnail = await saveUpload(thumbFile, "image");
    let video = String(form.get("video") ?? "").trim() || undefined;
    if (videoFile) video = await saveUpload(videoFile, "video");
    if (form.get("removeVideo") === "on") video = undefined;

    const previewImages = [...kept, ...uploadedGallery];
    if (!thumbnail) thumbnail = previewImages[0] ?? "";
    if (!thumbnail) return { error: "Add a preview image (thumbnail)." };

    const input: TemplateInput = {
      title,
      slug: String(form.get("slug") ?? "").trim() || title,
      description: String(form.get("description") ?? "").trim(),
      category,
      style,
      price: Math.round(price),
      compareAtPrice: compareAt > price ? Math.round(compareAt) : undefined,
      thumbnail,
      previewImages,
      video,
      featured: form.get("featured") === "on",
      newRelease: form.get("newRelease") === "on",
      published: form.get("published") === "on",
      sortOrder: Number(form.get("sortOrder")) || existing?.sortOrder || 0,
    };

    saved = existing ? await store.updateTemplate(existing.id, input) : await store.createTemplate(input);
    if (!saved) return { error: "Couldn't save the template." };

    if (existing) {
      const nowUsed = new Set([saved.thumbnail, ...saved.previewImages, saved.video]);
      await removeUploads([existing.thumbnail, ...existing.previewImages, existing.video ?? ""].filter((u) => !nowUsed.has(u)));
    }
    refreshSite([saved.slug, ...(existing && existing.slug !== saved.slug ? [existing.slug] : [])]);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong." };
  }
  redirect(`/admin?saved=${encodeURIComponent(saved.title)}`);
}

export async function toggleFlag(id: string, flag: "published" | "featured" | "newRelease") {
  await requireAdmin();
  const row = await store.getTemplateById(id);
  if (!row) return;
  await store.updateTemplate(id, { [flag]: !row[flag] });
  refreshSite([row.slug]);
}

export async function reorder(ids: string[]) {
  await requireAdmin();
  await store.reorderTemplates(ids);
  refreshSite();
}

export async function removeTemplate(id: string) {
  await requireAdmin();
  const row = await store.getTemplateById(id);
  if (!row) return;
  await store.deleteTemplate(id);
  await removeUploads([row.thumbnail, ...row.previewImages, row.video ?? ""]);
  refreshSite([row.slug]);
}
