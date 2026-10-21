import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge, Img } from "../ui";
import { formatPrice } from "@/lib/site";
import type { Template } from "@/lib/types";

export type TemplateCardData = Pick<
  Template,
  "id" | "slug" | "title" | "category" | "style" | "description" | "price" | "compareAtPrice" | "thumbnail" | "previewImages" | "newRelease" | "featured"
>;

// A soft "tabletop" tint per design style, so the grid never feels uniform.
const surfaces: Record<string, string> = {
  Minimal: "#ece8e1",
  Floral: "#e5ebe1",
  Royal: "#efe5d8",
  Contemporary: "#f3e3dc",
  Traditional: "#f2e8d3",
  Editorial: "#e6e4df",
  Colorful: "#f8e2d4",
};

export function TemplateCard({ template, priority = false }: { template: TemplateCardData; priority?: boolean }) {
  const screen = template.previewImages.find((src) => src !== template.thumbnail && src.includes("screen"));
  return (
    <article
      data-template-card
      className="group relative flex flex-col rounded-[26px] border border-line/80 bg-card p-2.5 transition-[transform,box-shadow,border-color] duration-500 ease-soft hover:-translate-y-1.5 hover:border-line hover:shadow-lift"
    >
      <Link
        href={`/templates/${template.slug}`}
        className="relative block aspect-[4/4.4] overflow-hidden rounded-[19px]"
        style={{ backgroundColor: surfaces[template.style] ?? "#ece8e1" }}
        aria-label={`View ${template.title} template`}
      >
        <div className="absolute inset-[9%_14%] transition-transform duration-[900ms] ease-soft group-hover:scale-[1.05] group-hover:-rotate-1">
          <Img
            src={template.thumbnail}
            alt={`${template.title} — ${template.category} wedding invitation design`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain drop-shadow-[0_22px_28px_rgba(40,25,10,0.28)]"
          />
        </div>
        {screen && (
          <div className="pointer-events-none absolute right-[6%] bottom-[-30%] hidden aspect-[390/844] w-[27%] translate-y-6 overflow-hidden rounded-[14px] border-[3px] border-ink bg-ink opacity-0 shadow-lift transition-all duration-700 ease-soft group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <Img src={screen} alt="" fill sizes="120px" className="object-cover object-top" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge>{template.category}</Badge>
          {template.newRelease && <Badge dark>New</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[19px] font-semibold tracking-[-0.03em]">
            <Link href={`/templates/${template.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {template.title}
            </Link>
          </h3>
          <p className="shrink-0 text-[15px] font-semibold tabular-nums">
            {template.compareAtPrice && template.compareAtPrice > template.price && (
              <s className="mr-1.5 text-[13px] font-normal text-muted">{formatPrice(template.compareAtPrice)}</s>
            )}
            {formatPrice(template.price)}
          </p>
        </div>
        <p className="mt-1 text-[12px] font-medium tracking-wide text-muted uppercase">{template.style}</p>
        <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-muted">{template.description}</p>
        <span className="relative mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-ink/12 text-[13px] font-semibold transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          View Template
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
