"use client";

import { motion } from "motion/react";
import type { Review } from "@/lib/projects";

const gradients = [
  "linear-gradient(135deg, #4aa3ff, #0071e3)",
  "linear-gradient(135deg, #86868b, #424245)",
  "linear-gradient(135deg, #0071e3, #0058b8)",
  "linear-gradient(135deg, #a1a1a6, #6e6e73)",
];

/**
 * Real App Store reviews in a masonry layout with polished, iOS-flavored
 * cards: avatar chip, star rating, bold title, body, author.
 */
export function AppStoreReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2">
      {reviews.map((r, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 break-inside-avoid rounded-2xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_30px_-12px_rgba(0,0,0,0.12)]"
        >
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm text-white"
              style={{ background: gradients[i % gradients.length] }}
            >
              {r.author.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {r.author}
              </p>
              <Stars rating={r.rating} />
            </div>
            <span className="ml-auto shrink-0 rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
               App Store
            </span>
          </div>
          <h4 className="mt-4 text-base font-semibold leading-snug text-ink">
            {r.title}
          </h4>
          <blockquote className="mt-1.5 text-sm leading-relaxed text-ink/70">
            {r.quote}
          </blockquote>
        </motion.figure>
      ))}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} de 5 estrellas`} className="text-xs tracking-tight">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#0071e3" : "#d2d2d7" }}>
          ★
        </span>
      ))}
    </span>
  );
}
