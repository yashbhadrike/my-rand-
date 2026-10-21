import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[44px] font-semibold tracking-[-0.05em] sm:text-6xl">
        This page didn&apos;t get the <span className="font-serif font-normal italic">invite.</span>
      </h1>
      <ButtonLink href="/templates" size="lg" className="mt-10">
        Explore Templates
      </ButtonLink>
    </section>
  );
}
