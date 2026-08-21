import { Fragment } from "react";

/**
 * The redesigned donation flow as a real, phased flowchart, mapped from the
 * shipped experience: choose the gift, optionally personalize it, pay (where
 * the whole redesign lives, only the email is required), then the gift is made
 * and the tax-receipt form is branched off as optional, after the payment.
 * Color-coded by phase; horizontal on desktop, stacked on mobile.
 */

type Tone = "beige" | "green" | "purple" | "blue" | "dashed";

const TONE: Record<Tone, { bg: string; border: string; title: string }> = {
  beige: { bg: "#f6f3ee", border: "#ece5db", title: "#6b6157" },
  green: { bg: "#eef7f2", border: "#cfe8dd", title: "#15794f" },
  purple: { bg: "#f2eefb", border: "#e0d5f2", title: "#6b4fa0" },
  blue: { bg: "#eaf2fd", border: "#cfe0f7", title: "#0058b8" },
  dashed: { bg: "#f5f5f7", border: "#d2d2d7", title: "#6e6e73" },
};

type NodeData = {
  title: string;
  sub?: string;
  tone: Tone;
  step?: string;
  dashed?: boolean;
};

export function FlowDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper-2 p-5 sm:p-8">
      {/* Phase 1 — choose */}
      <PhaseLabel color="#15794f">Choose the gift</PhaseLabel>
      <Row
        items={[
          {
            title: "Open donation page",
            sub: "From the campaign link",
            tone: "beige",
          },
          {
            title: "Choose the fund",
            sub: "General, education, conservation…",
            tone: "green",
          },
          {
            title: "Set amount & frequency",
            sub: "Preset or custom · one-time to annual",
            tone: "green",
          },
        ]}
      />

      <VArrow />
      <div className="flex justify-center">
        <span className="rounded-full border border-dashed border-[#cfe8dd] px-5 py-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#15794f]">
          Add personal touches?
        </span>
      </div>
      <VArrow />

      {/* Phase 2 — personalize (optional) */}
      <PhaseLabel color="#6b4fa0" tag="Optional · skippable">
        Personalize
      </PhaseLabel>
      <Row
        connect={false}
        items={[
          {
            title: "Dedicate the gift",
            sub: "In honor or memory of someone",
            tone: "purple",
          },
          {
            title: "Guaranteed recurrence",
            sub: "Fix the number of payments",
            tone: "purple",
          },
          {
            title: "Notify someone",
            sub: "Name + message, by phone or email",
            tone: "purple",
          },
        ]}
      />

      <VArrow />

      {/* Phase 3 — pay (the redesign) */}
      <PhaseLabel color="#0058b8" tag="Only the email is required">
        Pay
      </PhaseLabel>
      <Row
        items={[
          {
            step: "Step 1",
            title: "Enter email",
            sub: "The one required field",
            tone: "blue",
          },
          {
            step: "Step 2",
            title: "Choose payment",
            sub: "Apple Pay · Google Pay · Card",
            tone: "blue",
          },
          {
            step: "Step 3",
            title: "Give",
            sub: "Payment in seconds",
            tone: "blue",
          },
        ]}
      />

      <VArrow />

      {/* Gift made */}
      <div className="mx-auto sm:w-2/3">
        <Row
          items={[
            {
              title: "Gift made",
              sub: "Thank-you + social share",
              tone: "green",
            },
          ]}
        />
      </div>

      <VArrow />

      {/* optional branch — tax receipt after the gift */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          ↳ optional, after the gift
        </span>
        <div className="w-full sm:w-2/3">
          <Row
            items={[
              {
                title: "Tax receipt",
                sub: "Billing details, only for the deduction",
                tone: "dashed",
                dashed: true,
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-6 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
        ↺ give again / new fund
      </div>
    </div>
  );
}

function Row({ items, connect = true }: { items: NodeData[]; connect?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      {items.map((it, i) => (
        <Fragment key={i}>
          <Node {...it} />
          {i < items.length - 1 &&
            (connect ? <ArrowRight /> : <span className="hidden sm:block sm:w-2" />)}
        </Fragment>
      ))}
    </div>
  );
}

function Node({ title, sub, tone, step, dashed }: NodeData) {
  const t = TONE[tone];
  return (
    <div
      className="flex-1 rounded-xl border p-4"
      style={{
        background: t.bg,
        borderColor: t.border,
        borderStyle: dashed ? "dashed" : "solid",
      }}
    >
      {step && (
        <span
          className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
          style={{ color: t.title }}
        >
          {step}
        </span>
      )}
      <p
        className="text-[15px] font-semibold leading-tight"
        style={{ color: t.title, marginTop: step ? "0.25rem" : 0 }}
      >
        {title}
      </p>
      {sub && (
        <p className="mt-1 text-[12.5px] leading-snug text-muted">{sub}</p>
      )}
    </div>
  );
}

function PhaseLabel({
  children,
  color,
  tag,
}: {
  children: React.ReactNode;
  color: string;
  tag?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span
        className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
        style={{ color }}
      >
        {children}
      </span>
      {tag && (
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          {tag}
        </span>
      )}
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="flex items-center justify-center py-1 sm:py-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="rotate-90 text-[#b8b8be] sm:rotate-0"
      >
        <path
          d="M4 12h15m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function VArrow() {
  return (
    <div className="flex justify-center py-3">
      <svg width="20" height="24" viewBox="0 0 24 28" fill="none">
        <path
          d="M12 3v22m0 0-5-5m5 5 5-5"
          stroke="#b8b8be"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
