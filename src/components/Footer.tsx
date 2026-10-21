import Link from "next/link";
import { Logo } from "./Logo";
import { InstagramIcon } from "./ui";
import { nav, site } from "@/lib/site";

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export function Footer() {
  return (
    <footer className="container-x pt-20 pb-10 sm:pt-28">
      <div className="grid gap-12 border-t border-line pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-xs font-serif text-[26px] leading-[1.15] italic">
            Beautiful digital invitations for beautiful moments.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-[15px]">
            {[...nav, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/75 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Legal</p>
          <ul className="space-y-2.5 text-[15px]">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/75 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Social</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[15px] text-ink/75 transition-colors hover:text-ink"
          >
            <InstagramIcon className="size-4" /> Instagram
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:justify-between">
        <p>© {site.name} 2026</p>
        <p>Made with love in India.</p>
      </div>
    </footer>
  );
}
