export type DesignToneData = {
  guardrails: string[]; // "we avoided" anti-patterns
  line: string; // the tone in a few words
  sub: string; // the one-line equation
};

/**
 * The design stance, in two beats: what we deliberately refused to build
 * (the anti-patterns), and the tone we held instead. The gradient panel gives
 * the case one confident, quotable moment without breaking the restrained
 * language of the rest of the portfolio.
 */
export function DesignTone({ data }: { data: DesignToneData }) {
  return (
    <div className="space-y-6">
      {/* We avoided */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          We avoided
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.guardrails.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink/70"
            >
              <span className="text-[#dc2626]">✕</span>
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Design tone */}
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "linear-gradient(120deg, #0e3a4a 0%, #0071e3 100%)",
        }}
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
          Design tone
        </p>
        <p className="mt-4 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight tracking-tight text-white">
          {data.line}
        </p>
        <div className="mx-auto my-6 h-px w-full max-w-md bg-white/20" />
        <p
          className="font-display text-xl sm:text-2xl"
          style={{ color: "#cfe4ff" }}
        >
          {data.sub}
        </p>
      </div>
    </div>
  );
}
