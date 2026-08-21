import type { CompetitionTable as CompetitionTableType } from "@/lib/projects";

/**
 * Editorial feature-comparison, rebuilt from a client deck in the site's own
 * tokens. The Prickly Pear column is highlighted; a lead card frames the
 * headline takeaway (full coverage) so it reads at a glance.
 */
export function CompetitionTable({ competitors, rows }: CompetitionTableType) {
  const covered = rows.filter((r) => r.values[0]).length;
  // How far the best competitor gets, computed so the takeaway stays true
  // for any project's matrix (not hardcoded to one case study).
  const competitorMax = competitors
    .slice(1)
    .reduce(
      (max, _c, idx) =>
        Math.max(max, rows.filter((r) => r.values[idx + 1]).length),
      0,
    );

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
      {/* Lead takeaway card */}
      <div className="flex flex-col justify-between rounded-2xl border border-line bg-paper-2 p-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Edge
        </p>
        <div className="mt-6">
          <p className="font-mono text-6xl font-semibold leading-none text-accent">
            {covered}/{rows.length}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            {competitors[0]} was the only one to cover all {rows.length}{" "}
            attributes. No competitor got past {competitorMax}.
          </p>
        </div>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-wider text-muted">
                Attribute
              </th>
              {competitors.map((c, i) => (
                <th
                  key={c}
                  className={`px-3 py-4 text-center text-xs font-display ${
                    i === 0
                      ? "bg-accent/10 text-accent"
                      : "text-ink/60"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-t border-line">
                <td className="px-4 py-3 text-sm text-ink/85">{row.feature}</td>
                {row.values.map((v, j) => (
                  <td
                    key={j}
                    className={`px-3 py-3 text-center ${
                      j === 0 ? "bg-accent/10" : ""
                    }`}
                  >
                    {v ? (
                      <span
                        className={`text-base ${j === 0 ? "text-accent" : "text-ink/40"}`}
                      >
                        ✓
                      </span>
                    ) : (
                      <span className="text-base text-muted/40">–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
