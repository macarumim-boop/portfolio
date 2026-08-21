import type { Persona } from "@/lib/projects";
import { Icon } from "@/components/icons";

const ACCENT: Record<string, string> = {
  accent: "#0071e3",
  green: "#17a673",
  pink: "#e0479e",
};

/**
 * The user segments the product had to serve, as persona cards. The default
 * variant is a compact info card; the "profile" variant is a photo-topped
 * profile card (portrait, name + badge, a key stat, and what they need).
 */
export function PersonaCards({
  personas,
  variant = "default",
}: {
  personas: Persona[];
  variant?: "default" | "profile";
}) {
  if (variant === "profile") return <Profiles personas={personas} />;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {personas.map((p) => {
        const color = ACCENT[p.accent];
        return (
          <div
            key={p.name}
            className="rounded-2xl border border-line bg-white p-6"
            style={{ boxShadow: `inset 3px 0 0 ${color}` }}
          >
            <div className="flex items-center gap-4">
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.photo}
                  alt={p.name}
                  className="h-14 w-14 flex-none rounded-full object-cover"
                />
              ) : (
                <Avatar variant={p.avatar} accent={p.accent} />
              )}
              <div>
                <p className="font-display text-lg leading-tight text-ink">
                  {p.name}
                </p>
                <p className="text-sm text-muted">{p.descriptor}</p>
              </div>
            </div>

            <div className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                {p.statLabel ?? "Gives"}
              </span>
              <span
                className="font-mono text-base font-semibold"
                style={{ color }}
              >
                {p.gives}
              </span>
            </div>

            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
              What they need
            </p>
            <ul className="mt-2.5 space-y-2">
              {p.needs.map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
                    style={{ background: color }}
                  />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ---- profile variant (photo-topped card) ----------------------- */

function Profiles({ personas }: { personas: Persona[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {personas.map((p) => {
        const color = ACCENT[p.accent];
        return (
          <div
            key={p.name}
            className="overflow-hidden rounded-3xl border border-line bg-white"
          >
            {/* portrait, cropped, not the full photo */}
            <div className="p-2">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <AvatarTile variant={p.avatar} accent={p.accent} />
                )}
              </div>
            </div>

            <div className="px-4 pb-5 pt-1">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold leading-tight text-ink">
                  {p.name}
                </p>
                <span
                  className="flex h-4 w-4 flex-none items-center justify-center rounded-full text-white"
                  style={{ background: color }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-2.5 w-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 12 5 5 9-11" />
                  </svg>
                </span>
              </div>
              <p className="mt-1 text-sm leading-snug text-ink/70">
                {p.descriptor}
              </p>

              {/* key stat, as a pill */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1">
                {p.icon && (
                  <span style={{ color }}>
                    <Icon name={p.icon} className="h-3.5 w-3.5" />
                  </span>
                )}
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  {p.statLabel ?? "Gives"}
                </span>
                <span className="text-sm font-semibold" style={{ color }}>
                  {p.gives}
                </span>
              </div>

              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                What they need
              </p>
              <ul className="mt-2 space-y-1.5">
                {p.needs.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2.5 text-sm leading-snug text-ink/80"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
                      style={{ background: color }}
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const GRAD: Record<string, [string, string]> = {
  accent: ["#5aa9ff", "#0071e3"],
  pink: ["#f28fcb", "#e0479e"],
  green: ["#4fc79a", "#17a673"],
};

/**
 * Self-contained illustrated portrait that fills the profile card's photo tile.
 * A soft accent gradient with a white figure; glasses cue an older person, a
 * hair detail a younger one. Used until a real photo is provided.
 */
function AvatarTile({
  variant,
  accent,
}: {
  variant?: "older" | "younger";
  accent: string;
}) {
  const [c1, c2] = GRAD[accent] ?? GRAD.accent;
  return (
    <div
      className="flex h-full w-full items-end justify-center"
      style={{ background: `linear-gradient(155deg, ${c1}, ${c2})` }}
    >
      <svg
        viewBox="0 0 100 84"
        className="h-full w-auto"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        {variant === "younger" && (
          <path
            d="M28 34a22 22 0 0 1 44 0c0 6-2 8-2 8l-4-6s-6 4-16 4-16-4-16-4l-4 6s-2-2-2-8z"
            fill="#ffffff"
            opacity="0.95"
          />
        )}
        <circle cx="50" cy="36" r="19" fill="#ffffff" opacity="0.95" />
        <path
          d="M16 84c0-16 13-26 34-26s34 10 34 26z"
          fill="#ffffff"
          opacity="0.95"
        />
        {variant === "older" && (
          <g stroke={c2} strokeWidth="2.4" fill="none">
            <circle cx="43" cy="36" r="5.2" />
            <circle cx="59" cy="36" r="5.2" />
            <path d="M48.2 36h5.6" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Compact illustrated avatar for the default variant.
 */
function Avatar({
  variant,
  accent,
}: {
  variant?: "older" | "younger";
  accent: string;
}) {
  const [c1, c2] = GRAD[accent] ?? GRAD.accent;
  return (
    <div
      className="h-14 w-14 flex-none overflow-hidden rounded-full"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden>
        {variant === "younger" && (
          <path
            d="M17 22a11 11 0 0 1 22 0c0 3-1 4-1 4l-2-3s-3 2-8 2-8-2-8-2l-2 3s-1-1-1-4z"
            fill="#ffffff"
            opacity="0.95"
          />
        )}
        <circle cx="28" cy="24" r="9.5" fill="#ffffff" opacity="0.95" />
        <path
          d="M12 56c0-9.4 7.2-15 16-15s16 5.6 16 15z"
          fill="#ffffff"
          opacity="0.95"
        />
        {variant === "older" && (
          <g stroke={c2} strokeWidth="1.4" fill="none">
            <circle cx="24" cy="24" r="2.6" />
            <circle cx="32" cy="24" r="2.6" />
            <path d="M26.6 24h2.8" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}
