import { Icon } from "@/components/icons";

/**
 * Faithful recreation of the real audit-ds dashboard (a local HTML report
 * the agent generates), using the same illustrative sample data rendered
 * through the real dashboard template. Not a specific team's real audit.
 */

const GOOD = "#16a34a";
const WARN = "#ea580c";
const CRIT = "#dc2626";

const FOUNDATIONS = [
  { label: "Component adoption", score: 81, note: "3 not adopted, 5 out of sync with the DS." },
  { label: "Color tokens", score: 88.4, note: "2 hardcoded color values found, most often needing --color-accent." },
  { label: "Typography", score: 100, note: "Fully on the DS typeface." },
  { label: "Spacing", score: 91.2, note: "4 off-scale spacing values found (not a multiple of the 4px grid)." },
  { label: "Radius", score: 83.3, note: "1 off-scale radius value found." },
];

const ADOPTION = [
  { status: "current", name: "Button", meta: "v0.5.0" },
  { status: "current", name: "Input", meta: "v0.5.0" },
  { status: "current", name: "Select", meta: "v0.5.0" },
  { status: "current", name: "Badge", meta: "v0.5.0" },
  { status: "outdated", name: "Table", meta: "v0.3.1→v0.5.0" },
  { status: "outdated", name: "Dialog", meta: "v0.4.0→v0.5.0" },
  { status: "unstamped", name: "Tooltip", meta: "no stamp" },
  { status: "not_adopted", name: "Combobox", meta: "v0.5.0 avail." },
  { status: "not_adopted", name: "DataTable", meta: "v0.5.0 avail." },
];

const STATUS_STYLE: Record<string, { fg: string; label: string }> = {
  current: { fg: GOOD, label: "Current" },
  outdated: { fg: WARN, label: "Outdated" },
  unstamped: { fg: "#78716c", label: "Unstamped" },
  not_adopted: { fg: CRIT, label: "Not adopted" },
};

const CUSTOM = [
  "src/components/CampCard.tsx",
  "src/components/PaymentPlanSummary.tsx",
  "src/components/RosterFilterBar.tsx",
];

function scoreColor(s: number) {
  return s >= 75 ? GOOD : s >= 50 ? WARN : CRIT;
}

export function DSAgentDashboard() {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_20px_60px_-28px_rgba(0,0,0,0.28)]">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-line">
          <Icon name="lock" className="h-3 w-3" />
          .ds-audit/dashboard.html
        </div>
      </div>

      <div className="bg-white p-5 text-[13px] sm:p-8">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="text-base font-semibold text-ink">campminder/registration</p>
            <p className="mt-1 text-xs text-muted">
              Audited against <span className="text-ink/70">campminder-ui</span> (@campminder/ds), the design system repo.
            </p>
          </div>
          <p className="text-xs text-muted">
            Last run: Aug 11, 2026 · scope: full · repo @a3f9c21
          </p>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* sidebar */}
          <div className="space-y-6">
            {/* score ring */}
            <div className="flex flex-col items-center rounded-lg border border-line bg-paper-2 p-5">
              <div
                className="relative grid h-24 w-24 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(${GOOD} ${81 * 3.6}deg, #e5e5e5 0deg)`,
                }}
              >
                <div className="grid h-[4.6rem] w-[4.6rem] place-items-center rounded-full bg-white">
                  <span className="text-xl font-bold" style={{ color: GOOD }}>81%</span>
                </div>
              </div>
              <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Adherence</p>
              <p className="mt-1 text-xs font-medium" style={{ color: GOOD }}>▲ +5 pts vs. previous</p>
            </div>

            {/* at a glance */}
            <div className="rounded-lg border border-line p-4">
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">At a glance</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted">Files scanned</span><span className="font-medium text-ink">184</span></div>
                <div className="flex justify-between"><span className="text-muted">Not adopted</span><span className="font-medium" style={{ color: CRIT }}>3</span></div>
                <div className="flex justify-between"><span className="text-muted">Out of sync</span><span className="font-medium" style={{ color: WARN }}>5</span></div>
                <div className="flex justify-between"><span className="text-muted">Custom, no DS match</span><span className="font-medium text-ink">5</span></div>
              </div>
            </div>

            {/* severity */}
            <div className="rounded-lg border border-line p-4">
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Issues by severity</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: CRIT }} /><span className="flex-1 text-ink/70">High</span><span className="font-medium" style={{ color: CRIT }}>3</span></div>
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: WARN }} /><span className="flex-1 text-ink/70">Medium</span><span className="font-medium" style={{ color: WARN }}>2</span></div>
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#2563eb" }} /><span className="flex-1 text-ink/70">Low</span><span className="font-medium" style={{ color: "#2563eb" }}>3</span></div>
              </div>
            </div>
          </div>

          {/* main column */}
          <div className="space-y-8">
            {/* foundations */}
            <div>
              <p className="font-semibold text-ink">Foundations &amp; component adoption</p>
              <p className="mt-1 text-xs text-muted">How consistently this repo uses what campminder-ui defines.</p>
              <div className="mt-4 space-y-4">
                {FOUNDATIONS.map((f) => (
                  <div key={f.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-ink">{f.label}</span>
                      <span className="font-semibold" style={{ color: scoreColor(f.score) }}>
                        {f.score}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e5e5e5]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${f.score}%`, background: scoreColor(f.score) }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted">{f.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* adoption ledger */}
            <div>
              <p className="font-semibold text-ink">Component adoption ledger</p>
              <p className="mt-1 text-xs text-muted">Every component in the registry, checked against this repo.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {ADOPTION.map((a) => {
                  const s = STATUS_STYLE[a.status];
                  return (
                    <div key={a.name} className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.fg }} />
                      <span className="flex-1 text-sm text-ink/80">{a.name}</span>
                      <span className="text-xs text-muted">{a.meta}</span>
                      <span className="text-xs font-medium" style={{ color: s.fg }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* custom components */}
            <div>
              <p className="font-semibold text-ink">Custom components, no DS equivalent</p>
              <p className="mt-1 text-xs text-muted">Built locally, candidates to propose upstream.</p>
              <div className="mt-4 space-y-2">
                {CUSTOM.map((c) => (
                  <div key={c} className="flex items-center justify-between rounded-md bg-paper-2 px-3 py-2 text-xs">
                    <span className="text-ink/70">{c}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[0.65rem] font-medium text-muted ring-1 ring-line">
                      Not in DS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-4 text-[0.7rem] text-muted">
          184 files scanned · generated by the audit-ds agent — some DS components are persona-specific; “not adopted” doesn&rsquo;t always mean “should be adopted here.”
        </p>
      </div>
    </figure>
  );
}
