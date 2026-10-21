import "server-only";
import path from "node:path";
import { STORAGE_DIR } from "./store";

/** Uploaded media lives beside the data file and is served by /media/[...path]. */
export const UPLOAD_DIR = path.join(STORAGE_DIR, "uploads");

export const UPLOAD_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
