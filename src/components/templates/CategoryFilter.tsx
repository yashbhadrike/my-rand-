"use client";

import clsx from "clsx";

export function CategoryFilter({
  options,
  value,
  counts,
  onChange,
}: {
  options: readonly string[];
  value: string;
  counts: Record<string, number>;
  onChange: (value: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter templates by category"
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={clsx(
              "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-all duration-300 ease-soft",
              active
                ? "border-ink bg-ink text-white"
                : "border-line bg-white/70 text-ink/75 hover:border-ink/30 hover:text-ink",
            )}
          >
            {option}
            <span className={clsx("text-[11px] tabular-nums", active ? "text-white/60" : "text-muted/70")}>
              {counts[option] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
