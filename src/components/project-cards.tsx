"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";

/**
 * Project cards: consistent white surface with a hairline border, a 3D tilt
 * that tracks the pointer, an oversized index number and a headline metric.
 * AI Product Design work is differentiated with a blue ring + a pulsing
 * "AI Product Design" badge, same layout, not a different card.
 */
export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-6">
      {projects.map((p, i) => (
        <TiltCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

// asymmetric spans per position (broken editorial grid)
const spans = [
  "sm:col-span-4",
  "sm:col-span-2",
  "sm:col-span-3",
  "sm:col-span-3",
  "sm:col-span-2",
  "sm:col-span-4",
];

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, "0");
  const span = spans[index % spans.length];
  const hasCover = Boolean(project.cover);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(320px circle at ${px * 100}% ${py * 100}%, rgba(0,113,227,0.08), transparent 60%)`;
    }
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm ${span} ${
        project.aiFirst ? "border-accent ring-1 ring-accent" : "border-line"
      }`}
      style={{
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
      }}
    >
      {hasCover ? (
        <>
          {/* full-bleed cover photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: project.coverPosition ?? "center" }}
          />
          {/* legibility scrim, stronger at the bottom where the text sits */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/55"
          />
        </>
      ) : (
        /* subtle textured dots */
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.05) 1.2px, transparent 1.2px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}
      {/* glare */}
      <div
        ref={glareRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />

      {/* top row */}
      <div className="relative flex items-start justify-between gap-4">
        {project.aiFirst ? (
          <span
            className={`inline-flex items-center gap-2 rounded-full border border-accent px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent ${
              hasCover ? "bg-white/90" : ""
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {project.discipline}
          </span>
        ) : (
          <span
            className={`font-mono text-xs uppercase tracking-[0.2em] ${
              hasCover ? "text-white/80" : "text-muted"
            }`}
          >
            {project.discipline} · {project.year}
          </span>
        )}
        <span
          className={`font-mono text-6xl font-semibold leading-none ${
            hasCover ? "text-white/25" : "text-ink/10"
          }`}
        >
          {num}
        </span>
      </div>

      {/* bottom content */}
      <div className="relative">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.metrics.slice(0, 1).map((m) => (
            <span
              key={m.label}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                hasCover
                  ? "border-white/30 bg-black/20 text-white backdrop-blur-sm"
                  : "border-line text-ink/80"
              }`}
            >
              {m.value} · {m.label}
            </span>
          ))}
        </div>
        <h3
          className={`font-display text-3xl leading-none tracking-tight sm:text-4xl ${
            hasCover ? "text-white" : "text-ink"
          }`}
        >
          {project.title}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <p className={`text-sm ${hasCover ? "text-white/75" : "text-muted"}`}>
            {project.subtitle}
          </p>
          <span
            className={`ml-4 text-2xl transition-transform duration-300 group-hover:translate-x-1 ${
              hasCover
                ? "text-white group-hover:text-white"
                : "text-ink group-hover:text-accent"
            }`}
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
