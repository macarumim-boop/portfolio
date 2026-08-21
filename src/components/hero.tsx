"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * Hero, "artboard" composition inspired by the Dean template, in Camila's
 * palette. A heavy uppercase headline with a 3D-avatar slot embedded between
 * the words, crop-mark framing, pill CTAs. The avatar floats and parallaxes
 * toward the cursor. Drop a transparent PNG at /public/avatar.png (site.avatar)
 * to replace the design placeholder.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-0 items-center overflow-visible bg-paper px-4 py-10 sm:px-6 sm:py-14">
      {/* artboard frame */}
      <div className="relative mx-auto w-full max-w-6xl border border-line px-5 py-10 sm:px-10 sm:py-14">
        <CornerMarks />

        <div className="flex flex-col items-center text-center">
          {/* headline, mixed weights + fonts + colors */}
          <h1 className="rise leading-[0.92] tracking-[-0.03em]">
            {/* line 1 */}
            <span className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[clamp(2.5rem,8vw,7rem)]">
              <span className="font-display font-extrabold text-ink">
                Product
              </span>
              <AvatarSlot />
              <span className="accent-italic text-accent">designer</span>
            </span>
            {/* line 2, smaller, playful mix */}
            <span className="mt-2 flex flex-wrap items-baseline justify-center gap-x-3 text-[clamp(1.5rem,4.5vw,3.25rem)]">
              <span className="font-sans font-light text-ink/70">
                research-driven,
              </span>
              <span className="accent-italic text-green">human,</span>
              <span className="font-display font-extrabold text-pink">
                shipped.
              </span>
            </span>
          </h1>

          {/* subhead */}
          <p className="rise rise-3 mt-8 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            {site.tagline}
          </p>

          {/* CTAs */}
          <div className="rise rise-3 mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              data-cursor="grow"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-ink"
            >
              Let&rsquo;s talk
            </a>
            <Link
              href="#work"
              data-cursor="grow"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-base font-medium text-ink transition-colors hover:border-ink"
            >
              See work ↓
            </Link>
          </div>
        </div>

        {/* photo, top-left, disruptive: breaks the frame corner */}
        <div className="rise rise-2 absolute left-0 top-0 z-20 -translate-x-[12%] -translate-y-[32%] sm:-translate-x-1/3 sm:-translate-y-1/3">
          {/* rotated photo + sticker */}
          <div className="relative rotate-[-8deg]">
            <div className="relative h-28 w-28 sm:h-44 sm:w-44">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cami.png"
                alt={site.name}
                className="h-full w-full rounded-full border-4 border-white object-cover shadow-xl"
              />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-medium text-white shadow-lg">
                Hi, I&rsquo;m Cami 👋
              </span>
            </div>
          </div>

          {/* cute dashed arrow: tail near the headline, head pointing back at the photo */}
          <svg
            aria-hidden
            viewBox="0 0 200 120"
            className="pointer-events-none absolute left-[72%] top-[50%] hidden h-28 w-56 text-pink lg:block"
          >
            {/* curved dotted trail, stays above the letters */}
            <path
              d="M156 60 C 104 54, 78 24, 24 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="2 13"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

function AvatarSlot() {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const pointer = { x: -9999, y: -9999 };
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const loop = () => {
      const r = wrap.getBoundingClientRect();
      const dx = pointer.x - (r.left + r.width / 2);
      const dy = pointer.y - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.max(0, 1 - dist / 500);
      const tx = (dx / dist) * pull * 16;
      const ty = (dy / dist) * pull * 16;
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      wrap.style.transform = `translate(${cx}px, ${cy}px) rotate(${cx * 0.4}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      data-cursor="grow"
      className="inline-block align-middle will-change-transform"
      style={{ transition: "transform 0.1s linear" }}
    >
      <span className="animate-floaty block h-[0.95em] w-[0.95em]">
        {site.avatar ? (
          /\.(mp4|mov|webm)$/i.test(site.avatar) ? (
            <video
              src={site.avatar}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-[26%] object-cover"
            />
          ) : (
            <Image
              src={site.avatar}
              alt={site.name}
              width={220}
              height={220}
              className="h-full w-full rounded-[26%] object-cover"
              priority
            />
          )
        ) : (
          <AvatarPlaceholder />
        )}
      </span>
    </span>
  );
}

function AvatarPlaceholder() {
  return (
    <span
      className="relative grid h-full w-full place-items-center overflow-hidden rounded-[26%] shadow-xl"
      style={{
        background:
          "radial-gradient(120% 120% at 30% 20%, #4aa3ff 0%, #0071e3 45%, #0058b8 100%)",
      }}
    >
      {/* dotted texture */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1.4px, transparent 1.4px)",
          backgroundSize: "16px 16px",
        }}
      />
      <span className="relative font-display text-[0.34em] font-extrabold tracking-tight text-cream-on-ink">
        CR
      </span>
      <span className="absolute right-[10%] top-[10%] text-[0.2em] text-cream-on-ink/80">
        ✦
      </span>
    </span>
  );
}

function CornerMarks() {
  const base = "absolute h-4 w-4 text-ink/40";
  return (
    <div aria-hidden className="pointer-events-none">
      <span className={`${base} -left-2 -top-2`}>
        <Plus />
      </span>
      <span className={`${base} -right-2 -top-2`}>
        <Plus />
      </span>
      <span className={`${base} -bottom-2 -left-2`}>
        <Plus />
      </span>
      <span className={`${base} -bottom-2 -right-2`}>
        <Plus />
      </span>
    </div>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 16 16" className="h-full w-full">
      <path
        d="M8 1v14M1 8h14"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}
