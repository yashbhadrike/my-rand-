import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { UPLOAD_DIR, UPLOAD_TYPES } from "@/lib/uploads";

/** Serves admin uploads from storage (files added after build aren't served from /public). */
export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path;
  const file = path.resolve(UPLOAD_DIR, ...parts);
  const type = UPLOAD_TYPES[path.extname(file).toLowerCase()];
  if (!file.startsWith(UPLOAD_DIR + path.sep) || !type) return new Response("Not found", { status: 404 });

  let size: number;
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error();
    size = info.size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const headers: Record<string, string> = {
    "Content-Type": type,
    "Accept-Ranges": "bytes",
    // Uploaded filenames are unique, so they can be cached forever.
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  };

  // Byte ranges let browsers (notably Safari) seek and play videos.
  const range = req.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (range) {
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start >= size || start > end) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }
    const stream = Readable.toWeb(createReadStream(file, { start, end })) as ReadableStream;
    return new Response(stream, {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
    });
  }

  const stream = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new Response(stream, { headers: { ...headers, "Content-Length": String(size) } });
}
