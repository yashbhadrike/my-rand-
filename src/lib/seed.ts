import type { Template } from "./types";
import { images } from "./images";

type SeedRow = Pick<Template, "title" | "category" | "style" | "price" | "description"> &
  Partial<Pick<Template, "featured" | "newRelease" | "compareAtPrice">> & { photo: string };

const rows: SeedRow[] = [
  { title: "Ayodhya", category: "Hindu", style: "Royal", price: 2499, compareAtPrice: 3499, featured: true, photo: images.ritual.src, description: "A regal maroon-and-gold invite with a carved arch, mandala crest and a slow reveal of every ceremony." },
  { title: "Rajwada", category: "Hindu", style: "Royal", price: 2999, featured: true, newRelease: true, photo: images.coupleSteps.src, description: "Palace blues and antique gold for a destination celebration that feels like a royal procession." },
  { title: "Mehfil", category: "Muslim", style: "Editorial", price: 2299, featured: true, photo: images.sherwaniKiss.src, description: "Magazine-style typography in deep emerald, made for a nikah, walima and everything in between." },
  { title: "Utsav", category: "Gujarati", style: "Colorful", price: 1999, featured: true, newRelease: true, photo: images.greenSari.src, description: "Bunting, marigolds and garba energy — a joyful invite that feels like the first beat of the dhol." },
  { title: "Jaipur", category: "Hindu", style: "Contemporary", price: 2199, featured: true, photo: images.coupleCanopy.src, description: "A sunset-pink arch with soft geometry. Modern, warm and made for long weekend celebrations." },
  { title: "Kashi", category: "Hindu", style: "Traditional", price: 1799, featured: true, photo: images.brideRed.src, description: "Temple borders, sacred motifs and parchment tones for a classic Shubh Vivah." },
  { title: "Mogra", category: "South Indian", style: "Floral", price: 1999, featured: true, newRelease: true, photo: images.hennaHands.src, description: "Jasmine whites and banana-leaf greens — fresh, fragrant and quietly elegant." },
  { title: "Saanjh", category: "Save the Date", style: "Minimal", price: 999, featured: true, photo: images.rings.src, description: "A calm, minimal save-the-date with a single golden-hour accent. Send it the day you decide." },
  { title: "Aangan", category: "Marathi", style: "Contemporary", price: 1899, featured: true, photo: images.attire.src, description: "Soft lavender courtyards and clean lines for a modern Maharashtrian wedding." },
  { title: "Paithani", category: "Marathi", style: "Traditional", price: 2399, newRelease: true, photo: images.brideDupatta.src, description: "Inspired by the woven borders of a Paithani — aubergine, peacock green and gold." },
  { title: "Anand", category: "Sikh", style: "Minimal", price: 1899, photo: images.groomSehra.src, description: "Warm saffron and ivory for an Anand Karaj, with room for every ceremony from roka to reception." },
  { title: "Noor", category: "Muslim", style: "Editorial", price: 2099, photo: images.brideGroom.src, description: "Ivory pages, bronze ink and generous whitespace — understated and timeless." },
  { title: "Konkan", category: "Christian", style: "Floral", price: 1999, photo: images.aisle.src, description: "Coastal blues and white florals for a church ceremony and a seaside reception." },
  { title: "Kaveri", category: "South Indian", style: "Royal", price: 2599, photo: images.flowerCanopy.src, description: "Kanjeevaram rust and temple gold for a grand South Indian muhurtham." },
  { title: "Ruh", category: "Save the Date", style: "Colorful", price: 1199, newRelease: true, photo: images.reception.src, description: "A bright, playful save-the-date in rani pink and saffron for couples who like a little drama." },
];

export function seedTemplates(): Template[] {
  const now = new Date().toISOString();
  return rows.map((row, i) => {
    const slug = row.title.toLowerCase();
    return {
      id: `tpl_${slug}`,
      slug,
      title: row.title,
      description: row.description,
      category: row.category,
      style: row.style,
      price: row.price,
      compareAtPrice: row.compareAtPrice,
      thumbnail: `/templates/${slug}.svg`,
      previewImages: [`/templates/${slug}.svg`, `/templates/${slug}-screen.svg`, row.photo],
      video: undefined,
      featured: row.featured ?? false,
      newRelease: row.newRelease ?? false,
      published: true,
      sortOrder: i + 1,
      createdAt: now,
      updatedAt: now,
    };
  });
}
