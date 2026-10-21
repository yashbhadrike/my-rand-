import type { ReactNode } from "react";

export const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-ink focus:ring-4 focus:ring-ink/5";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[12px] text-muted">{hint}</span>}
    </label>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[22px] border border-line bg-white p-5 sm:p-7">
      <h2 className="mb-5 text-[15px] font-semibold tracking-tight">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
