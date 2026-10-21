"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Star, X } from "lucide-react";
import { saveTemplate } from "@/app/admin/actions";
import { CATEGORIES, STYLES, type Template } from "@/lib/types";
import { Img, buttonClass } from "../ui";
import { Field, Panel, inputClass } from "./fields";

function Check({ name, label, hint, defaultChecked }: { name: string; label: string; hint: string; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3.5 transition hover:border-ink/30 has-[:checked]:border-ink">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 size-4 accent-ink" />
      <span>
        <span className="block text-[14px] font-semibold">{label}</span>
        <span className="block text-[12px] text-muted">{hint}</span>
      </span>
    </label>
  );
}

export function TemplateForm({ template }: { template?: Template }) {
  const [state, action, pending] = useActionState(saveTemplate.bind(null, template?.id ?? null), undefined);
  const [gallery, setGallery] = useState<string[]>(template?.previewImages ?? []);
  const [thumbnail, setThumbnail] = useState(template?.thumbnail ?? "");
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [newFiles, setNewFiles] = useState<string[]>([]);

  const move = (i: number, dir: -1 | 1) =>
    setGallery((g) => {
      const next = [...g];
      const j = i + dir;
      if (j < 0 || j >= next.length) return g;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Panel title="Details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Template name">
              <input name="title" required defaultValue={template?.title} placeholder="e.g. Rajwada" className={inputClass} />
            </Field>
            <Field label="URL slug" hint="Leave empty to generate from the name.">
              <input name="slug" defaultValue={template?.slug} placeholder="rajwada" className={inputClass} />
            </Field>
          </div>
          <Field label="Description" hint="One or two sentences shown on cards and the template page.">
            <textarea name="description" rows={3} defaultValue={template?.description} className={inputClass} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Category">
              <select name="category" required defaultValue={template?.category ?? ""} className={inputClass}>
                <option value="" disabled>Choose…</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Design style">
              <select name="style" required defaultValue={template?.style ?? "Minimal"} className={inputClass}>
                {STYLES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Price (₹)">
              <input name="price" type="number" min={0} step={1} required defaultValue={template?.price} className={inputClass} />
            </Field>
            <Field label="Original price (₹)" hint="Optional — shown struck through.">
              <input name="compareAtPrice" type="number" min={0} step={1} defaultValue={template?.compareAtPrice} className={inputClass} />
            </Field>
          </div>
        </Panel>

        <Panel title="Preview image (thumbnail)">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="relative aspect-[4/5] w-full max-w-[160px] shrink-0 overflow-hidden rounded-2xl bg-sand">
              {thumbPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumbPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                thumbnail && <Img src={thumbnail} alt="" fill sizes="160px" className={thumbnail.endsWith(".svg") ? "object-contain p-2" : "object-cover"} />
              )}
            </div>
            <div className="flex-1 space-y-4">
              <Field label="Upload new thumbnail" hint="JPG, PNG, WebP or AVIF · up to 10 MB. Portrait 4:5 works best.">
                <input
                  name="thumbnailFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setThumbPreview(f ? URL.createObjectURL(f) : null);
                  }}
                  className="mt-1.5 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-white"
                />
              </Field>
              <Field label="…or image URL / path">
                <input name="thumbnail" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="/templates/rajwada.svg" className={inputClass} />
              </Field>
            </div>
          </div>
        </Panel>

        <Panel title="Gallery images">
          <input type="hidden" name="previewImagesJson" value={JSON.stringify(gallery)} />
          {gallery.length > 0 && (
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {gallery.map((src, i) => (
                <li key={src + i} className="group relative aspect-square overflow-hidden rounded-xl bg-sand">
                  <Img src={src} alt="" fill sizes="160px" className={src.endsWith(".svg") ? "object-contain p-2" : "object-cover"} />
                  <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between gap-1">
                    <button type="button" aria-label="Move earlier" onClick={() => move(i, -1)} className="grid size-7 place-items-center rounded-full bg-white/90 shadow">
                      <ArrowLeft className="size-3.5" />
                    </button>
                    <button type="button" aria-label="Use as thumbnail" title="Use as thumbnail" onClick={() => { setThumbnail(src); setThumbPreview(null); }} className="grid size-7 place-items-center rounded-full bg-white/90 shadow">
                      <Star className={`size-3.5 ${thumbnail === src ? "fill-haldi text-haldi" : ""}`} />
                    </button>
                    <button type="button" aria-label="Move later" onClick={() => move(i, 1)} className="grid size-7 place-items-center rounded-full bg-white/90 shadow">
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                  <button type="button" aria-label="Remove image" onClick={() => setGallery((g) => g.filter((_, j) => j !== i))} className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-white/90 shadow hover:bg-rouge hover:text-white">
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line px-4 py-8 text-center transition hover:border-ink/40">
            <ImagePlus className="size-5 text-muted" />
            <span className="text-[14px] font-semibold">Add gallery images</span>
            <span className="text-[12px] text-muted">
              {newFiles.length ? `${newFiles.length} selected: ${newFiles.join(", ")}` : "Select multiple files · added after the images above"}
            </span>
            <input
              name="previewFiles"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(e) => setNewFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
              className="sr-only"
            />
          </label>
        </Panel>

        <Panel title="Invitation video">
          {template?.video && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <video src={template.video} controls preload="metadata" className="aspect-[9/16] w-32 rounded-xl bg-black" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="removeVideo" className="size-4 accent-rouge" /> Remove current video
              </label>
            </div>
          )}
          <Field label="Upload video" hint="MP4, WebM or MOV · up to 50 MB. Vertical 9:16 recommended.">
            <input name="videoFile" type="file" accept="video/mp4,video/webm,video/quicktime" className="mt-1.5 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-white" />
          </Field>
          <Field label="…or video URL">
            <input name="video" defaultValue={template?.video ?? ""} placeholder="https://…/preview.mp4" className={inputClass} />
          </Field>
        </Panel>
      </div>

      <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
        <Panel title="Visibility">
          <Check name="published" label="Published" hint="Visible on the website." defaultChecked={template?.published ?? true} />
          <Check name="featured" label="Featured" hint="Shown in the homepage hero." defaultChecked={template?.featured ?? false} />
          <Check name="newRelease" label="New release" hint="Adds a “New” badge." defaultChecked={template?.newRelease ?? true} />
          <Field label="Sort order" hint="Lower numbers appear first. You can also reorder from the list.">
            <input name="sortOrder" type="number" min={0} defaultValue={template?.sortOrder} className={inputClass} />
          </Field>
        </Panel>
        {state?.error && (
          <p role="alert" className="rounded-xl border border-rouge/20 bg-rouge/5 px-4 py-3 text-sm text-rouge">
            {state.error}
          </p>
        )}
        <div className="flex gap-3">
          <Link href="/admin" className={buttonClass({ variant: "outline" }, "flex-1")}>
            Cancel
          </Link>
          <button disabled={pending} className={buttonClass({}, "flex-1")}>
            {pending ? "Saving…" : template ? "Save changes" : "Create template"}
          </button>
        </div>
      </div>
    </form>
  );
}
