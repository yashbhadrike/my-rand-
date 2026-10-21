import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { UPLOAD_DIR } from "./uploads";

export const ogSize = { width: 1200, height: 630 };

/** Inline a raster image as a data URI (OG renderers can't fetch our own routes at build time). */
async function rasterDataUri(src?: string) {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return /\.(png|jpe?g)(\?|$)|images\.unsplash\.com/.test(src) ? src : undefined;
  const ext = path.extname(src).toLowerCase();
  const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" }[ext];
  if (!mime) return undefined;
  const file = src.startsWith("/media/")
    ? path.join(UPLOAD_DIR, src.slice("/media/".length))
    : path.join(process.cwd(), "public", src);
  try {
    return `data:${mime};base64,${(await readFile(file)).toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function renderOg({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle: string; image?: string }) {
  const photo = await rasterDataUri(image);
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f6f2", color: "#111", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: photo ? 48 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            <div style={{ display: "flex", width: 40, height: 40, borderRadius: "20px 20px 0 0", background: "#111", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#e3a83a" }} />
            </div>
            kavyamoment
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#6b6b6b" }}>{eyebrow}</div>
            <div style={{ fontSize: photo ? 92 : 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1, marginTop: 18 }}>{title}</div>
            <div style={{ fontSize: 30, color: "#6b6b6b", marginTop: 22, lineHeight: 1.3 }}>{subtitle}</div>
          </div>
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" width={420} height={502} style={{ borderRadius: 28, objectFit: "cover" }} />
        )}
      </div>
    ),
    ogSize,
  );
}
