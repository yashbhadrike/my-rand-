export const CATEGORIES = [
  "Hindu",
  "Marathi",
  "Gujarati",
  "South Indian",
  "Sikh",
  "Muslim",
  "Christian",
  "Save the Date",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const STYLES = [
  "Minimal",
  "Floral",
  "Royal",
  "Contemporary",
  "Traditional",
  "Editorial",
  "Colorful",
] as const;

export type TemplateStyle = (typeof STYLES)[number];

export interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  style: TemplateStyle;
  /** Price in INR (whole rupees). */
  price: number;
  /** Optional original price, shown struck through when higher than price. */
  compareAtPrice?: number;
  thumbnail: string;
  previewImages: string[];
  video?: string;
  featured: boolean;
  newRelease: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type TemplateInput = Omit<Template, "id" | "createdAt" | "updatedAt">;

export interface ImageAsset {
  src: string;
  alt: string;
}
