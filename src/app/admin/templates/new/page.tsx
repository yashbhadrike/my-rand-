import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { TemplateForm } from "@/components/admin/TemplateForm";

export default function NewTemplatePage() {
  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" /> Templates
        </Link>
        <h1 className="mt-3 mb-8 text-3xl font-semibold tracking-[-0.03em]">New template</h1>
        <TemplateForm />
      </main>
    </>
  );
}
