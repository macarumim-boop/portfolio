"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const COUNT_MS = 1400;
const HOLD_MS = 260;
const EXIT_MS = 900;

/**
 * Kinetic intro. An ink curtain with the name + a 00→100 counter, then it
 * wipes up to reveal the site. Plays once per session; skipped under
 * reduced-motion. Written to be re-runnable so React StrictMode's dev
 * double-invoke can't leave it stuck (the "seen" flag is set on completion,
 * not on start, and exit is driven by a timer, not transitionend).
 */
export function Intro() {
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("intro-seen");
    if (reduced.matches || seen) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("run");
    setCount(0);

    let raf = 0;
    let start = 0;
    const timers: number[] = [];

    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / COUNT_MS);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    timers.push(
      window.setTimeout(() => setPhase("exit"), COUNT_MS + HOLD_MS)
    );
    timers.push(
      window.setTimeout(() => {
        sessionStorage.setItem("intro-seen", "1");
        document.body.style.overflow = "";
        setPhase("done");
      }, COUNT_MS + HOLD_MS + EXIT_MS)
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-paper px-5 py-6 text-ink sm:px-8 sm:py-8"
      style={{
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.76,0,0.24,1)`,
      }}
    >
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <span>Index</span>
        <span>© 2026</span>
      </div>

      <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-none">
        {site.name.split(" ")[0]}
        <span className="text-accent">.</span>
      </h1>

      <div className="flex items-end justify-between">
        <span className="max-w-xs text-sm text-muted">{site.role}</span>
        <span className="font-mono text-6xl font-semibold leading-none text-accent tabular-nums sm:text-8xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
