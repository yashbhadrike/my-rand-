"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

export function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold tracking-[-0.015em] sm:py-6 sm:text-[18px]"
        >
          {q}
          <span
            className={clsx(
              "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-soft",
              open ? "rotate-45 border-ink bg-ink text-white" : "border-line group-hover:border-ink",
            )}
          >
            <Plus className="size-3.5" />
          </span>
        </button>
      </h3>
      <div
        id={id}
        role="region"
        className={clsx(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-soft motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="max-w-2xl pr-12 pb-6 text-[15px] leading-relaxed text-muted sm:text-[16px]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={clsx("border-t border-line", className)}>
      {items.map((item, i) => (
        <FAQItem key={item.q} {...item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
