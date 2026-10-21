"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";

/** Native swipe/scroll row with snap points and arrow controls. */
export function HScroller({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((item?.offsetWidth ?? 320) + 20) * 2, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div className="container-x mb-6 hidden justify-end gap-2 sm:flex">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? "Scroll back" : "Scroll forward"}
            disabled={dir === -1 ? edges.start : edges.end}
            onClick={() => step(dir)}
            className="grid size-11 place-items-center rounded-full border border-line bg-white transition-all duration-300 hover:border-ink disabled:opacity-35 disabled:hover:border-line"
          >
            {dir === -1 ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={clsx(
          "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-5",
          "scroll-px-4 px-4 sm:scroll-px-7 sm:px-7 lg:scroll-px-[max(40px,calc((100vw-1320px)/2+40px))] lg:px-[max(40px,calc((100vw-1320px)/2+40px))]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
