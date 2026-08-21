"use client";

import { motion } from "motion/react";
import type { Finding, Principle, Decision } from "@/lib/projects";
import { Icon } from "@/components/icons";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
});

/**
 * "What we heard", research findings as quote-led cards. The "quote" variant
 * is a bolder, testimonial-style card (avatar cluster, big quote, attribution).
 */
export function FindingCards({
  findings,
  variant = "default",
}: {
  findings: Finding[];
  variant?: "default" | "quote";
}) {
  if (variant === "quote") return <Quotes findings={findings} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {findings.map((f, i) => {
        const text = f.title.replace(/^["“”]+|["“”]+$/g, "");
        return (
          <motion.div
            key={f.title}
            {...stagger(i)}
            className="flex flex-col rounded-2xl border border-line bg-paper-2 p-6"
          >
            <p className="font-display text-lg leading-snug text-ink">
              <span className="text-accent">“</span>
              {text}
              <span className="text-accent">”</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{f.detail}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function Quotes({ findings }: { findings: Finding[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {findings.map((f, i) => {
        const text = f.title.replace(/^["“”]+|["“”]+$/g, "");
        return (
          <motion.div
            key={f.title}
            {...stagger(i)}
            className="flex flex-col rounded-3xl border border-line bg-white p-6"
          >
            {/* avatar cluster */}
            <div className="flex items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white">
                <Icon name="message" className="h-5 w-5" />
              </span>
              <span className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-300 ring-4 ring-white">
                <Icon name="user" className="h-5 w-5 text-neutral-600" />
              </span>
            </div>

            <p
              className="mt-6 text-2xl leading-snug tracking-tight text-ink"
              style={{ fontWeight: 600 }}
            >
              {text}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              {f.detail}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Design principles, numbered cards. The "project" variant borrows the visual
 * language of a project-status card (folder icon, tag pill, title, description,
 * footer) without the task-tracking chrome, which doesn't apply to principles.
 */
export function PrincipleCards({
  principles,
  variant = "default",
  projectName = "Design system",
}: {
  principles: Principle[];
  variant?: "default" | "project";
  projectName?: string;
}) {
  if (variant === "project")
    return <PrincipleProjects principles={principles} projectName={projectName} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, i) => (
        <motion.div
          key={p.name}
          {...stagger(i)}
          className="rounded-2xl border border-line bg-paper-2 p-6"
        >
          <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-xs text-cream-on-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-display text-lg leading-tight text-ink">
            {p.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Illustrative status accents so the cards keep the project-board look.
// Purely decorative color + label, no fabricated metrics.
const PRJ = [
  { color: "#17a673", status: "Active" },
  { color: "#0071e3", status: "Active" },
  { color: "#f59e0b", status: "In review" },
  { color: "#0071e3", status: "In review" },
  { color: "#e0479e", status: "Planned" },
];

function PrincipleProjects({
  principles,
  projectName,
}: {
  principles: Principle[];
  projectName: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => {
        const d = PRJ[i % PRJ.length];
        return (
          <motion.div
            key={p.name}
            {...stagger(i)}
            className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-sm"
          >
            {/* folder + status */}
            <div className="flex items-center justify-between">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-ink/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 7a2 2 0 0 1 2-2h3.5l2 2H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
              </svg>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                style={{ color: d.color, background: `${d.color}14` }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: d.color }}
                />
                {d.status}
              </span>
            </div>

            {/* title + description */}
            <h3
              className="mt-4 text-lg leading-snug text-ink"
              style={{ fontWeight: 600 }}
            >
              {p.name}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/75">
              {p.detail}
            </p>

            {/* meta */}
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink/55">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6.5 18a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
              </svg>
              {projectName} · Design principle
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Key UX decisions. The "job" variant borrows the look of a job-listing card
 * (label pill, title, description, an icon meta row) with the listing-specific
 * fields (type/location/salary/link) swapped for real decision metadata.
 */
export function DecisionCards({
  decisions,
  variant = "default",
}: {
  decisions: Decision[];
  variant?: "default" | "job";
}) {
  if (variant === "job") return <DecisionJobs decisions={decisions} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {decisions.map((d, i) => (
        <motion.div
          key={d.decision}
          {...stagger(i)}
          className="group flex flex-col rounded-2xl border border-line bg-paper-2 p-6 transition-colors hover:border-accent"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-snug text-ink">
              {d.decision}
            </h3>
            <span className="mt-1 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
              Why
            </span>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              {d.rationale}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Real metadata per decision, mapped to the job-card's label + meta slots.
const DEC_META = [
  { label: "Reporting", color: "#0071e3", surface: "Patient app", surfaceIcon: "phone", aspect: "Low pressure", aspectIcon: "heart" },
  { label: "Content", color: "#17a673", surface: "Patient app", surfaceIcon: "phone", aspect: "Tone & voice", aspectIcon: "message" },
  { label: "Medication", color: "#e0479e", surface: "Patient app", surfaceIcon: "phone", aspect: "Clarity", aspectIcon: "eye" },
  { label: "Feedback", color: "#f59e0b", surface: "Patient app", surfaceIcon: "phone", aspect: "Plain status", aspectIcon: "activity" },
  { label: "Safety", color: "#0071e3", surface: "Both surfaces", surfaceIcon: "grid", aspect: "Escalation", aspectIcon: "alert" },
  { label: "Triage", color: "#17a673", surface: "Clinician desktop", surfaceIcon: "monitor", aspect: "Prioritization", aspectIcon: "users" },
];

function DecisionJobs({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {decisions.map((d, i) => {
        const fb = DEC_META[i % DEC_META.length];
        const m = d.job
          ? {
              label: d.job.tag,
              color: d.job.color ?? fb.color,
              surface: d.job.surface,
              surfaceIcon: d.job.surfaceIcon,
              aspect: d.job.aspect,
              aspectIcon: d.job.aspectIcon,
            }
          : fb;
        return (
          <motion.div
            key={d.decision}
            {...stagger(i)}
            className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-sm"
          >
            <span
              className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ color: m.color, background: `${m.color}14` }}
            >
              {m.label}
            </span>

            <h3
              className="mt-3 text-lg leading-snug text-ink"
              style={{ fontWeight: 600 }}
            >
              {d.decision}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {d.rationale}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm font-medium text-ink/75">
              <span className="flex items-center gap-2">
                <Icon name={m.surfaceIcon} className="h-4 w-4 text-ink/60" />
                {m.surface}
              </span>
              <span className="flex items-center gap-2">
                <Icon name={m.aspectIcon} className="h-4 w-4 text-ink/60" />
                {m.aspect}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
