import Link from "next/link";
import clsx from "clsx";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="Kavyamoment home" className={clsx("group inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden>
        <path d="M4 28V15a12 12 0 0 1 24 0v13Z" fill={light ? "#f7f6f2" : "#111"} />
        <circle cx="16" cy="16" r="4.5" fill="#e3a83a" className="origin-center transition-transform duration-500 group-hover:scale-110" />
      </svg>
      <span className={clsx("text-[17px] font-bold tracking-[-0.04em]", light ? "text-paper" : "text-ink")}>
        kavya<span className="font-serif text-[19px] font-normal tracking-normal italic">moment</span>
      </span>
    </Link>
  );
}
