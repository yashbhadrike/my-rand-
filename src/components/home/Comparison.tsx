import { Check, Minus } from "lucide-react";
import clsx from "clsx";
import { comparison } from "@/lib/content";
import { SectionHeading } from "../ui";

const negative = new Set(["No", "Difficult", "Hard", "Static", "High", "Limited", "View-only", "Separate cards", "Separate videos"]);

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const bad = negative.has(value);
  return (
    <span className={clsx("inline-flex items-center gap-1.5", highlight ? "font-semibold text-white" : bad ? "text-muted" : "text-ink")}>
      {highlight ? (
        <Check className="size-3.5 shrink-0 text-haldi" strokeWidth={2.5} />
      ) : (
        bad && <Minus className="size-3 shrink-0 text-muted/60" />
      )}
      {value}
    </span>
  );
}

export function Comparison() {
  const [printed, video, kavya] = comparison.columns;
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        eyebrow="Before vs now"
        title={
          <>
            What a digital wedding invite <span className="font-serif font-normal italic">can do.</span>
          </>
        }
      />

      <div className="relative mx-auto mt-14 max-w-5xl lg:mt-20" data-reveal>
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[620px] border-separate border-spacing-0 text-left text-[14px] sm:text-[15px]">
            <caption className="sr-only">Comparison of printed cards, WhatsApp videos and Kavyamoment websites</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[28%] pb-5 font-normal" />
                <th scope="col" className="w-[24%] px-4 pb-5 text-[13px] font-semibold text-muted">{printed}</th>
                <th scope="col" className="w-[24%] px-4 pb-5 text-[13px] font-semibold text-muted">{video}</th>
                <th scope="col" className="w-[24%] rounded-t-[22px] bg-ink px-5 pt-5 pb-5 text-[13px] font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-haldi" />
                    {kavya}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map(([label, a, b, c], i) => {
                const last = i === comparison.rows.length - 1;
                return (
                  <tr key={label}>
                    <th scope="row" className="border-t border-line py-4 pr-4 font-medium">{label}</th>
                    <td className="border-t border-line px-4 py-4"><Cell value={a} /></td>
                    <td className="border-t border-line px-4 py-4"><Cell value={b} /></td>
                    <td className={clsx("border-t border-white/10 bg-ink px-5 py-4", last && "rounded-b-[22px]")}>
                      <Cell value={c} highlight />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
