"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui";
import { nav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={clsx(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line/80 bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/templates" size="sm">
              Explore Templates
            </ButtonLink>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/70 transition-colors hover:bg-white md:hidden"
          >
            {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would trap position:fixed children. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col pt-6 pb-10">
          {[...nav, { label: "All Templates", href: "/templates" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-5 text-[26px] font-semibold tracking-[-0.03em]"
            >
              {item.label}
              <ArrowUpRight className="size-5 text-muted" />
            </Link>
          ))}
          <ButtonLink href="/templates" size="lg" className="mt-8 w-full" onClick={() => setOpen(false)}>
            Explore Templates
          </ButtonLink>
        </nav>
      </div>
    </>
  );
}
