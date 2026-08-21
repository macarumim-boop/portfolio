import { Icon } from "@/components/icons";

/**
 * Faithful recreation of the real AI-Builds hub landing page: a pixel-camp
 * scene where every designer gets a "campsite" linking to their prototypes.
 * Designer names are genericized (not real coworkers); the prototype counts
 * are illustrative, not the exact real distribution.
 */

const CAMPSITES = [
  { emoji: "🏕️", name: "Ranger", count: 9 },
  { emoji: "🧭", name: "Scout", count: 12 },
  { emoji: "🔥", name: "Ember", count: 4 },
  { emoji: "🌲", name: "Trailblazer", count: 6 },
];

export function AIBuildsHub() {
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
          ai-builds.campminder.internal
        </div>
      </div>

      {/* the camp scene */}
      <div className="relative overflow-hidden bg-[#0b1026] px-6 py-14 sm:px-10">
        {/* stars */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 46 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-white/70"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 65}%`,
                opacity: 0.3 + ((i * 13) % 60) / 100,
              }}
            />
          ))}
        </div>

        <div className="relative text-center">
          <p
            className="text-lg font-bold tracking-widest text-[#ffd66b] sm:text-2xl"
            style={{ textShadow: "0 0 16px rgba(255,214,107,0.5)" }}
          >
            CAMPMINDER
          </p>
          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#ff9d5c]">
            AI-Builds
          </p>
        </div>

        <p className="relative mt-10 text-center text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#ffd66b]/50">
          Select a campsite
        </p>

        <div className="relative mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {CAMPSITES.map((c) => (
            <div
              key={c.name}
              className="group relative border border-[#ffd66b]/20 bg-[#0b1026]/60 p-5 transition-colors hover:border-[#ffd66b]/50 hover:bg-[#0b1026]/80"
            >
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ffd66b]/40" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ffd66b]/40" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ffd66b]/40" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ffd66b]/40" />

              <div className="text-2xl">{c.emoji}</div>
              <p className="mt-2 text-xs font-bold tracking-wide text-[#ffd66b]">
                {c.name.toUpperCase()}&rsquo;S CAMPSITE
              </p>
              <p className="mt-1 text-[0.65rem] tracking-wide text-[#ffd66b]/40">
                {c.count} PROTOTYPE{c.count !== 1 ? "S" : ""}
              </p>
            </div>
          ))}
        </div>

        {/* ground + trees */}
        <div className="relative mt-12 flex items-end justify-center gap-6 sm:gap-10">
          {["🌲", "🌲", "🔥", "🌲", "🌲"].map((t, i) => (
            <span key={i} className={`text-2xl sm:text-3xl ${i === 2 ? "" : "opacity-80"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="relative mt-3 h-3 w-full bg-gradient-to-r from-[#2d5a27] via-[#4a8c3f] to-[#2d5a27]" />
      </div>

      <div className="bg-[#141a33] px-4 py-3 text-center">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#ffd66b]/60">
          Where ideas come to camp
        </p>
      </div>
    </figure>
  );
}
