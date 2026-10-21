import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { Logo } from "../Logo";

export function AdminBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">Admin</span>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-muted hover:bg-ink/5 hover:text-ink">
            <ExternalLink className="size-3.5" /> <span className="hidden sm:inline">View site</span>
          </Link>
          <form action={logout}>
            <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-muted hover:bg-ink/5 hover:text-ink">
              <LogOut className="size-3.5" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
