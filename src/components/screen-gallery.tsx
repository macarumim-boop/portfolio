"use client";

import { motion } from "motion/react";
import type { Shot } from "@/lib/projects";

/**
 * Phone-mockup showcase, a horizontal, scroll-snapping strip of app screens
 * with captions. Optimized for tall portrait mockups so they don't waste
 * vertical space.
 */
export function ScreenGallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:thin]">
      <div className="flex snap-x snap-mandatory gap-5">
        {shots.map((s, i) => (
          <motion.figure
            key={s.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="w-[220px] shrink-0 snap-start sm:w-[248px]"
          >
            <div className="overflow-hidden rounded-3xl border border-line bg-paper-2 p-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                className="block w-full rounded-2xl"
              />
            </div>
            <figcaption className="mt-3 px-1 text-sm leading-snug text-muted">
              {s.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
