"use client";

import { motion } from "motion/react";
import type { Pillar } from "@/lib/projects";

/**
 * Pillars with strategic depth, each a wide card: identity on the left,
 * goal + UX focus chips + governing design principle on the right.
 */
export function PillarsGrid({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="space-y-4">
      {pillars.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:grid-cols-12 sm:gap-8 sm:p-8"
        >
          {/* identity */}
          <div className="sm:col-span-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper-2 text-2xl">
              {p.icon}
            </span>
            <h3 className="mt-4 font-display text-2xl text-ink">{p.name}</h3>
            {p.tag && (
              <span className="mt-2 inline-block font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {p.tag}
              </span>
            )}
          </div>

          {/* strategy */}
          <div className="sm:col-span-8">
            <p className="text-lg leading-relaxed text-ink/85">{p.goal}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/75"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-6 border-l-2 border-accent pl-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                Design principle
              </span>
              <p className="mt-1 font-display text-lg text-ink">
                {p.principle}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
