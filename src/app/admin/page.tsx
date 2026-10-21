import { Plus } from "lucide-react";
import { listTemplates } from "@/lib/store";
import { AdminBar } from "@/components/admin/AdminBar";
import { TemplateTable } from "@/components/admin/TemplateTable";
import { ButtonLink } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }, templates] = await Promise.all([searchParams, listTemplates({ includeUnpublished: true })]);
  const live = templates.filter((t) => t.published).length;

  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">Templates</h1>
            <p className="mt-1 text-sm text-muted">
              {templates.length} total · {live} live · {templates.filter((t) => t.featured).length} featured. Changes appear on the website immediately.
            </p>
          </div>
          <ButtonLink href="/admin/templates/new">
            <Plus className="size-4" /> Add template
          </ButtonLink>
        </div>
        {saved && (
          <p role="status" className="mt-6 rounded-xl border border-pine/20 bg-pine/5 px-4 py-3 text-sm text-pine">
            Saved “{saved}”.
          </p>
        )}
        <TemplateTable templates={templates} />
      </main>
    </>
  );
}
