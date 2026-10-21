import clsx from "clsx";
import { Img } from "../ui";
import type { ImageAsset } from "@/lib/types";

export function FeatureCard({
  kicker,
  title,
  body,
  tone,
  image,
  index,
}: {
  kicker: string;
  title: string;
  body: string;
  tone: string;
  image: ImageAsset;
  index: number;
}) {
  // Alternate the poster layout so the row reads like a set of magazine covers.
  const imageFirst = index % 2 === 1;
  return (
    <article
      className={clsx(
        "flex h-[500px] w-[82vw] max-w-[380px] shrink-0 snap-center flex-col gap-5 overflow-hidden rounded-[28px] p-5 sm:h-[540px] sm:p-6 lg:h-[min(560px,62vh)] lg:w-[420px] lg:max-w-none",
        imageFirst && "flex-col-reverse",
        tone,
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <span className="font-serif text-[56px] leading-none italic opacity-90">{kicker}</span>
          <span className="mt-2 text-[10px] font-semibold tracking-[0.25em] uppercase opacity-70">Kavyamoment</span>
        </div>
        <h3 className="mt-5 text-[30px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-[36px]">{title}</h3>
        <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed opacity-80 sm:text-[15px]">{body}</p>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[20px]">
        <Img src={image.src} alt={image.alt} fill sizes="420px" className="object-cover" />
      </div>
    </article>
  );
}
