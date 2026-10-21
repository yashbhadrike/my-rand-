import { getTemplateBySlug } from "@/lib/store";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Wedding invitation website template";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const template = await getTemplateBySlug((await params).slug);
  if (!template) return renderOg({ eyebrow: "Wedding invitation websites", title: "Kavyamoment", subtitle: "Beautiful digital invitations." });
  const photo = [template.thumbnail, ...template.previewImages].find((src) => !src.endsWith(".svg"));
  return renderOg({
    eyebrow: `${template.category} · ${template.style}`,
    title: template.title,
    subtitle: `Wedding invitation website · INR ${template.price.toLocaleString("en-IN")}`,
    image: photo,
  });
}
