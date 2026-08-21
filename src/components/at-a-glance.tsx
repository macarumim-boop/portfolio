import { Rich } from "@/components/rich-text";

/**
 * The 5-second TL;DR. A recruiter should grasp the whole case from these three
 * cards alone: the problem, the insight that cracked it, and the impact. The
 * middle card is the judgment call, not a task list, that is what tells a
 * recruiter how the designer thinks.
 */
export function AtAGlance({
  data,
  variant = "default",
}: {
  data: { problem: string; approach: string; impact: string };
  variant?: "default" | "editorial";
}) {
  const items = [
    {
      label: "The problem",
      text: data.problem,
      color: "#e0479e",
      icon: <Alert />,
    },
    {
      label: "The insight",
      text: data.approach,
      color: "#0071e3",
      icon: <Lightbulb />,
    },
    {
      label: "The impact",
      text: data.impact,
      color: "#17a673",
      icon: <TrendingUp />,
    },
  ];

  if (variant === "editorial") return <Editorial items={items} />;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl border border-line bg-white p-6"
          style={{ boxShadow: `inset 3px 0 0 ${it.color}` }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg"
              style={{ background: `${it.color}14`, color: it.color }}
            >
              {it.icon}
            </span>
            <p
              className="font-mono text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: it.color }}
            >
              {it.label}
            </p>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
            <Rich text={it.text} />
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Editorial variant: solid colour blocks with a serif statement, the emphasised
 * data set in serif italic. A bolder, magazine-style take on the same three
 * cards, used where the case wants a stronger visual opening.
 */
const EDITORIAL = [
  { bg: "#16241d", fg: "#f4ede1", ring: "rgba(244,237,225,0.22)" }, // problem, near-black
  { bg: "#c7b7ef", fg: "#1d1d1f", ring: "rgba(29,29,31,0.14)" }, // insight, lavender
  { bg: "#93b39d", fg: "#152019", ring: "rgba(21,32,25,0.16)" }, // impact, sage
];

function Editorial({
  items,
}: {
  items: { label: string; text: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((it, i) => {
        const t = EDITORIAL[i] ?? EDITORIAL[0];
        return (
          <div
            key={it.label}
            className="flex flex-col rounded-3xl p-7"
            style={{ background: t.bg, color: t.fg }}
          >
            <div className="flex items-start justify-between">
              <span
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border"
                style={{ borderColor: t.ring }}
              >
                {it.icon}
              </span>
              <span className="font-serif text-xl leading-none opacity-50">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p
              className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] opacity-60"
            >
              {it.label}
            </p>
            <p className="mt-2 font-serif text-[1.35rem] leading-[1.28] sm:text-[1.5rem]">
              <Rich text={it.text} strongClass="italic" />
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ---- icons (stroke, currentColor) ------------------------------- */

function Alert() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Lightbulb() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1 14c.2-1 .7-1.8 1.4-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.2 1.5 1.4 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendingUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <polyline
        points="3 17 9 11 13 15 21 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15 7 21 7 21 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

