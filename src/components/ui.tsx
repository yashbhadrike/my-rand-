import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

export { clsx as cn };

/** next/image that skips the optimiser for SVGs (they're already vector). */
export function Img({ alt, ...props }: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  return <Image alt={alt} {...props} unoptimized={props.unoptimized ?? src.endsWith(".svg")} />;
}

const variants = {
  primary: "bg-ink text-white hover:bg-black/80",
  outline: "border border-ink/15 bg-white/60 text-ink hover:border-ink/40 hover:bg-white",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-white text-ink hover:bg-white/85",
};

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type ButtonStyle = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function buttonClass({ variant = "primary", size = "md" }: ButtonStyle = {}, extra?: string) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    extra,
  );
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link {...props} className={buttonClass({ variant, size }, className)} />;
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" ? "mx-auto text-center" : "", "max-w-3xl", className)}>
      {eyebrow && (
        <p className="eyebrow mb-4" data-reveal>
          {eyebrow}
        </p>
      )}
      <h2
        className="text-[36px] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[64px]"
        data-reveal
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-[17px]" data-reveal>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Badge({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur",
        dark ? "border-transparent bg-ink text-white" : "border-ink/10 bg-white/90 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
