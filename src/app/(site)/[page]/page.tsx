import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const content = pages[page];
  return content ? { title: content.title, description: content.intro, alternates: { canonical: `/${page}` } } : {};
}

export default async function ContentPage({ params }: Props) {
  const content = pages[(await params).page];
  if (!content) notFound();
  return (
    <article className="container-x max-w-3xl pt-16 pb-10 sm:pt-24">
      <h1 className="text-[44px] leading-[1] font-semibold tracking-[-0.05em] sm:text-[64px]" data-reveal>
        {content.title}
      </h1>
      <p className="mt-6 text-[18px] leading-relaxed text-muted" data-reveal>
        {content.intro}
      </p>
      <div className="mt-14 divide-y divide-line border-y border-line">
        {content.sections.map((s) => (
          <section key={s.h} className="grid gap-2 py-8 sm:grid-cols-[200px_1fr] sm:gap-8" data-reveal>
            <h2 className="font-semibold tracking-tight">{s.h}</h2>
            <p className="text-[16px] leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
