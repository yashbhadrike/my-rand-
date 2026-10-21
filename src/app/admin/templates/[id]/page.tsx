import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getTemplateById } from "@/lib/store";
import { AdminBar } from "@/components/admin/AdminBar";
import { TemplateForm } from "@/components/admin/TemplateForm";

export const dynamic = "force-dynamic";

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const template = await getTemplateById((await params).id);
  if (!template) notFound();
  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" /> Templates
        </Link>
        <div className="mt-3 mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Edit {template.title}</h1>
          <Link href={`/templates/${template.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink">
            View on site <ExternalLink className="size-3.5" />
          </Link>
        </div>
        {/* key resets local form state after a save changes the record */}
        <TemplateForm key={template.updatedAt} template={template} />
      </main>
    </>
  );
}
