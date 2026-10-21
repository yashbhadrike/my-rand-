import { MapPin } from "lucide-react";
import { Img } from "../ui";
import type { ImageAsset } from "@/lib/types";

export function TestimonialCard({
  names,
  place,
  tag,
  quote,
  image,
}: {
  names: string;
  place: string;
  tag: string;
  quote: string;
  image: ImageAsset;
}) {
  return (
    <figure className="group relative aspect-[3/4.4] w-[78vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[26px] bg-ink text-white sm:w-[320px]">
      <Img
        src={image.src}
        alt={image.alt}
        fill
        sizes="340px"
        className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 from-25% via-black/45 via-55% to-black/90" />
      <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
        <MapPin className="size-3" /> {place} · {tag}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <blockquote className="font-serif text-[21px] leading-[1.25] sm:text-[23px]">&ldquo;{quote}&rdquo;</blockquote>
        <figcaption className="mt-4 text-[13px] font-semibold tracking-wide">{names}</figcaption>
      </div>
    </figure>
  );
}
