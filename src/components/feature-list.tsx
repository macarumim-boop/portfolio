import type { Feature } from "@/lib/projects";
import { Icon } from "@/components/icons";

const ACCENT: Record<string, { fg: string; bg: string }> = {
  accent: { fg: "#0071e3", bg: "rgba(0,113,227,0.08)" },
  green: { fg: "#17a673", bg: "rgba(23,166,115,0.10)" },
  pink: { fg: "#e0479e", bg: "rgba(224,71,158,0.10)" },
  ink: { fg: "#1d1d1f", bg: "rgba(29,29,31,0.06)" },
};

// Controlled color: a small, on-brand rotation instead of a rainbow, so these
// grids stay consistent with the rest of the portfolio while still reading
// fast. A feature can override with its own accent.
const ROTATION = ["accent", "green", "pink"] as const;

/**
 * The capabilities of a single product (the patient app, the clinician
 * desktop) or a set of considerations (ethics, guardrails), as a scannable
 * grid of cards. Each card leads with a meaningful icon in a soft accent tile.
 * Keeping each surface in its own list is what makes the app and the desktop
 * read as two distinct products. An optional badge carries a cross-cutting
 * fact like HIPAA compliance.
 */
export function FeatureList({
  features,
  accent,
  badge,
}: {
  features: Feature[];
  accent?: "accent" | "green" | "pink" | "ink";
  badge?: string;
}) {
  return (
    <div>
      {badge && (
        <span
          className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em]"
          style={{ color: ACCENT.accent.fg, background: ACCENT.accent.bg }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          {badge}
        </span>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((f, i) => {
          const key = f.accent ?? accent ?? ROTATION[i % ROTATION.length];
          const c = ACCENT[key] ?? ACCENT.accent;
          return (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
                  style={{ color: c.fg, background: c.bg }}
                >
                  {f.icon ? (
                    <Icon name={f.icon} className="h-[1.15rem] w-[1.15rem]" />
                  ) : (
                    <span className="font-mono text-xs font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </span>
                <p className="font-medium text-ink">{f.title}</p>
              </div>
              {f.detail && (
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {f.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
