import { site } from "@/lib/site";

export function Marquee() {
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="border-y border-line bg-paper-2 py-4 marquee-mask">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl uppercase tracking-tight text-ink"
          >
            {item}
            <span className="px-8 text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
