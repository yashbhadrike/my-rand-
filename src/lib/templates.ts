import type { TemplateCardData } from "@/components/templates/TemplateCard";
import type { Template } from "./types";

/** Trim a template to what cards need before it crosses into client components. */
export function toCardData(t: Template): TemplateCardData {
  const { id, slug, title, category, style, description, price, compareAtPrice, thumbnail, previewImages, newRelease, featured } = t;
  return { id, slug, title, category, style, description, price, compareAtPrice, thumbnail, previewImages, newRelease, featured };
}
