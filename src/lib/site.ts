export const site = {
  name: "Kavyamoment",
  title: "Kavyamoment — Beautiful Wedding Invitation Websites",
  description:
    "Create a beautiful digital wedding invitation website in minutes. Choose a design, personalise your story and share it with your guests.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  instagramHandle: "kavyamoment",
  instagramUrl: "https://www.instagram.com/kavyamoment",
  email: "hello@kavyamoment.com",
  /** WhatsApp number (digits only, with country code) used for orders. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
};

export const nav = [
  { label: "Templates", href: "/#templates" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "FAQs", href: "/#faqs" },
];

export function orderUrl(templateTitle: string) {
  const message = `Hi Kavyamoment! I'd like to create my wedding invite with the ${templateTitle} template.`;
  if (site.whatsapp) return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(`${templateTitle} template`)}&body=${encodeURIComponent(message)}`;
}

export function formatPrice(rupees: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(rupees);
}
