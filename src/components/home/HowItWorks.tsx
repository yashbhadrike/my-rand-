import { CheckCheck } from "lucide-react";
import { steps } from "@/lib/content";
import { ButtonLink, Img, SectionHeading } from "../ui";
import { PhoneMockup } from "../PhoneMockup";

function ChooseVisual() {
  return (
    <div className="relative h-full w-full">
      {["/templates/kashi.svg", "/templates/rajwada.svg", "/templates/saanjh.svg"].map((src, i) => (
        <div
          key={src}
          className="absolute top-1/2 left-1/2 aspect-[5/7] w-[38%] transition-transform duration-700 ease-soft [transform:var(--t)] group-hover:[transform:var(--t-hover)]"
          style={{
            ["--t" as string]: `translate(-50%, -50%) rotate(${(i - 1) * 9}deg) translateX(${(i - 1) * 46}%)`,
            ["--t-hover" as string]: `translate(-50%, -50%) rotate(${(i - 1) * 13}deg) translateX(${(i - 1) * 62}%)`,
            zIndex: i === 1 ? 2 : 1,
          }}
        >
          <Img src={src} alt="" fill sizes="200px" className="rounded-md object-cover shadow-lift" />
        </div>
      ))}
    </div>
  );
}

function PersonaliseVisual({ screen }: { screen: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <PhoneMockup src={screen} alt="" className="w-[40%] translate-y-[14%]" />
      <div className="absolute top-[18%] left-[6%] w-[46%] space-y-2 rounded-2xl border border-line bg-white/95 p-3 shadow-soft backdrop-blur sm:left-[8%]">
        {[
          ["Names", "Lakshmi & Karthik"],
          ["Muhurtham", "27 Jan · 7:15 AM"],
          ["Venue", "Kalakshetra, Chennai"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-paper px-2.5 py-1.5">
            <p className="text-[9px] font-semibold tracking-[0.15em] text-muted uppercase">{k}</p>
            <p className="truncate text-[12px] font-semibold">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShareVisual({ image }: { image: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-[290px] space-y-2.5 rounded-[22px] bg-[#e7dfd4] p-3.5 shadow-soft">
        <div className="ml-auto w-[85%] overflow-hidden rounded-xl rounded-tr-sm bg-[#d9fdd3] text-[12px] shadow-sm">
          <div className="relative aspect-[16/9] bg-white">
            <Img src={image} alt="" fill sizes="260px" className="object-cover object-top" />
          </div>
          <div className="space-y-0.5 bg-black/[0.04] px-2.5 py-2">
            <p className="font-semibold">Riya &amp; Kunal are getting married</p>
            <p className="text-[10px] text-black/55">riyakunal.kavyamoment.com</p>
          </div>
          <p className="px-2.5 py-2">Can&apos;t wait to celebrate with you all! 💛</p>
          <p className="flex items-center justify-end gap-1 px-2.5 pb-1.5 text-[10px] text-black/45">
            9:41 <CheckCheck className="size-3 text-sky-500" />
          </p>
        </div>
        <div className="w-[62%] rounded-xl rounded-tl-sm bg-white px-2.5 py-2 text-[12px] shadow-sm">
          This is so beautiful 😍 RSVP done!
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line bg-white/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading title={<>Create your wedding invite in minutes.</>} sub="Choose. Personalise. Share." />

        <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.n} className="group flex flex-col overflow-hidden rounded-[28px] border border-line bg-card" data-reveal>
              <div className="relative aspect-[4/3.4] overflow-hidden bg-sand">
                {i === 0 && <ChooseVisual />}
                {i === 1 && <PersonaliseVisual screen={step.image} />}
                {i === 2 && <ShareVisual image="/templates/utsav.svg" />}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="font-serif text-[64px] leading-none text-ink/15 italic">{step.n}</span>
                <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.03em] sm:text-[24px]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center" data-reveal>
          <ButtonLink href="/templates" size="lg" className="w-full sm:w-auto">
            Start with a template
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
