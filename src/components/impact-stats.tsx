"use client";

import { motion } from "motion/react";
import type { ImpactStat } from "@/lib/projects";

/**
 * Contextualized metric callouts, big number + why it matters.
 * Adapts to 3 or 4 stats.
 */
const ACCENT: Record<string, string> = {
  green: "#17a673",
  accent: "#0071e3",
  pink: "#e0479e",
};

export function ImpactStats({
  stats,
  variant = "border",
}: {
  stats: ImpactStat[];
  variant?: "border" | "card";
}) {
  const cols =
    stats.length === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : stats.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-3";
  const isCard = variant === "card";
  return (
    <div className={`grid gap-4 ${isCard ? "" : "gap-x-8 gap-y-8"} ${cols}`}>
      {stats.map((s, i) => {
        const color = ACCENT[s.accent ?? "accent"];
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className={
              isCard
                ? "rounded-2xl border border-line bg-white p-6"
                : "border-t-2 pt-4"
            }
            style={isCard ? undefined : { borderColor: color }}
          >
            {isCard && (
              <span
                className="mb-4 block h-1 w-8 rounded-full"
                style={{ background: color }}
              />
            )}
            <p
              className={`font-display font-semibold leading-none ${
                isCard ? "text-2xl" : "text-4xl sm:text-5xl"
              }`}
              style={{ color: s.accent ? color : "#1d1d1f" }}
            >
              {s.value}
            </p>
            <p className="mt-3 text-sm font-medium text-ink">{s.label}</p>
            <p className="mt-1 text-sm text-ink/55">{s.context}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
