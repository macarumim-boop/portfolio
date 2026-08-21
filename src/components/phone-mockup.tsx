"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Shot } from "@/lib/projects";

/**
 * Functional phone mockup, the final screens live inside a realistic device
 * frame you can navigate: prev/next, a counter, keyboard arrows, and a
 * caption. Tapping the screen advances to the next.
 */
export function PhoneMockup({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > i || (i === shots.length - 1 && next === 0) ? 1 : -1);
    setI((next + shots.length) % shots.length);
  };
  const prev = () => go(i - 1);
  const next = () => go(i + 1);

  const current = shots[i];

  return (
    <div
      className="flex flex-col items-center"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      <div className="flex items-center gap-6 sm:gap-10">
        {/* prev */}
        <NavButton onClick={prev} label="Previous" dir="left" className="hidden sm:grid" />

        {/* device */}
        <div className="relative">
          {/* side buttons */}
          <span className="absolute -left-[3px] top-24 h-14 w-[3px] rounded-l bg-ink/70" />
          <span className="absolute -right-[3px] top-20 h-9 w-[3px] rounded-r bg-ink/70" />
          <span className="absolute -right-[3px] top-32 h-14 w-[3px] rounded-r bg-ink/70" />

          <button
            onClick={next}
            aria-label="Next screen"
            data-cursor="grow"
            className="block w-[248px] cursor-none rounded-[2.8rem] bg-ink p-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] sm:w-[272px]"
          >
            <div className="relative aspect-[259/577] overflow-hidden rounded-[2.2rem] bg-paper-2">
              {/* dynamic-island pill */}
              <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.caption}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </button>
        </div>

        {/* next */}
        <NavButton onClick={next} label="Next" dir="right" className="hidden sm:grid" />
      </div>

      {/* caption + counter */}
      <div className="mt-6 flex max-w-md flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <NavButton onClick={prev} label="Previous" dir="left" className="grid sm:hidden" />
          <span className="font-mono text-sm tabular-nums text-muted">
            {String(i + 1).padStart(2, "0")}{" "}
            <span className="text-ink/30">/ {String(shots.length).padStart(2, "0")}</span>
          </span>
          <NavButton onClick={next} label="Next" dir="right" className="grid sm:hidden" />
        </div>
        <p className="text-sm leading-snug text-ink/70">{current.caption}</p>
      </div>

      {/* progress dots */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {shots.map((_, j) => (
          <button
            key={j}
            aria-label={`Go to screen ${j + 1}`}
            onClick={() => go(j)}
            className={`h-1.5 rounded-full transition-all ${
              j === i ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  label,
  dir,
  className = "",
}: {
  onClick: () => void;
  label: string;
  dir: "left" | "right";
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-cursor="grow"
      className={`h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}
