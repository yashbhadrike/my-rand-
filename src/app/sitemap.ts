import type { MetadataRoute } from "next";
import { listTemplates } from "@/lib/store";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const templates = await listTemplates();
  const pages = ["", "/templates", "/about", "/contact", "/privacy", "/terms", "/refund"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.6 })),
    ...templates.map((t) => ({ url: `${site.url}/templates/${t.slug}`, lastModified: t.updatedAt, priority: 0.8 })),
  ];
}
