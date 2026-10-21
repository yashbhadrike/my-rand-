"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import clsx from "clsx";
import { Img } from "../ui";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [full, setFull] = useState(false);
  const count = images.length;
  const go = useCallback((dir: number) => setActive((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [full, go]);

  // Allow other buttons on the page (e.g. "Preview") to open the viewer.
  useEffect(() => {
    const open = (e: Event) => {
      const index = (e as CustomEvent<number>).detail;
      if (typeof index === "number") setActive(Math.min(Math.max(index, 0), count - 1));
      setFull(true);
    };
    window.addEventListener("gallery:open", open);
    return () => window.removeEventListener("gallery:open", open);
  }, [count]);

  if (!count) return null;
  const src = images[active];
  const isScreen = src.includes("screen");

  return (
    <div>
      <div className="group relative aspect-[4/4.5] overflow-hidden rounded-[28px] bg-sand">
        <button type="button" onClick={() => setFull(true)} className="absolute inset-0" aria-label="Open full-screen preview">
          <div className={clsx("absolute transition-transform duration-700 ease-soft group-hover:scale-[1.03]", isScreen ? "inset-[6%_28%]" : src.endsWith(".svg") ? "inset-[8%_16%]" : "inset-0")}>
            <Img
              key={src}
              src={src}
              alt={`${title} preview ${active + 1} of ${count}`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={clsx(
                isScreen
                  ? "rounded-[22px] object-cover object-top ring-[5px] ring-ink"
                  : src.endsWith(".svg")
                    ? "object-contain drop-shadow-[0_28px_36px_rgba(40,25,10,0.3)]"
                    : "object-cover",
              )}
            />
          </div>
        </button>
        <span className="pointer-events-none absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold backdrop-blur">
          <Expand className="size-3.5" /> Full screen
        </span>
        {count > 1 && (
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                aria-label={dir < 0 ? "Previous image" : "Next image"}
                className="grid size-10 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur transition hover:bg-white"
              >
                {dir < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={clsx(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl bg-sand ring-offset-2 ring-offset-paper transition sm:w-24",
                i === active ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100",
              )}
            >
              <Img src={img} alt="" fill sizes="96px" className={img.endsWith(".svg") ? "object-contain p-2" : "object-cover"} />
            </button>
          ))}
        </div>
      )}

      {full && (
        <div role="dialog" aria-modal="true" aria-label={`${title} full-screen preview`} className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setFull(false)}
            aria-label="Close preview"
            className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            autoFocus
          >
            <X className="size-5" />
          </button>
          <div className="absolute inset-4 top-18 bottom-20 sm:inset-12 sm:bottom-24">
            <Img src={src} alt={`${title} preview`} fill sizes="100vw" className={clsx("object-contain", isScreen && "rounded-3xl")} />
          </div>
          {count > 1 && (
            <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-4 text-white">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <ChevronLeft className="size-5" />
              </button>
              <span className="text-sm tabular-nums">
                {active + 1} / {count}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function OpenGalleryButton({ index, className, children }: { index?: number; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent("gallery:open", { detail: index }))}>
      {children}
    </button>
  );
}
