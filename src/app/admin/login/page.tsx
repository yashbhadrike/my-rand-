import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm rounded-[28px] border border-line bg-white p-8 shadow-soft">
        <Logo />
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Manage templates shown on the website.</p>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
