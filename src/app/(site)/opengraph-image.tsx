import { images } from "@/lib/images";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kavyamoment — Beautiful Wedding Invitation Websites";

export default function OgImage() {
  return renderOg({
    eyebrow: "Premium Indian wedding invitations",
    title: "Your Wedding. Your Story. Your Invite.",
    subtitle: "Beautiful wedding invitation websites, made to share.",
    image: images.ritual.src.replace("w=1200", "w=840"),
  });
}
