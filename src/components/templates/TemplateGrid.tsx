"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { CATEGORIES } from "@/lib/types";
import { buttonClass } from "../ui";
import { CategoryFilter } from "./CategoryFilter";
import { TemplateCard, type TemplateCardData } from "./TemplateCard";

gsap.registerPlugin(Flip);

const ALL = "All";

export function TemplateGrid({
  templates,
  pageSize = 9,
  initialCategory = ALL,
}: {
  templates: TemplateCardData[];
  pageSize?: number;
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [limit, setLimit] = useState(pageSize);
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { [ALL]: templates.length };
    for (const t of templates) c[t.category] = (c[t.category] ?? 0) + 1;
    return c;
  }, [templates]);

  const filtered = useMemo(
    () => (category === ALL ? templates : templates.filter((t) => t.category === category)),
    [templates, category],
  );
  const visible = filtered.slice(0, limit);

  const capture = () => {
    if (!grid.current) return;
    flipState.current = Flip.getState(grid.current.querySelectorAll("[data-template-card]"));
  };

  const choose = (next: string) => {
    if (next === category) return;
    capture();
    setCategory(next);
    setLimit(pageSize);
  };

  const loadMore = () => {
    capture();
    setLimit((n) => n + pageSize);
  };

  // Animate between layouts: kept cards glide into place, new ones fade up.
  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state || !grid.current) return;
    const cards = grid.current.querySelectorAll("[data-template-card]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Flip.from(state, {
      targets: cards,
      duration: 0.7,
      ease: "power3.inOut",
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05, delay: 0.1 }),
    });
  }, [category, limit]);

  return (
    <div>
      <CategoryFilter options={[ALL, ...CATEGORIES]} value={category} counts={counts} onChange={choose} />

      <div ref={grid} className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-7">
        {visible.map((template, i) => (
          <TemplateCard key={template.id} template={template} priority={i < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-[26px] border border-dashed border-line px-6 py-16 text-center">
          <p className="text-lg font-semibold tracking-tight">New {category} designs are on the way.</p>
          <p className="mt-2 text-sm text-muted">Explore the full collection in the meantime.</p>
          <button type="button" onClick={() => choose(ALL)} className={buttonClass({ variant: "outline" }, "mt-6")}>
            Show all templates
          </button>
        </div>
      )}

      {filtered.length > limit && (
        <div className="mt-12 flex justify-center">
          <button type="button" onClick={loadMore} className={buttonClass({ variant: "outline", size: "lg" }, "w-full sm:w-auto")}>
            Load more designs
            <span className="text-muted tabular-nums">({filtered.length - limit})</span>
          </button>
        </div>
      )}
    </div>
  );
}
