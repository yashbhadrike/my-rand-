"use client";

import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { removeTemplate, reorder, toggleFlag } from "@/app/admin/actions";
import { formatPrice } from "@/lib/site";
import type { Template } from "@/lib/types";
import { Img } from "../ui";

type Flag = "published" | "featured" | "newRelease";
type Change = { type: "flag"; id: string; flag: Flag } | { type: "order"; ids: string[] } | { type: "delete"; id: string };

function Toggle({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={clsx("relative h-6 w-10 shrink-0 rounded-full transition-colors", on ? "bg-ink" : "bg-line")}
    >
      <span className={clsx("absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform", on && "translate-x-4")} />
    </button>
  );
}

export function TemplateTable({ templates }: { templates: Template[] }) {
  const [, startTransition] = useTransition();
  const [rows, apply] = useOptimistic(templates, (state, change: Change) => {
    if (change.type === "flag") return state.map((t) => (t.id === change.id ? { ...t, [change.flag]: !t[change.flag] } : t));
    if (change.type === "delete") return state.filter((t) => t.id !== change.id);
    return change.ids.map((id) => state.find((t) => t.id === id)!).filter(Boolean);
  });

  const flip = (id: string, flag: Flag) =>
    startTransition(async () => {
      apply({ type: "flag", id, flag });
      await toggleFlag(id, flag);
    });

  const move = (index: number, dir: -1 | 1) => {
    const ids = rows.map((t) => t.id);
    const target = index + dir;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    startTransition(async () => {
      apply({ type: "order", ids });
      await reorder(ids);
    });
  };

  const destroy = (t: Template) => {
    if (!confirm(`Delete “${t.title}”? This also removes its uploaded images and video.`)) return;
    startTransition(async () => {
      apply({ type: "delete", id: t.id });
      await removeTemplate(t.id);
    });
  };

  if (!rows.length) {
    return <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">No templates yet.</p>;
  }

  return (
    <div className="mt-8 overflow-hidden rounded-[22px] border border-line bg-white">
      <div className="hidden grid-cols-[56px_64px_1fr_110px_repeat(3,72px)_120px] items-center gap-4 border-b border-line px-5 py-3 text-[11px] font-semibold tracking-wider text-muted uppercase lg:grid">
        <span>Order</span>
        <span />
        <span>Template</span>
        <span>Price</span>
        <span>Live</span>
        <span>Featured</span>
        <span>New</span>
        <span />
      </div>
      <ul className="divide-y divide-line">
        {rows.map((t, i) => (
          <li
            key={t.id}
            className={clsx(
              "grid grid-cols-[64px_1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-5 lg:grid-cols-[56px_64px_1fr_110px_repeat(3,72px)_120px]",
              !t.published && "bg-paper/60",
            )}
          >
            <div className="order-last col-span-3 flex gap-1 lg:order-none lg:col-span-1">
              <button type="button" aria-label={`Move ${t.title} up`} disabled={i === 0} onClick={() => move(i, -1)} className="grid size-7 place-items-center rounded-lg border border-line disabled:opacity-30">
                <ArrowUp className="size-3.5" />
              </button>
              <button type="button" aria-label={`Move ${t.title} down`} disabled={i === rows.length - 1} onClick={() => move(i, 1)} className="grid size-7 place-items-center rounded-lg border border-line disabled:opacity-30">
                <ArrowDown className="size-3.5" />
              </button>
            </div>
            <div className="relative aspect-square w-16 overflow-hidden rounded-xl bg-sand">
              {t.thumbnail && <Img src={t.thumbnail} alt="" fill sizes="64px" className={t.thumbnail.endsWith(".svg") ? "object-contain p-1" : "object-cover"} />}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold tracking-tight">
                {t.title} {!t.published && <span className="ml-1 text-[11px] font-medium text-muted">(hidden)</span>}
              </p>
              <p className="truncate text-[13px] text-muted">
                {t.category} · {t.style} · /{t.slug}
              </p>
              <p className="mt-0.5 text-[13px] font-medium lg:hidden">{formatPrice(t.price)}</p>
            </div>
            <span className="hidden text-sm tabular-nums lg:block">{formatPrice(t.price)}</span>

            <div className="col-span-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px] lg:contents">
              {(
                [
                  ["published", "Live"],
                  ["featured", "Featured"],
                  ["newRelease", "New"],
                ] as const
              ).map(([flag, label]) => (
                <span key={flag} className="flex items-center gap-2">
                  <Toggle on={t[flag]} label={`${label}: ${t.title}`} onClick={() => flip(t.id, flag)} />
                  <span className="lg:hidden">{label}</span>
                </span>
              ))}
            </div>

            <div className="col-start-3 row-start-1 flex justify-end gap-1 lg:col-auto lg:row-auto">
              <Link href={`/templates/${t.slug}`} target="_blank" aria-label={`View ${t.title} on site`} className="grid size-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink">
                <ExternalLink className="size-4" />
              </Link>
              <Link href={`/admin/templates/${t.id}`} aria-label={`Edit ${t.title}`} className="grid size-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink">
                <Pencil className="size-4" />
              </Link>
              <button type="button" onClick={() => destroy(t)} aria-label={`Delete ${t.title}`} className="grid size-9 place-items-center rounded-full text-muted hover:bg-rouge/10 hover:text-rouge">
                <Trash2 className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
