import { testimonials } from "@/lib/content";
import { HScroller } from "../HScroller";
import { ButtonLink } from "../ui";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  return (
    <section className="overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="container-x flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-4xl text-[36px] leading-[1.03] font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-[60px]" data-reveal>
          Don&apos;t take our word for it.
          <br />
          <span className="font-serif font-normal text-muted italic">Here&apos;s what couples are saying.</span>
        </h2>
      </div>
      <HScroller label="Couple testimonials" className="mt-10 lg:-mt-6">
        {testimonials.map((t) => (
          <TestimonialCard key={t.names} {...t} />
        ))}
      </HScroller>
      <div className="container-x mt-12 flex justify-center" data-reveal>
        <ButtonLink href="/templates" size="lg" className="w-full sm:w-auto">
          Choose your design
        </ButtonLink>
      </div>
    </section>
  );
}
