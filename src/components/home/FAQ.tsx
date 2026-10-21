import Link from "next/link";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { FAQList } from "../FAQItem";

export function FAQ() {
  return (
    <section id="faqs" className="border-t border-line bg-white/50 py-24 sm:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-[40px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[60px]" data-reveal>
              Questions?
              <br />
              <span className="font-serif font-normal italic">We&apos;ve got answers.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted" data-reveal>
              Still unsure about something?{" "}
              <Link href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                Write to us
              </Link>{" "}
              — a real person replies within a day.
            </p>
          </div>
        </div>
        <FAQList items={faqs} className="lg:col-span-8" />
      </div>
    </section>
  );
}
