import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Eye } from "lucide-react";
import { getTemplateBySlug, listTemplates } from "@/lib/store";
import { toCardData } from "@/lib/templates";
import { faqs, reimaginedFeatures } from "@/lib/content";
import { formatPrice, orderUrl, site } from "@/lib/site";
import { Badge, buttonClass } from "@/components/ui";
import { ImageGallery, OpenGalleryButton } from "@/components/templates/ImageGallery";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { FAQList } from "@/components/FAQItem";
import { PhoneMockup } from "@/components/PhoneMockup";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await listTemplates()).map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = await getTemplateBySlug((await params).slug);
  if (!template) return { title: "Template not found" };
  const title = `${template.title} — ${template.category} Wedding Invitation Website`;
  const description = `${template.description} Personalise the ${template.title} template with your names, events, photos and RSVP — ${formatPrice(template.price)}.`;
  return {
    title,
    description,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: { title, description, url: `/templates/${template.slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const included = [
  "A personalised invitation website with your own link",
  "Up to 8 events — haldi to reception — each with venue map",
  "Photo gallery and your love story",
  "Guest RSVP with a simple response list",
  "Background music of your choice",
  "Unlimited edits until your wedding day",
  "WhatsApp-ready link preview",
];

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const [template, all] = await Promise.all([getTemplateBySlug(slug), listTemplates()]);
  if (!template) notFound();

  const gallery = [...new Set([template.thumbnail, ...template.previewImages].filter(Boolean))];
  const screenIndex = gallery.findIndex((src) => src.includes("screen"));
  const screen = screenIndex >= 0 ? gallery[screenIndex] : undefined;
  const related = [
    ...all.filter((t) => t.id !== template.id && t.category === template.category),
    ...all.filter((t) => t.id !== template.id && t.category !== template.category && t.style === template.style),
    ...all.filter((t) => t.id !== template.id),
  ]
    .filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i)
    .slice(0, 3);
  const buy = orderUrl(template.title);
  const external = buy.startsWith("http");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${template.title} wedding invitation website`,
          description: template.description,
          category: `${template.category} wedding invitation`,
          image: gallery.map((src) => (src.startsWith("http") ? src : `${site.url}${src}`)),
          brand: { "@type": "Brand", name: site.name },
          offers: {
            "@type": "Offer",
            price: template.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `${site.url}/templates/${template.slug}`,
          },
        }}
      />

      <div className="container-x pt-6 sm:pt-10">
        <Link href="/templates" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" /> All templates
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <ImageGallery images={gallery} title={template.title} />

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-wrap gap-1.5">
              <Badge>{template.category}</Badge>
              <Badge>{template.style}</Badge>
              {template.newRelease && <Badge dark>New</Badge>}
            </div>
            <h1 className="mt-5 text-[48px] leading-[0.95] font-semibold tracking-[-0.05em] sm:text-[64px]">{template.title}</h1>
            <p className="mt-4 flex items-baseline gap-3 text-[24px] font-semibold tabular-nums">
              {formatPrice(template.price)}
              {template.compareAtPrice && template.compareAtPrice > template.price && (
                <s className="text-[16px] font-normal text-muted">{formatPrice(template.compareAtPrice)}</s>
              )}
              <span className="text-[13px] font-medium text-muted">one-time</span>
            </p>
            <p className="mt-6 text-[16px] leading-relaxed text-muted sm:text-[17px]">{template.description}</p>

            <div className="mt-8 hidden flex-col gap-3 sm:flex-row lg:flex">
              <a href={buy} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className={buttonClass({ size: "lg" }, "flex-1")}>
                Choose This Template <ArrowUpRight className="size-4" />
              </a>
              <OpenGalleryButton index={screenIndex >= 0 ? screenIndex : 0} className={buttonClass({ variant: "outline", size: "lg" }, "flex-1")}>
                <Eye className="size-4" /> Preview
              </OpenGalleryButton>
            </div>

            <ul className="mt-8 space-y-3 border-t border-line pt-7 text-[15px]">
              {included.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-pine" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] text-muted">Ready in 24–48 hours · No recurring charges</p>
          </div>
        </div>

        {(screen || template.video) && (
          <section className="mt-24 grid items-center gap-10 overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-white sm:px-12 lg:mt-32 lg:grid-cols-2 lg:px-16 lg:py-20" data-reveal>
            <div>
              <p className="eyebrow text-white/50">{template.video ? "Video preview" : "Full-screen preview"}</p>
              <h2 className="mt-4 text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl">
                See {template.title} the way <span className="font-serif font-normal italic">your guests will.</span>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/65">
                Designed for phones first — it opens straight from WhatsApp with your names, countdown, events and RSVP.
              </p>
              {screen && (
                <OpenGalleryButton index={screenIndex} className={buttonClass({ variant: "light", size: "lg" }, "mt-8 w-full sm:w-auto")}>
                  <Eye className="size-4" /> Open full-screen preview
                </OpenGalleryButton>
              )}
            </div>
            <div className="flex justify-center">
              {template.video ? (
                <video
                  src={template.video}
                  controls
                  playsInline
                  preload="metadata"
                  poster={template.thumbnail.endsWith(".svg") ? undefined : template.thumbnail}
                  className="aspect-[9/16] max-h-[560px] w-auto rounded-[28px] bg-black"
                />
              ) : (
                screen && <PhoneMockup src={screen} alt={`${template.title} website on a phone`} className="w-[240px] sm:w-[270px]" />
              )}
            </div>
          </section>
        )}

        <section className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl" data-reveal>Features</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {reimaginedFeatures.map((f) => (
                <li key={f.title} data-reveal>
                  <p className="font-semibold tracking-tight">{f.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-line bg-card p-7 sm:p-10" data-reveal>
            <h2 className="text-[28px] font-semibold tracking-[-0.035em] sm:text-[34px]">What&apos;s included</h2>
            <ul className="mt-6 space-y-3.5 text-[15px]">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-pine" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12">
          <h2 className="text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl lg:col-span-4" data-reveal>
            Good to <span className="font-serif font-normal italic">know.</span>
          </h2>
          <FAQList items={faqs.filter((_, i) => [1, 2, 5, 7, 11, 12].includes(i))} className="lg:col-span-8" />
        </section>

        {related.length > 0 && (
          <section className="mt-24 lg:mt-32">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl" data-reveal>
                You may also <span className="font-serif font-normal italic">love.</span>
              </h2>
              <Link href="/templates" className="hidden shrink-0 text-[14px] font-semibold underline underline-offset-4 sm:block">
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {related.map((t) => (
                <TemplateCard key={t.id} template={toCardData(t)} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky purchase bar */}
      <div data-sticky-cta className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-muted">{template.title}</p>
            <p className="text-[17px] font-semibold tabular-nums">{formatPrice(template.price)}</p>
          </div>
          <OpenGalleryButton index={screenIndex >= 0 ? screenIndex : 0} className={buttonClass({ variant: "outline" }, "px-4")}>
            <Eye className="size-4" />
            <span className="sr-only">Preview</span>
          </OpenGalleryButton>
          <a href={buy} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className={buttonClass({}, "px-5")}>
            Choose Template
          </a>
        </div>
      </div>
    </>
  );
}
