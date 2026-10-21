import { ArrowDown } from "lucide-react";
import { ButtonLink } from "../ui";
import { HeroCarousel, type HeroCard } from "./HeroCarousel";

export function Hero({ cards }: { cards: HeroCard[] }) {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 lg:pt-24">
      <div className="container-x text-center">
        <p className="eyebrow" data-reveal>
          Premium Indian Wedding Invitations
        </p>
        <h1
          className="mx-auto mt-6 max-w-5xl text-[48px] leading-[0.95] font-semibold tracking-[-0.055em] sm:text-[72px] lg:text-[100px]"
          data-reveal
        >
          Your Wedding. <span className="font-serif font-normal tracking-[-0.03em] italic">Your Story.</span>
          <br className="hidden sm:block" /> Your Invite.
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[18px]" data-reveal>
          <span className="text-ink">Beautiful wedding invitation websites, made to share your story.</span> Choose a design,
          personalise your details, add your photos and share your wedding with everyone you love.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row" data-reveal>
          <ButtonLink href="/templates" size="lg">
            Explore Templates
          </ButtonLink>
          <ButtonLink href="/#how-it-works" variant="outline" size="lg">
            How It Works
          </ButtonLink>
        </div>
      </div>

      <HeroCarousel cards={cards} />

      <a
        href="#templates"
        aria-label="Scroll to templates"
        className="mx-auto -mt-6 mb-6 hidden size-11 place-items-center rounded-full border border-line bg-white/70 text-ink/70 transition-colors hover:text-ink md:grid"
      >
        <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
