import { instagramTiles } from "@/lib/content";
import { site } from "@/lib/site";
import { Img, InstagramIcon, buttonClass } from "../ui";

export function Instagram() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x text-center">
        <p className="eyebrow mb-4 inline-flex items-center gap-2" data-reveal>
          <InstagramIcon className="size-3.5" /> @{site.instagramHandle}
        </p>
        <h2 className="text-[36px] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl" data-reveal>
          See more wedding <span className="font-serif font-normal italic">stories.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:text-[16px]" data-reveal>
          Follow Kavyamoment on Instagram for new designs, real weddings and inspiration.
        </p>
      </div>

      <ul className="no-scrollbar mt-12 flex snap-x gap-3 overflow-x-auto px-4 sm:container-x sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {instagramTiles.map((img, i) => (
          <li key={img.src} className="shrink-0 snap-start" data-reveal>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${img.alt} — view on Instagram`}
              className={`group relative block w-[42vw] overflow-hidden rounded-[18px] bg-sand sm:w-auto ${i % 2 ? "aspect-[4/5]" : "aspect-square"} lg:aspect-[4/5]`}
            >
              <Img src={img.src} alt="" fill sizes="(min-width:1024px) 16vw, (min-width:640px) 30vw, 42vw" className="object-cover transition-transform duration-[1000ms] ease-soft group-hover:scale-[1.06]" />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all duration-500 group-hover:bg-ink/30 group-hover:opacity-100">
                <InstagramIcon className="size-7" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="container-x mt-10 flex justify-center" data-reveal>
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={buttonClass({ size: "lg" }, "w-full sm:w-auto")}>
          <InstagramIcon className="size-4" /> Follow on Instagram
        </a>
      </div>
    </section>
  );
}
