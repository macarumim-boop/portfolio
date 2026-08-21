import type { StatCard } from "@/lib/projects";
import { Icon } from "@/components/icons";

/**
 * Dashboard-style data cards: a labelled icon, a big headline number, a
 * coloured delta pill, and a comparison line. Built for the numbers a
 * recruiter scans first, the metric highlights and the results.
 */
export function StatCards({ items }: { items: StatCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => {
        const good = s.delta?.good ?? true;
        const pillFg = good ? "#0f7a52" : "#b3261e";
        const pillBg = good ? "rgba(23,166,115,0.12)" : "rgba(220,38,38,0.10)";
        return (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-white p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-ink">{s.label}</p>
              <span
                className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
                style={{ color: "#0071e3", background: "rgba(0,113,227,0.08)" }}
              >
                <Icon name={s.icon} className="h-[1.15rem] w-[1.15rem]" />
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <span className="font-display text-5xl leading-none text-ink">
                {s.value}
              </span>
              {s.delta && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                  style={{ color: pillFg, background: pillBg }}
                >
                  <span aria-hidden>{s.delta.dir === "up" ? "▲" : "▼"}</span>
                  {s.delta.text}
                </span>
              )}
            </div>

            {s.sub && <p className="mt-3 text-sm text-muted">{s.sub}</p>}
          </div>
        );
      })}
    </div>
  );
}
