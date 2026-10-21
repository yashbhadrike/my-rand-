import type { Metadata } from "next";
import { listTemplates } from "@/lib/store";
import { toCardData } from "@/lib/templates";
import { CATEGORIES } from "@/lib/types";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Wedding Invitation Website Templates",
  description:
    "Browse premium Indian wedding invitation website templates — Hindu, Marathi, Gujarati, South Indian, Sikh, Muslim, Christian and save-the-dates.",
  alternates: { canonical: "/templates" },
};

export default async function TemplatesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, templates] = await Promise.all([searchParams, listTemplates()]);
  const initial = CATEGORIES.find((c) => c.toLowerCase() === category?.toLowerCase()) ?? "All";

  return (
    <>
      <section className="container-x pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow" data-reveal>
            {templates.length} designs · One-time price
          </p>
          <h1 className="mt-5 text-[44px] leading-[0.98] font-semibold tracking-[-0.05em] sm:text-[72px]" data-reveal>
            Find the invite that <span className="font-serif font-normal italic">feels like you.</span>
          </h1>
          <p className="mt-5 text-[15px] text-muted sm:text-[17px]" data-reveal>
            Every design is a complete wedding website — events, venues, photos and RSVP included.
          </p>
        </div>
        <div className="mt-12">
          <TemplateGrid templates={templates.map(toCardData)} pageSize={12} initialCategory={initial} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
