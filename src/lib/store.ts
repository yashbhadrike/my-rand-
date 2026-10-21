import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { seedTemplates } from "./seed";
import type { Template, TemplateInput } from "./types";

/**
 * File-backed template store. Data lives in STORAGE_DIR (default ./storage),
 * outside /public so it survives rebuilds. Swap this module for a database
 * client without touching any page or component.
 */
export const STORAGE_DIR = path.resolve(process.env.STORAGE_DIR ?? path.join(process.cwd(), "storage"));
const DB_FILE = path.join(STORAGE_DIR, "templates.json");

let queue: Promise<unknown> = Promise.resolve();

/** Serialise writes so concurrent admin requests can't clobber each other. */
function exclusive<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<Template[]> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8")) as Template[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    const seeded = seedTemplates();
    await writeAll(seeded);
    return seeded;
  }
}

async function writeAll(rows: Template[]) {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(rows, null, 2));
  await fs.rename(tmp, DB_FILE);
}

const bySort = (a: Template, b: Template) => a.sortOrder - b.sortOrder;

export async function listTemplates({ includeUnpublished = false } = {}) {
  const rows = (await readAll()).sort(bySort);
  return includeUnpublished ? rows : rows.filter((t) => t.published);
}

export async function getTemplateBySlug(slug: string, { includeUnpublished = false } = {}) {
  const row = (await readAll()).find((t) => t.slug === slug);
  return row && (includeUnpublished || row.published) ? row : undefined;
}

export async function getTemplateById(id: string) {
  return (await readAll()).find((t) => t.id === id);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function uniqueSlug(rows: Template[], wanted: string, ownId?: string) {
  const base = slugify(wanted) || "template";
  let slug = base;
  for (let n = 2; rows.some((t) => t.slug === slug && t.id !== ownId); n++) slug = `${base}-${n}`;
  return slug;
}

export function createTemplate(input: TemplateInput) {
  return exclusive(async () => {
    const rows = await readAll();
    const now = new Date().toISOString();
    const row: Template = {
      ...input,
      id: `tpl_${randomUUID().slice(0, 8)}`,
      slug: uniqueSlug(rows, input.slug || input.title),
      sortOrder: input.sortOrder || Math.max(0, ...rows.map((t) => t.sortOrder)) + 1,
      createdAt: now,
      updatedAt: now,
    };
    rows.push(row);
    await writeAll(rows);
    return row;
  });
}

export function updateTemplate(id: string, patch: Partial<TemplateInput>) {
  return exclusive(async () => {
    const rows = await readAll();
    const i = rows.findIndex((t) => t.id === id);
    if (i === -1) return undefined;
    const next: Template = { ...rows[i], ...patch, id, updatedAt: new Date().toISOString() };
    if (patch.slug !== undefined || patch.title !== undefined) {
      next.slug = uniqueSlug(rows, patch.slug || next.slug || next.title, id);
    }
    rows[i] = next;
    await writeAll(rows);
    return next;
  });
}

export function deleteTemplate(id: string) {
  return exclusive(async () => {
    const rows = await readAll();
    const next = rows.filter((t) => t.id !== id);
    if (next.length === rows.length) return false;
    await writeAll(next);
    return true;
  });
}

/** Persist a new display order: ids listed first-to-last. */
export function reorderTemplates(ids: string[]) {
  return exclusive(async () => {
    const rows = await readAll();
    const rank = new Map(ids.map((id, i) => [id, i + 1]));
    let tail = ids.length;
    for (const row of rows.sort(bySort)) row.sortOrder = rank.get(row.id) ?? ++tail;
    await writeAll(rows);
    return rows.sort(bySort);
  });
}
