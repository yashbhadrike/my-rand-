"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featureCards } from "@/lib/content";
import { FeatureCard } from "./FeatureCard";

gsap.registerPlugin(ScrollTrigger);

export function FeatureShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Desktop: vertical scroll drives the row sideways. Mobile keeps native swipe.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - el.clientWidth;
      gsap.to(el.children, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="overflow-hidden bg-paper py-20 sm:py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pt-16 lg:pb-0">
      <div className="container-x flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-2xl text-[36px] leading-[1.03] font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-[60px]" data-reveal>
          Everything your wedding invite <span className="font-serif font-normal italic">needs.</span>
        </h2>
        <div className="hidden w-48 lg:block" aria-hidden>
          <div className="h-px w-full bg-line">
            <div ref={bar} className="h-px origin-left scale-x-0 bg-ink" />
          </div>
          <p className="eyebrow mt-3">Scroll to explore</p>
        </div>
      </div>
      <div
        ref={track}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:gap-5 sm:px-7 lg:mt-12 lg:snap-none lg:overflow-visible lg:px-[max(40px,calc((100vw-1320px)/2+40px))]"
      >
        {featureCards.map((card, i) => (
          <FeatureCard key={card.title} index={i} {...card} />
        ))}
      </div>
    </section>
  );
}
