import clsx from "clsx";
import { Img } from "./ui";

export function PhoneMockup({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={clsx(
        "relative aspect-[390/844] rounded-[16%/7.4%] bg-ink p-[3.5%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[13%/6%] bg-white">
        <Img src={src} alt={alt} fill sizes="280px" className="object-cover object-top" />
        <div className="absolute top-[1.6%] left-1/2 h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}
