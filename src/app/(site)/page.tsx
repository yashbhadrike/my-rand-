import { listTemplates } from "@/lib/store";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { toCardData } from "@/lib/templates";
import { Hero } from "@/components/home/Hero";
import { Reimagined } from "@/components/home/Reimagined";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Comparison } from "@/components/home/Comparison";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Instagram } from "@/components/home/Instagram";
import { CTASection } from "@/components/CTASection";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 300;

export default async function HomePage() {
  const templates = await listTemplates();
  const featured = templates.filter((t) => t.featured);
  const heroCards = (featured.length >= 5 ? featured : templates).slice(0, 9);
  const screenOf = (slug: string) => templates.find((t) => t.slug === slug)?.previewImages.find((p) => p.includes("screen"));

  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, sameAs: [site.instagramUrl] },
          { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <Hero cards={heroCards.map(({ slug, title, thumbnail, category }) => ({ slug, title, thumbnail, category }))} />

      <section id="templates" className="container-x py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[38px] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[72px]" data-reveal>
            Designed for your <span className="font-serif font-normal italic">BIG</span> day.
          </h2>
          <p className="mt-5 text-[15px] text-muted sm:text-[17px]" data-reveal>
            Pick a design. Add your story. Share it with your guests.
          </p>
        </div>
        <div className="mt-10 sm:mt-12">
          <TemplateGrid templates={templates.map(toCardData)} />
        </div>
      </section>

      <Reimagined screen={screenOf("jaipur") ?? "/templates/jaipur-screen.svg"} />
      <FeatureShowcase />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <FAQ />
      <Instagram />
      <CTASection screen={screenOf("ayodhya")} />
    </>
  );
}
