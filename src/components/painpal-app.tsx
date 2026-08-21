"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

/**
 * Interactive mockup of the MyPainPal patient app. A real device frame with a
 * tab switcher for the key screens: Today, the daily check-in, the resource
 * library, medication reminders, and support. Built as live UI (not images) so
 * the craft is inspectable. Purple brand palette (#2B2855), 8px max radius,
 * plain and warm language, large targets. Fictional data, no real PHI.
 */

const PURPLE = "#2B2855";
const TINT = "rgba(43,40,85,0.08)";

const SCREENS = [
  { key: "today", label: "Today", caption: "A calm home: today's check-in, the next dose, and one tap to a person, never a wall of numbers." },
  { key: "checkin", label: "Daily check-in", caption: "A short, skippable survey in plain language. Pain, mood, and a free note, in their own words." },
  { key: "library", label: "Library", caption: "Reading, meditation and video, browsable freely and never handed out as homework." },
  { key: "meds", label: "Medications", caption: "Gentle reminders for their own regimen, with room to miss one without guilt." },
  { key: "support", label: "Support", caption: "One tap to reach a human when pain spikes, plus a quiet path to emotional support." },
];

export function PainpalApp() {
  const [screen, setScreen] = useState("today");
  const active = SCREENS.find((s) => s.key === screen) ?? SCREENS[0];

  return (
    <div className="flex flex-col items-center">
      {/* tab switcher */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {SCREENS.map((s) => (
          <button
            key={s.key}
            onClick={() => setScreen(s.key)}
            className="rounded-lg border px-3 py-1.5 text-sm transition-colors"
            style={
              s.key === screen
                ? { background: PURPLE, borderColor: PURPLE, color: "#fff" }
                : { borderColor: "#e5e5e5", color: "#525252", background: "#fff" }
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* device */}
      <div className="relative">
        <span className="absolute -left-[3px] top-24 h-14 w-[3px] rounded-l bg-ink/70" />
        <span className="absolute -right-[3px] top-20 h-9 w-[3px] rounded-r bg-ink/70" />
        <span className="absolute -right-[3px] top-32 h-14 w-[3px] rounded-r bg-ink/70" />

        <div className="w-[300px] rounded-[2.8rem] bg-ink p-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] sm:w-[324px]">
          <div className="relative aspect-[259/560] overflow-hidden rounded-[2.2rem] bg-[#f7f7f9]">
            {/* dynamic island */}
            <span className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />

            <div className="flex h-full flex-col">
              <StatusBar />
              <div className="flex-1 overflow-hidden">
                <Screen which={screen} />
              </div>
              <BottomNav active={screen} onChange={setScreen} />
            </div>
          </div>
        </div>
      </div>

      {/* caption */}
      <p className="mt-6 max-w-md text-center text-sm leading-snug text-ink/70">
        {active.caption}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- chrome */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-ink">
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" className="h-2.5 w-4" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.5} y={8 - i * 2.4} width="3" height={4 + i * 2.4} rx="0.6" fill="currentColor" />
          ))}
        </svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-4" fill="none" aria-hidden>
          <path d="M8 3c1.8 0 3.4.7 4.6 1.8M8 3C6.2 3 4.6 3.7 3.4 4.8M8 7c.8 0 1.5.3 2 .9M8 10.5l.01-.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="ml-0.5 inline-block h-2.5 w-4 rounded-[2px] border border-ink/70 p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
        </span>
      </span>
    </div>
  );
}

const NAV = [
  { key: "today", icon: "grid", label: "Today" },
  { key: "library", icon: "book", label: "Library" },
  { key: "checkin", icon: "clipboard", label: "Check-in" },
  { key: "meds", icon: "pill", label: "Meds" },
  { key: "support", icon: "heart", label: "Support" },
];

function BottomNav({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <div className="flex items-stretch justify-around border-t border-black/[0.06] bg-white px-1 pb-4 pt-2">
      {NAV.map((n) => {
        const on = n.key === active;
        return (
          <button
            key={n.key}
            onClick={() => onChange(n.key)}
            className="flex flex-1 flex-col items-center gap-1 py-1"
            style={{ color: on ? PURPLE : "#9a9aa2" }}
          >
            <Icon name={n.icon} className="h-[18px] w-[18px]" strokeWidth={on ? 2.4 : 1.8} />
            <span className="text-[9px] font-medium">{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- screens */

function Screen({ which }: { which: string }) {
  const base = "h-full overflow-y-auto px-5 pb-4 pt-2";
  switch (which) {
    case "today":
      return <div className={base}><Today /></div>;
    case "checkin":
      return <div className={base}><CheckIn /></div>;
    case "library":
      return <div className={base}><Library /></div>;
    case "meds":
      return <div className={base}><Meds /></div>;
    case "support":
      return <div className={base}><Support /></div>;
    default:
      return null;
  }
}

function Today() {
  return (
    <div className="space-y-4">
      <div className="pt-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink/40">Tuesday, Aug 12</p>
        <h3 className="mt-0.5 text-[19px] font-semibold text-ink">Good morning, Jane</h3>
      </div>

      {/* check-in prompt */}
      <div className="rounded-lg p-4 text-white" style={{ background: PURPLE }}>
        <p className="text-[13px] font-medium leading-snug">How are you feeling today?</p>
        <p className="mt-1 text-[12px] leading-snug text-white/70">
          A quick check-in helps your care team stay with you.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold" style={{ color: PURPLE }}>
            Start check-in
          </span>
          <span className="px-1 text-[12px] font-medium text-white/70">Not today</span>
        </div>
      </div>

      {/* next medication */}
      <div className="rounded-lg border border-black/[0.06] bg-white p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: TINT, color: PURPLE }}>
            <Icon name="pill" className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-ink">Next dose · 2:00 PM</p>
            <p className="text-[12px] text-ink/55">Oxycodone 5 mg</p>
          </div>
          <span className="rounded-md px-2 py-1 text-[11px] font-medium" style={{ background: TINT, color: PURPLE }}>
            In 3h
          </span>
        </div>
      </div>

      {/* reach a human */}
      <div className="rounded-lg border border-black/[0.06] bg-white p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#eafaf1] text-[#17a673]">
            <Icon name="phone" className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-ink">Talk to your care team</p>
            <p className="text-[12px] text-ink/55">One tap, any time pain spikes</p>
          </div>
          <Icon name="phone" className="h-4 w-4 text-ink/30" />
        </div>
      </div>

      {/* pick up where you left off */}
      <div>
        <p className="mb-2 text-[12px] font-semibold text-ink/70">From your library</p>
        <div className="rounded-lg border border-black/[0.06] bg-white p-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f0edf9]" style={{ color: PURPLE }}>
              <Icon name="brain" className="h-[18px] w-[18px]" />
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-ink">5-minute breathing for pain</p>
              <p className="text-[12px] text-ink/55">Meditation · 5 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIn() {
  const scale = [0, 2, 4, 6, 8, 10];
  return (
    <div className="space-y-5">
      <div className="pt-1">
        <h3 className="text-[18px] font-semibold text-ink">Daily check-in</h3>
        <p className="mt-1 text-[12px] leading-snug text-ink/55">
          Takes about a minute. You can stop anytime.
        </p>
      </div>

      {/* pain */}
      <div>
        <p className="text-[13px] font-medium text-ink">Your pain right now</p>
        <div className="mt-2 flex gap-1.5">
          {scale.map((n) => {
            const on = n === 4;
            return (
              <span
                key={n}
                className="flex h-9 flex-1 items-center justify-center rounded-md text-[13px] font-semibold"
                style={
                  on
                    ? { background: PURPLE, color: "#fff" }
                    : { background: "#fff", color: "#7a7a83", border: "1px solid #ececef" }
                }
              >
                {n}
              </span>
            );
          })}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-ink/40">
          <span>No pain</span>
          <span>Worst</span>
        </div>
      </div>

      {/* mood */}
      <div>
        <p className="text-[13px] font-medium text-ink">How's your mood?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Good", "Tired", "Anxious", "Low"].map((m) => {
            const on = m === "Tired";
            return (
              <span
                key={m}
                className="rounded-md px-3 py-1.5 text-[12px] font-medium"
                style={
                  on
                    ? { background: PURPLE, color: "#fff" }
                    : { background: "#fff", color: "#7a7a83", border: "1px solid #ececef" }
                }
              >
                {m}
              </span>
            );
          })}
        </div>
      </div>

      {/* note */}
      <div>
        <p className="text-[13px] font-medium text-ink">Anything you want to add?</p>
        <div className="mt-2 rounded-md border border-[#ececef] bg-white p-3 text-[12px] text-ink/40">
          In your own words…
        </div>
      </div>

      <button
        className="w-full rounded-md py-3 text-[13px] font-semibold text-white"
        style={{ background: PURPLE }}
      >
        Send to my care team
      </button>
      <p className="text-center text-[11px] text-ink/40">Rather not today? That's okay.</p>
    </div>
  );
}

function Library() {
  const items = [
    { icon: "brain", tag: "Meditation", tint: "#f0edf9", fg: PURPLE, title: "5-minute breathing for pain", meta: "5 min" },
    { icon: "book", tag: "Reading", tint: "#eef4ff", fg: "#2b5fd0", title: "Understanding opioid side effects", meta: "4 min read" },
    { icon: "monitor", tag: "Video", tint: "#fdeef4", fg: "#c0397e", title: "Gentle movement, resting in bed", meta: "8 min" },
    { icon: "heart", tag: "Reading", tint: "#eef4ff", fg: "#2b5fd0", title: "Talking to family about pain", meta: "6 min read" },
  ];
  return (
    <div className="space-y-4">
      <div className="pt-1">
        <h3 className="text-[18px] font-semibold text-ink">Your library</h3>
        <p className="mt-1 text-[12px] text-ink/55">Browse freely, whenever you want.</p>
      </div>

      <div className="flex gap-2">
        {["All", "Reading", "Meditation", "Video"].map((f) => {
          const on = f === "All";
          return (
            <span
              key={f}
              className="rounded-md px-2.5 py-1 text-[11px] font-medium"
              style={
                on
                  ? { background: PURPLE, color: "#fff" }
                  : { background: "#fff", color: "#7a7a83", border: "1px solid #ececef" }
              }
            >
              {f}
            </span>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {items.map((it) => (
          <div key={it.title} className="rounded-lg border border-black/[0.06] bg-white p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: it.tint, color: it.fg }}>
                <Icon name={it.icon} className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: it.fg }}>
                  {it.tag}
                </span>
                <p className="text-[13px] font-semibold leading-snug text-ink">{it.title}</p>
                <p className="text-[11px] text-ink/50">{it.meta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Meds() {
  const doses = [
    { time: "8:00 AM", name: "Oxycodone 5 mg", state: "taken" },
    { time: "2:00 PM", name: "Oxycodone 5 mg", state: "next" },
    { time: "8:00 PM", name: "Gabapentin 300 mg", state: "later" },
  ];
  return (
    <div className="space-y-4">
      <div className="pt-1">
        <h3 className="text-[18px] font-semibold text-ink">Medications</h3>
        <p className="mt-1 text-[12px] text-ink/55">Gentle reminders, never nagging.</p>
      </div>

      <div className="space-y-2.5">
        {doses.map((d) => {
          const taken = d.state === "taken";
          const next = d.state === "next";
          return (
            <div
              key={d.time + d.name}
              className="flex items-center gap-3 rounded-lg border bg-white p-3.5"
              style={{ borderColor: next ? PURPLE : "rgba(0,0,0,0.06)" }}
            >
              <span
                className="grid h-9 w-9 place-items-center rounded-lg"
                style={taken ? { background: "#eafaf1", color: "#17a673" } : { background: TINT, color: PURPLE }}
              >
                <Icon name={taken ? "shield" : "pill"} className="h-[18px] w-[18px]" />
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-ink">{d.time}</p>
                <p className="text-[12px] text-ink/55">{d.name}</p>
              </div>
              {taken && <span className="text-[11px] font-medium text-[#17a673]">Taken</span>}
              {next && (
                <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: PURPLE }}>
                  Mark taken
                </span>
              )}
              {d.state === "later" && <span className="text-[11px] text-ink/40">Later</span>}
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2.5 rounded-lg p-3.5" style={{ background: TINT }}>
        <Icon name="heart" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: PURPLE }} />
        <p className="text-[12px] leading-snug" style={{ color: PURPLE }}>
          We'll remind you when it's time. Missing one is okay, just take the next when you can.
        </p>
      </div>
    </div>
  );
}

function Support() {
  return (
    <div className="space-y-4">
      <div className="pt-1">
        <h3 className="text-[18px] font-semibold text-ink">Support</h3>
        <p className="mt-1 text-[12px] text-ink/55">Help is one tap away, no hurdles.</p>
      </div>

      {/* primary reach */}
      <div className="rounded-lg p-4 text-white" style={{ background: PURPLE }}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
            <Icon name="phone" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[14px] font-semibold">Reach your care team</p>
            <p className="text-[12px] text-white/70">A nurse sees this right away</p>
          </div>
        </div>
      </div>

      {/* pain spike */}
      <div className="rounded-lg border border-black/[0.06] bg-white p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#fef2f2] text-[#c0392b]">
            <Icon name="alert" className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-ink">If pain suddenly spikes</p>
            <p className="text-[12px] text-ink/55">Send a quiet alert to the clinic</p>
          </div>
        </div>
      </div>

      {/* emotional */}
      <div className="rounded-lg border border-black/[0.06] bg-white p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f0edf9]" style={{ color: PURPLE }}>
            <Icon name="message" className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-ink">Someone to talk to</p>
            <p className="text-[12px] text-ink/55">Emotional support, on your terms</p>
          </div>
        </div>
      </div>

      <p className="px-1 pt-1 text-[11px] leading-snug text-ink/40">
        In an emergency, call your local emergency number. This app does not replace urgent care.
      </p>
    </div>
  );
}
