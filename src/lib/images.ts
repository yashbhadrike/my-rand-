import type { ImageAsset } from "./types";

/**
 * Single registry for every editorial photo on the marketing site.
 * Swap these for uploads from /admin (paths like /media/...) or a CDN —
 * components only ever reference images by key.
 */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  brideRed: { src: unsplash("1610173827043-9db50e0d8ef9"), alt: "Bride in a red bridal outfit with gold jewellery" },
  coupleCanopy: { src: unsplash("1587271636175-90d58cdad458"), alt: "Couple in traditional attire under a floral canopy" },
  hennaHands: { src: unsplash("1621801306185-8c0ccf9c8eb8"), alt: "Hands with intricate henna holding each other" },
  coupleSteps: { src: unsplash("1630526720753-aa4e71acf67d"), alt: "Couple in Indian wedding attire standing on steps" },
  brideGroom: { src: unsplash("1722952934708-749c22eb2e58"), alt: "Bride and groom posing together" },
  ritual: { src: unsplash("1587271407850-8d438ca9fdf2"), alt: "Couple performing a wedding ritual under a floral mandap" },
  brideDupatta: { src: unsplash("1587271315307-eaebc181c749"), alt: "Bride in a red and gold dupatta" },
  groomSehra: { src: unsplash("1597157639073-69284dc0fdaf"), alt: "Groom holding a red and gold turban" },
  rings: { src: unsplash("1542042161784-26ab9e041e89"), alt: "Hands with wedding rings" },
  flowerCanopy: { src: unsplash("1727430256509-0f897d6f4765"), alt: "Couple standing under a canopy of flowers" },
  sherwaniKiss: { src: unsplash("1599462616558-2b75fd26a283"), alt: "Groom in a white sherwani with the bride" },
  attire: { src: unsplash("1665960213508-48f07086d49c"), alt: "Couple in traditional Indian attire" },
  greenSari: { src: unsplash("1611106211090-8f3c79eb8552"), alt: "Woman in a green and gold sari" },
  aisle: { src: unsplash("1772127822552-ce9ef537bdcf"), alt: "Decorated wedding arch with a floral aisle" },
  reception: { src: unsplash("1772127822525-7eda37383b9f"), alt: "Outdoor wedding reception with a draped canopy" },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
