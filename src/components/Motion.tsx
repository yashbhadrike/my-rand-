"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One site-wide controller for declarative scroll motion, so server components
 * only need data attributes:
 *   data-reveal            fade + rise ("scale" for an image scale reveal)
 *   data-parallax="0.15"   gentle vertical drift while scrolling
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      const up = els.filter((el) => el.dataset.reveal !== "scale");
      const scale = els.filter((el) => el.dataset.reveal === "scale");

      gsap.set(up, { y: 28 });
      ScrollTrigger.batch(up, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.09, overwrite: true }),
      });

      scale.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.06, clipPath: "inset(8% 8% 8% 8% round 28px)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.12");
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Fonts and images shift layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
