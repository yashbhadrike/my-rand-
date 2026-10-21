"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Img } from "../ui";

export type HeroCard = { slug: string; title: string; thumbnail: string; category: string };

// Varied sizes and tilts so the row reads like cards scattered on a table.
const poses = [
  { w: 230, h: 320, ry: 16, rz: -3, y: 24 },
  { w: 270, h: 380, ry: 6, rz: 2, y: -10 },
  { w: 210, h: 290, ry: -4, rz: -2, y: 46 },
  { w: 290, h: 400, ry: -10, rz: 3, y: -26 },
  { w: 240, h: 330, ry: -18, rz: -1, y: 12 },
  { w: 260, h: 360, ry: 12, rz: 2, y: 30 },
  { w: 220, h: 300, ry: 4, rz: -3, y: -6 },
  { w: 280, h: 390, ry: -8, rz: 1, y: 18 },
  { w: 235, h: 325, ry: -14, rz: -2, y: -18 },
];

export function HeroCarousel({ cards }: { cards: HeroCard[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.children, { opacity: 0, y: 80, rotateX: -20, duration: 1.4, ease: "power3.out", stagger: 0.06 });
      const loop = gsap.to(el, { xPercent: -50, duration: 70, ease: "none", repeat: -1 });
      const slow = () => gsap.to(loop, { timeScale: 0.15, duration: 0.8 });
      const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.8 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", resume);
      return () => {
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", resume);
      };
    });
    return () => mm.revert();
  }, []);

  if (!cards.length) return null;
  // Desktop loops two copies for a seamless marquee; mobile scrolls the first copy.
  const loop = [...cards, ...cards];

  return (
    <div className="relative [perspective:1600px]">
      <div
        ref={track}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-10 pb-16 md:w-max md:snap-none md:gap-0 md:overflow-visible md:px-0 md:pt-14 md:pb-24 [transform-style:preserve-3d]"
      >
        {loop.map((card, i) => {
          const pose = poses[i % poses.length];
          const clone = i >= cards.length;
          return (
            <Link
              key={`${card.slug}-${i}`}
              href={`/templates/${card.slug}`}
              aria-hidden={clone || undefined}
              tabIndex={clone ? -1 : undefined}
              className={`group relative shrink-0 snap-center md:-mx-3 ${clone ? "hidden md:block" : ""}`}
              style={{ ["--w" as string]: `${pose.w}px`, ["--h" as string]: `${pose.h}px` }}
            >
              <div
                className="relative h-[300px] w-[220px] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-25px_rgba(17,17,17,0.45)] ring-1 ring-black/5 transition-transform duration-700 ease-soft md:h-(--h) md:w-(--w) md:[transform:var(--pose)] md:group-hover:[transform:var(--pose-hover)]"
                style={{
                  ["--pose" as string]: `translateY(${pose.y}px) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg)`,
                  ["--pose-hover" as string]: `translateY(${pose.y - 18}px) rotateY(0deg) rotateZ(0deg) scale(1.04)`,
                }}
              >
                <Img
                  src={card.thumbnail}
                  alt={clone ? "" : `${card.title} wedding invitation template`}
                  fill
                  sizes="300px"
                  priority={i < 5}
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-3 pt-10 text-white opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  <span className="text-sm font-semibold">{card.title}</span>
                  <span className="text-[11px] opacity-80">{card.category}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
