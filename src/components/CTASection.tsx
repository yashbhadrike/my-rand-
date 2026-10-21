import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { ButtonLink, Img } from "./ui";
import { PhoneMockup } from "./PhoneMockup";

export function CTASection({ screen = "/templates/ayodhya-screen.svg" }: { screen?: string }) {
  return (
    <section className="container-x pb-6">
      <div className="relative overflow-hidden rounded-[32px] bg-ink text-white sm:rounded-[40px]" data-reveal="scale">
        <div className="absolute inset-0 opacity-45">
          <div className="absolute inset-[-10%_0]" data-parallax="0.15">
            <Img src={images.brideRed.src} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />

        <div className="relative grid items-center gap-10 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:px-16 lg:py-24">
          <div>
            <p className="eyebrow mb-5 text-white/60">Your story, beautifully shared</p>
            <h2 className="text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[76px]">
              Your wedding deserves{" "}
              <span className="font-serif font-normal italic text-haldi">more than a forwarded video.</span>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
              Create an invitation your guests will actually want to open.
            </p>
            <ButtonLink href="/templates" variant="light" size="lg" className="mt-9 w-full sm:w-auto">
              Explore Wedding Templates <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <div className="hidden justify-center lg:flex">
            <PhoneMockup src={screen} alt="Wedding invitation website preview" className="w-[250px] rotate-[4deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}
