import { CalendarHeart, Images, MapPin, RefreshCw, Send, Smartphone } from "lucide-react";
import { reimaginedFeatures } from "@/lib/content";
import { images } from "@/lib/images";
import { Img } from "../ui";
import { PhoneMockup } from "../PhoneMockup";

const icons = { Smartphone, Send, RefreshCw, Images, MapPin, CalendarHeart };

export function Reimagined({ screen }: { screen: string }) {
  return (
    <section id="features" className="container-x py-24 sm:py-32 lg:py-40">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2
          className="text-[44px] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-6xl lg:col-span-8 lg:text-[80px]"
          data-reveal
        >
          The Wedding Invite,
          <br />
          <span className="font-serif font-normal tracking-[-0.02em] italic">Reimagined.</span>
        </h2>
        <p className="max-w-md text-[16px] leading-relaxed text-muted sm:text-[17px] lg:col-span-4 lg:justify-self-end" data-reveal>
          More personal than a WhatsApp video.
          <br />
          More flexible than a printed card.
          <br />
          <span className="text-ink">Made for the way people celebrate today.</span>
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[32px] bg-[#e9dfd0]" data-reveal="scale">
            <div className="relative aspect-[4/4.6] sm:aspect-[4/3.6] lg:aspect-[4/4.8]">
              <div className="absolute inset-[-12%_0]" data-parallax="0.18">
                <Img src={images.coupleSteps.src} alt={images.coupleSteps.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <PhoneMockup src={screen} alt="A wedding invitation website on a phone" className="w-[46%] max-w-[250px] translate-y-[12%]" />
              </div>
            </div>
          </div>
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {reimaginedFeatures.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <li key={f.title} className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-7 sm:gap-x-8 sm:py-9" data-reveal>
                <span className="row-span-2 pt-1 font-serif text-[22px] text-muted italic tabular-nums sm:text-[26px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex items-center gap-3 text-[20px] font-semibold tracking-[-0.025em] sm:text-[24px]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Icon className="size-4" strokeWidth={1.8} />
                  </span>
                  {f.title}
                </h3>
                <p className="max-w-md text-[15px] leading-relaxed text-muted sm:pl-12 sm:text-[16px]">{f.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
