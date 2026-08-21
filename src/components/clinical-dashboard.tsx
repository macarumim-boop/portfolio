"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

/**
 * Interactive mockup suite of the MyPainPal clinician web platform. One browser
 * frame with tabs that switch between the real screens: the patient dashboard,
 * a patient's medications, symptom log, study progress, and the task-group
 * builder. Purple brand palette (#290A51), 8px max radius, compact. Fictional data.
 */

const PURPLE = "#290A51"; // brand accent (buttons, chips, active states)
const TINT = "rgba(41,10,81,0.10)";
const SIDEBAR = PURPLE; // brand purple sidebar
const PANEL = "bg-white shadow-[0_1px_4px_rgba(130,143,163,0.22)]"; // Paces borderless floating card

const NAV = [
  { label: "Clinical Dashboard", icon: "grid", key: "clinical" },
  { label: "Study management", icon: "book", key: "study-mgmt" },
  { label: "Cohorts", icon: "users", key: "cohorts" },
  { label: "Content", icon: "file", key: "content" },
  { label: "Task Management", icon: "clipboard", key: "tasks" },
  { label: "Medication", icon: "pill", key: "medication" },
  { label: "Team", icon: "user", key: "team" },
  { label: "Providers", icon: "heart", key: "providers" },
];

const TABS = [
  { key: "dashboard", label: "Dashboard", url: "clinical-dashboard", nav: "clinical" },
  { key: "alerts", label: "Alerts", url: "alerts", nav: "clinical" },
  { key: "demographics", label: "Patient Overview", url: "patients/cooper-jane", nav: "clinical" },
  { key: "medications", label: "Medications", url: "patients/cooper-jane/medications", nav: "clinical" },
  { key: "symptoms", label: "Symptom Log", url: "patients/cooper-jane/symptoms", nav: "clinical" },
  { key: "study", label: "Study Progress", url: "patients/cooper-jane/study", nav: "clinical" },
];

function pill(fg: string, bg: string) {
  return `inline-block whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium`;
}

export function ClinicalDashboard() {
  const [tab, setTab] = useState("dashboard");
  const active = TABS.find((t) => t.key === tab) ?? TABS[0];

  return (
    <div>
      {/* tab switcher */}
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="rounded-md border px-3 py-1.5 text-sm transition-colors"
            style={
              t.key === tab
                ? { background: PURPLE, borderColor: PURPLE, color: "#fff" }
                : { borderColor: "#e5e5e5", color: "#525252", background: "#fff" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <figure
        className="overflow-hidden rounded-md bg-white text-[13px] shadow-[0_20px_60px_-28px_rgba(0,0,0,0.28)]"
        style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif" }}
      >
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-[#e9eaf0] bg-[#f6f7fb] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-line">
            <Icon name="lock" className="h-3 w-3" />
            app.mypainpal.com/{active.url}
          </div>
        </div>

        <div className="flex">
          <Sidebar active={active.nav} />
          <div className="min-w-0 flex-1 bg-[#f6f7fb]">
            <TopBar />
            <div className="p-5">
              {tab === "dashboard" && <DashboardScreen />}
              {tab === "alerts" && <AlertsScreen />}
              {(tab === "demographics" ||
                tab === "medications" ||
                tab === "symptoms" ||
                tab === "study") && (
                <PatientScreen tab={tab} onTab={setTab} />
              )}
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}

/* ---- shared chrome ---------------------------------------------- */

const NAV_SECTIONS = [
  { title: "Clinical", keys: ["clinical", "cohorts", "content"] },
  { title: "Study", keys: ["study-mgmt", "tasks", "medication"] },
  { title: "People", keys: ["team", "providers"] },
];

function Sidebar({ active }: { active: string }) {
  const byKey = Object.fromEntries(NAV.map((n) => [n.key, n]));
  return (
    <aside
      className="hidden w-52 shrink-0 flex-col px-3 py-4 text-white sm:flex"
      style={{ background: SIDEBAR }}
    >
      <div className="flex items-center gap-2 px-2 pb-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs font-bold"
          style={{ color: PURPLE }}
        >
          M
        </span>
        <span className="text-sm font-semibold tracking-tight">MyPainPal</span>
      </div>
      <nav className="mt-2 space-y-4">
        {NAV_SECTIONS.map((sec) => (
          <div key={sec.title}>
            <p className="px-2.5 pb-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/35">
              {sec.title}
            </p>
            <div className="space-y-0.5">
              {sec.keys.map((k) => {
                const n = byKey[k];
                if (!n) return null;
                const on = n.key === active;
                return (
                  <div
                    key={n.key}
                    className="relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[0.8rem] transition-colors"
                    style={
                      on
                        ? { background: "rgba(255,255,255,0.12)", color: "#fff" }
                        : { color: "rgba(255,255,255,0.55)" }
                    }
                  >
                    {on && (
                      <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r bg-white" />
                    )}
                    <Icon name={n.icon} className="h-[17px] w-[17px]" strokeWidth={on ? 2.2 : 1.8} />
                    <span className="flex-1">{n.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#edeef1] bg-white px-5 py-2.5">
      <div className="flex w-64 items-center gap-2 rounded-md bg-[#f5f6f8] px-3 py-1.5 text-muted">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
        <span className="text-xs">Search patients, cohorts…</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-ink/50 hover:bg-paper-2">
          <Icon name="bell" className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#e0479e]" />
        </button>
        <span className="h-5 w-px bg-[#edeef1]" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0479e] text-[0.65rem] font-semibold text-white">
          DR
        </span>
        <div className="hidden leading-tight sm:block">
          <p className="text-xs font-semibold text-ink">Dianne Russell</p>
          <p className="text-[0.65rem] text-muted">Clinical lead</p>
        </div>
      </div>
    </div>
  );
}

/* ---- 1. dashboard ----------------------------------------------- */

const DASH_STATS = [
  { label: "Active Patients", value: "1,000", icon: "users", delta: "12%", note: "Since last month", good: true, tint: "rgba(43,40,85,0.08)", fg: PURPLE },
  { label: "Pending Review", value: "500", icon: "clock", delta: "Stable", note: "Awaiting clinical review", good: null, tint: "#fff3e0", fg: "#c77700" },
  { label: "Deactivated", value: "500", icon: "alert", delta: "5%", note: "Since last month", good: false, tint: "#fdecec", fg: "#c0392b" },
];

const DASH_ROWS = [
  { init: "JC", av: "#6d28d9", name: "Cooper, Jane", meta: "67 y.o. / Female", mrn: "1234123", p1: "Andrea Erzinger, MD", p2: "Andrea Erzinger, MD", survey: "—", comp: "Poor" },
  { init: "WW", av: "#0071e3", name: "Warren, Wade", meta: "88 y.o. / Male", mrn: "1234124", p1: "Courtney Henry, MD", p2: "Courtney Henry, MD", survey: "02/08/2023", comp: "Very Frequent" },
  { init: "EH", av: "#17a673", name: "Howard, Esther", meta: "42 y.o. / Female", mrn: "1234125", p1: "Brooklyn Simmons, MD", p2: "Brooklyn Simmons, MD", survey: "—", comp: "—" },
  { init: "CW", av: "#e0479e", name: "William, Cameron", meta: "56 y.o. / Male", mrn: "1234126", p1: "Theresa Webb, MD", p2: "Theresa Webb, MD", survey: "02/08/2023", comp: "Good" },
  { init: "BC", av: "#f59e0b", name: "Cooper, Bessie", meta: "78 y.o. / Female", mrn: "1234127", p1: "Dianne Russell, MD", p2: "Dianne Russell, MD", survey: "02/08/2023", comp: "Fair" },
  { init: "CW", av: "#0e9488", name: "Cooper, Wes", meta: "61 y.o. / Male", mrn: "1234128", p1: "Dianne Russell, MD", p2: "Dianne Russell, MD", survey: "02/08/2023", comp: "Fair" },
];

function compChip(v: string) {
  const map: Record<string, { fg: string; bg: string }> = {
    Poor: { fg: "#b3261e", bg: "#fdecec" },
    "Very Frequent": { fg: "#6d28d9", bg: "rgba(109,40,217,0.1)" },
    Good: { fg: "#0f7a52", bg: "#e8f6f0" },
    Fair: { fg: "#a16207", bg: "#fef8e7" },
  };
  const c = map[v];
  if (!c) return <span className="text-ink/30">—</span>;
  return (
    <span className={pill(c.fg, c.bg)} style={{ color: c.fg, background: c.bg }}>
      {v}
    </span>
  );
}

function DashboardScreen() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold text-ink">Clinical Dashboard</h4>
          <p className="text-xs text-muted">Manage and monitor all patient records</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-white"
          style={{ background: PURPLE }}
        >
          <Icon name="user" className="h-4 w-4" /> Add Patient
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DASH_STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-md bg-white p-4 shadow-[0_1px_4px_rgba(130,143,163,0.22)]"
          >
            <div className="flex items-start justify-between">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">{s.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: s.tint, color: s.fg }}>
                <Icon name={s.icon} className="h-[18px] w-[18px]" />
              </span>
            </div>
            <p className="mt-3 text-[26px] font-bold leading-none text-ink">{s.value}</p>
            <p className="mt-2 flex items-center gap-1 text-xs">
              <span
                className="inline-flex items-center gap-0.5 font-semibold"
                style={{ color: s.good === true ? "#0f7a52" : s.good === false ? "#b3261e" : "#525252" }}
              >
                {s.good === true ? "▲" : s.good === false ? "▼" : ""}
                {s.delta}
              </span>{" "}
              <span className="text-muted">{s.note}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-[#e7e9eb] bg-white px-3 py-1.5 text-muted">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
          Search by name or MRN
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium"><Icon name="grid" className="h-4 w-4" /> Columns</button>
        <button className="flex items-center gap-1.5 rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium"><Icon name="eye" className="h-4 w-4" /> Filters</button>
        <button className="rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium">Show 10 ▾</button>
        <button className="flex items-center gap-1.5 rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium"><Icon name="file" className="h-4 w-4" /> Export</button>
      </div>

      <div className="mt-4 overflow-hidden rounded-md bg-white shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
        <div className="overflow-x-auto">
          <table className="min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eef2f7] text-[11px] font-bold uppercase text-[#8491a5]">
                {["Status", "Full name", "MRN #", "Provider 1", "Provider 2", "Last survey", "Pain compliance"].map((c) => (
                  <th key={c} className="whitespace-nowrap px-4 py-2.5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DASH_ROWS.map((r) => (
                <tr key={r.mrn} className="border-b border-[#eef2f7] hover:bg-[#f8f9fb]">
                  <td className="px-4 py-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8f6f0] text-[#17a673]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11" /></svg>
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full text-[0.6rem] font-semibold text-white" style={{ background: r.av }}>{r.init}</span>
                      <div className="leading-tight">
                        <p className="font-medium text-ink">{r.name}</p>
                        <p className="text-xs text-muted">{r.meta}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-ink/60">{r.mrn}</td>
                  <td className="px-4 py-2.5 text-ink/70">{r.p1}</td>
                  <td className="px-4 py-2.5 text-ink/70">{r.p2}</td>
                  <td className="px-4 py-2.5 text-ink/60">{r.survey}</td>
                  <td className="px-4 py-2.5">{compChip(r.comp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ---- patient header + sub-tabs (shared by 2–4) ------------------ */

function PatientHeader({
  tab,
  onTab,
}: {
  tab: string;
  onTab: (t: string) => void;
}) {
  const sub = [
    { key: "demographics", label: "Demographics" },
    { key: "medications", label: "Medications" },
    { key: "symptoms", label: "Symptoms" },
    { key: "study", label: "Study Progress" },
  ];
  return (
    <div>
      <h4 className="text-lg font-semibold text-ink">Cooper, Jane</h4>
      <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        <span><b className="font-medium text-ink/70">MRN:</b> 1234123</span>
        <span><b className="font-medium text-ink/70">DOB:</b> 07/28/1980</span>
        <span><b className="font-medium text-ink/70">Age:</b> 44</span>
        <span><b className="font-medium text-ink/70">Gender:</b> Female</span>
        <span className="flex items-center gap-1.5">
          <b className="font-medium text-ink/70">Status:</b>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#e8f6f0] px-2 py-0.5 font-medium text-[#0f7a52]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#17a673]" /> Active
          </span>
        </span>
      </div>
      <div className="mt-4 flex gap-5 border-b border-line text-sm">
        {sub.map((s) => {
          const on = s.key === tab || (s.key === "demographics" && tab === "demographics");
          const clickable = ["demographics", "medications", "symptoms", "study"].includes(s.key);
          return (
            <button
              key={s.key}
              onClick={() => clickable && onTab(s.key)}
              className="relative -mb-px pb-2.5"
              style={on ? { color: PURPLE, fontWeight: 600 } : { color: "#737373" }}
            >
              {s.label}
              {on && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full" style={{ background: PURPLE }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PatientScreen({ tab, onTab }: { tab: string; onTab: (t: string) => void }) {
  return (
    <div>
      <PatientHeader tab={tab} onTab={onTab} />
      <div className="mt-5">
        {tab === "demographics" && <OverviewScreen />}
        {tab === "medications" && <MedsScreen />}
        {tab === "symptoms" && <SymptomScreen />}
        {tab === "study" && <StudyScreen />}
      </div>
    </div>
  );
}

/* ---- 2. medications --------------------------------------------- */

const MEDS = [
  { st: "Active", name: "Gabapentin", dose: "300mg", ins: "1 cap, 3 times", cat: "Anticonvulsant", upd: "Oct 24, 2024", by: "Dr. Russell" },
  { st: "Active", name: "Oxycodone", dose: "5mg", ins: "1 tab every 6h", cat: "Opioid Analgesic", upd: "Oct 22, 2024", by: "Dr. Russell" },
  { st: "Active", name: "Acetaminophen", dose: "500mg", ins: "2 tabs every 8h", cat: "Analgesic", upd: "Sep 15, 2024", by: "Nurse Joy" },
  { st: "Declined", name: "Duloxetine", dose: "60mg", ins: "1 cap daily", cat: "SNRI", upd: "Aug 30, 2024", by: "Dr. Smith" },
  { st: "Active", name: "Cyclobenzaprine", dose: "10mg", ins: "1 tab every 8h", cat: "Muscle Relaxant", upd: "Aug 12, 2024", by: "Dr. Russell" },
  { st: "Stopped", name: "Ibuprofen", dose: "800mg", ins: "1 tab every 8h", cat: "NSAID", upd: "Jul 04, 2024", by: "System" },
  { st: "Active", name: "Lidocaine Patch", dose: "5%", ins: "Apply 1 patch", cat: "Anesthetic", upd: "Jun 20, 2024", by: "Dr. Russell" },
  { st: "Declined", name: "Amitriptyline", dose: "25mg", ins: "1 tab at night", cat: "Tricyclic", upd: "May 10, 2024", by: "Dr. Strange" },
];

function medStatus(st: string) {
  const m: Record<string, { fg: string; dot: string }> = {
    Active: { fg: "#0f7a52", dot: "#17a673" },
    Declined: { fg: "#b3261e", dot: "#dc2626" },
    Stopped: { fg: "#a16207", dot: "#f59e0b" },
  };
  const c = m[st] ?? m.Active;
  return (
    <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: c.fg }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.dot }} /> {st}
    </span>
  );
}

function MedsScreen() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h5 className="flex items-center gap-2 font-semibold text-ink">
          <span className="text-ink/40">←</span> Medications
        </h5>
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium">View Discontinued</button>
          <button className="flex items-center gap-1.5 rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium"><Icon name="pill" className="h-4 w-4" /> Add Manually</button>
          <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium text-white" style={{ background: PURPLE }}><Icon name="file" className="h-4 w-4" /> Sync from EHR</button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-md border border-[#e7e9eb] bg-white px-3 py-1.5 text-muted">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
        Search medications…
      </div>

      <div className="mt-4 overflow-hidden rounded-md bg-white shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eef2f7] text-[11px] font-bold uppercase text-[#8491a5]">
                {["Status", "Medication name", "Dosage", "Instructions", "Category", "Last updated", "Edited by"].map((c) => (
                  <th key={c} className="whitespace-nowrap px-4 py-2.5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEDS.map((m) => (
                <tr key={m.name} className="border-b border-[#eef2f7] hover:bg-[#f8f9fb]">
                  <td className="px-4 py-2.5">{medStatus(m.st)}</td>
                  <td className="px-4 py-2.5 font-medium text-ink">{m.name}</td>
                  <td className="px-4 py-2.5 text-ink/70">{m.dose}</td>
                  <td className="px-4 py-2.5 text-ink/60">{m.ins}</td>
                  <td className="px-4 py-2.5 text-ink/60">{m.cat}</td>
                  <td className="px-4 py-2.5 text-ink/60">{m.upd}</td>
                  <td className="px-4 py-2.5 text-ink/60">{m.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-muted">
          <span>Page 1 of 3</span>
          <div className="flex items-center gap-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line">‹</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ background: PURPLE }}>1</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink/70">2</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink/70">3</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- 3. symptom log --------------------------------------------- */

const SYMPTOMS = [
  { name: "Lower Back Pain", state: "Resolved", sev: 7, date: "Oct 24, 2024", time: "09:30 AM", dur: "2 hours", note: "Radiating to left leg" },
  { name: "Migraine", state: "Resolved", sev: 9, date: "Oct 22, 2024", time: "02:15 PM", dur: "4 hours", note: "Sensitive to light" },
  { name: "Nausea", state: "Resolved", sev: 4, date: "Oct 22, 2024", time: "03:00 PM", dur: "1 hour", note: "After taking medication" },
  { name: "Joint Stiffness", state: "Active", sev: 3, date: "Oct 21, 2024", time: "08:00 AM", dur: "1 hour", note: "Morning stiffness" },
  { name: "Fatigue", state: "Active", sev: 5, date: "Oct 20, 2024", time: "10:00 AM", dur: "All day", note: "General weakness" },
  { name: "Dizziness", state: "Resolved", sev: 6, date: "Oct 18, 2024", time: "01:30 PM", dur: "30 mins", note: "While standing up" },
];

function sevColor(n: number) {
  return n >= 7 ? "#dc2626" : n >= 5 ? "#f59e0b" : "#17a673";
}

function SymptomScreen() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h5 className="font-semibold text-ink">Symptom Log</h5>
          <p className="text-xs text-muted">Track and monitor patient reported symptoms over time.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md bg-[#eef2f7] px-2.5 py-1.5 text-[#313a46] font-medium"><Icon name="clock" className="h-4 w-4" /> Select Range</button>
          <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium text-white" style={{ background: PURPLE }}><Icon name="activity" className="h-4 w-4" /> Log Symptom</button>
        </div>
      </div>

      {/* chart + cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-md bg-white p-4 shadow-[0_1px_4px_rgba(130,143,163,0.22)] lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-ink">Severity Trend</p>
              <p className="text-xs text-muted">Average symptom intensity over last 7 days</p>
            </div>
            <span className="rounded-md bg-[#e8f6f0] px-2 py-0.5 text-xs font-semibold text-[#0f7a52]">↑ 12% vs last week</span>
          </div>
          <TrendChart />
          <div className="mt-1 flex justify-between text-[0.65rem] text-muted">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-md bg-white p-4 shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Most Frequent</span>
              <span style={{ color: PURPLE }}><Icon name="activity" className="h-4 w-4" /></span>
            </div>
            <p className="mt-1 font-semibold text-ink">Lower Back Pain</p>
            <p className="text-xs text-muted">● Moderate Avg</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Total Logs</span>
              <Icon name="clock" className="h-4 w-4 text-ink/40" />
            </div>
            <p className="mt-1 text-2xl font-semibold text-ink">12</p>
            <p className="text-xs text-muted">Last 30 days</p>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-md bg-white shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
        <div className="overflow-x-auto">
          <table className="min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eef2f7] text-[11px] font-bold uppercase text-[#8491a5]">
                {["Symptom", "Severity (1-10)", "Date & time", "Duration", "Notes"].map((c) => (
                  <th key={c} className="whitespace-nowrap px-4 py-2.5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYMPTOMS.map((s) => (
                <tr key={s.name} className="border-b border-[#eef2f7] hover:bg-[#f8f9fb]">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-ink">{s.name}</p>
                    <p className="text-[0.6rem] uppercase tracking-wide text-muted">{s.state}</p>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink">{s.sev}</span>
                      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-[#eee]">
                        <span className="block h-full rounded-full" style={{ width: `${s.sev * 10}%`, background: sevColor(s.sev) }} />
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-ink/70">{s.date}<br /><span className="text-xs text-muted">{s.time}</span></td>
                  <td className="px-4 py-2.5 text-ink/60">{s.dur}</td>
                  <td className="px-4 py-2.5 text-ink/60">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TrendChart() {
  // fixed illustrative 7-point series
  const pts = [3, 4, 3.4, 5.5, 8, 5, 6.5];
  const w = 560, h = 120, max = 10;
  const step = w / (pts.length - 1);
  const xy = pts.map((p, i) => [i * step, h - (p / max) * h]);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-28 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.18" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#tg)" />
      <path d={line} fill="none" stroke={PURPLE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- 4. study progress ------------------------------------------ */

const STUDY_OVERVIEW = [
  { icon: "clipboard", label: "Task assigned", sub: "Overall completion", value: "30%", meta: "30 / 100" },
  { icon: "clock", label: "Resource use", sub: "Time engaged", value: "58h", meta: "" },
  { icon: "file", label: "Notebook Entries", sub: "Symptoms logged", value: "58", meta: "" },
  { icon: "grid", label: "Tasks Completed", sub: "Assignments done", value: "30%", meta: "30 / 100" },
  { icon: "book", label: "Resources Viewed", sub: "Unique materials", value: "58", meta: "" },
  { icon: "activity", label: "Surveys Completed", sub: "Submissions", value: "24", meta: "" },
];

const STUDY_GROUPS = [
  { name: "Baseline Assessments", state: "Completed", due: "10/15/2023", done: "10/14/2023", open: true },
  { name: "Week 1 Monitoring", state: "Completed", due: "10/22/2023", done: "10/21/2023", open: false },
  { name: "Week 2 Monitoring", state: "In Progress", due: "10/29/2023", done: "—", open: false },
  { name: "Month 1 Review", state: "Pending", due: "11/15/2023", done: "—", open: false },
];

function StudyScreen() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["CHAMP (02/2020)", "I-STAMP (10/2023–01/2024)", "CHAMP (02/2020–05/2020)", "I-STAMP (10/2023)"].map((c, i) => (
          <span key={c} className="rounded-md border px-3 py-1.5 text-xs" style={i === 0 ? { borderColor: PURPLE, color: PURPLE, background: TINT } : { borderColor: "#e5e5e5", color: "#525252" }}>{c}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md border border-[#bbe6d3] bg-[#e8f6f0] px-4 py-3">
        <span className="flex items-center gap-2 font-medium text-[#0f7a52]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#17a673] text-white"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11" /></svg></span>
          Study Completed Successfully · May 24, 2024
        </span>
        <button className="rounded-md border border-[#bbe6d3] bg-white px-2.5 py-1.5 text-ink/70">Study Settings</button>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-ink">CHAMP: Chronic Pain Management Study</p>
        <div className="mt-2 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          {[["Study ID", "112344"], ["Cohort", "Cohort A – Placebo"], ["Study Period", "Feb 15 – May 24, 2024"], ["Recent Activity", "Last 7 days"]].map(([k, v]) => (
            <div key={k}><p className="uppercase tracking-wide text-muted">{k}</p><p className="mt-0.5 font-medium text-ink">{v}</p></div>
          ))}
        </div>
      </div>

      <p className="mt-5 font-semibold text-ink">Study Progress Overview</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STUDY_OVERVIEW.map((s) => (
          <div key={s.label} className="rounded-md bg-white p-3.5 shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: TINT, color: PURPLE }}><Icon name={s.icon} className="h-4 w-4" /></span>
            <p className="mt-2 text-xs font-medium text-ink">{s.label}</p>
            <p className="text-[0.65rem] text-muted">{s.sub}</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-semibold text-ink">{s.value}</span>
              {s.meta && <span className="text-[0.65rem] text-muted">{s.meta}</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-md bg-white shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
        <div className="flex items-center justify-between px-4 py-3">
          <h5 className="font-semibold text-ink">Task &amp; Resource Log</h5>
          <div className="flex gap-1 rounded-md bg-paper-2 p-0.5 text-xs">
            <span className="rounded-md bg-white px-2.5 py-1 font-medium text-ink shadow-sm">Tasks</span>
            <span className="px-2.5 py-1 text-muted">Resources Reviewed</span>
          </div>
        </div>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-y border-line border-b border-[#eef2f7] text-[11px] font-bold uppercase text-[#8491a5]">
              <th className="px-4 py-2.5">Group name</th><th className="px-4 py-2.5">Due date</th><th className="px-4 py-2.5">Completed</th>
            </tr>
          </thead>
          <tbody>
            {STUDY_GROUPS.map((g) => (
              <tr key={g.name} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span className="text-ink/30">{g.open ? "▾" : "▸"}</span>
                    <span className="font-medium text-ink">{g.name}</span>
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase"
                      style={
                        g.state === "Completed" ? { color: "#0f7a52", background: "#e8f6f0" }
                          : g.state === "In Progress" ? { color: "#6d28d9", background: "rgba(109,40,217,0.1)" }
                            : { color: "#a16207", background: "#fef8e7" }
                      }
                    >{g.state}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-ink/60">{g.due}</td>
                <td className="px-4 py-3 text-ink/60">{g.done}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- 6. patient overview (demographics) ------------------------- */

const CARD = "rounded-md bg-white p-4 shadow-[0_1px_4px_rgba(130,143,163,0.22)]";

function OverviewScreen() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {/* physical status */}
        <div className={CARD}>
          <div className="flex items-center justify-between">
            <h5 className="flex items-center gap-2 font-semibold text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(43,40,85,0.08)", color: PURPLE }}>
                <Icon name="activity" className="h-4 w-4" />
              </span>
              Physical status
            </h5>
            <span className="text-xs text-muted">Updated 2h ago</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Current pain", v: "4/10", s: "Moderate" },
              { k: "Mobility", v: "Limited", s: "Assisted" },
              { k: "Sleep", v: "5.5h", s: "Below target" },
              { k: "Appetite", v: "Fair", s: "Stable" },
            ].map((m) => (
              <div key={m.k}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">{m.k}</p>
                <p className="mt-1 text-lg font-bold text-ink">{m.v}</p>
                <p className="text-[0.7rem] text-muted">{m.s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* emotional status */}
        <div className={CARD}>
          <div className="flex items-center justify-between">
            <h5 className="flex items-center gap-2 font-semibold text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fdeef4] text-[#c0397e]">
                <Icon name="heart" className="h-4 w-4" />
              </span>
              Emotional status
            </h5>
            <span className="text-xs text-muted">From daily check-ins</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { l: "Mood: Low–moderate", fg: "#a16207", bg: "#fef8e7" },
              { l: "Anxiety: Elevated", fg: "#b3261e", bg: "#fdecec" },
              { l: "Distress (PHQ): Mild", fg: "#0f7a52", bg: "#e8f6f0" },
              { l: "Engagement: Steady", fg: PURPLE, bg: "rgba(43,40,85,0.08)" },
            ].map((c) => (
              <span key={c.l} className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ color: c.fg, background: c.bg }}>
                {c.l}
              </span>
            ))}
          </div>
          <p className="mt-3 rounded-md bg-[#f5f6f8] p-3 text-xs leading-relaxed text-ink/70">
            &ldquo;Some hard days this week, but the breathing exercises help. Wants to talk less about numbers, more about how to rest.&rdquo;
          </p>
        </div>

        {/* medical history */}
        <div className={CARD}>
          <h5 className="flex items-center gap-2 font-semibold text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef4ff] text-[#2b5fd0]">
              <Icon name="file" className="h-4 w-4" />
            </span>
            Medical history
          </h5>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              { k: "Primary diagnosis", v: "Stage III breast cancer · dx 2022" },
              { k: "Comorbidities", v: "Hypertension, Type 2 diabetes" },
              { k: "Procedures", v: "Lumpectomy (2022), Port placement (2023)" },
            ].map((r) => (
              <div key={r.k} className="flex flex-col gap-0.5 border-b border-dashed border-[#e7e9eb] pb-3 last:border-0 last:pb-0 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 text-muted">{r.k}</dt>
                <dd className="text-ink/80">{r.v}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-1.5 pt-0.5 sm:flex-row sm:gap-4">
              <dt className="w-40 shrink-0 text-muted">Allergies</dt>
              <dd className="flex flex-wrap gap-1.5">
                {["Penicillin", "Codeine"].map((a) => (
                  <span key={a} className="rounded-md bg-[#fdecec] px-2 py-0.5 text-xs font-medium text-[#b3261e]">{a}</span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* right rail */}
      <div className="space-y-4">
        <div className={CARD}>
          <h5 className="font-semibold text-ink">Care team</h5>
          <div className="mt-3 space-y-3">
            {[
              { in: "AE", c: "#6d28d9", n: "Andrea Erzinger, MD", r: "Oncologist" },
              { in: "NJ", c: "#17a673", n: "Nurse Joy", r: "Palliative care" },
              { in: "DR", c: "#e0479e", n: "Dianne Russell", r: "Clinical lead" },
            ].map((p) => (
              <div key={p.n} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-[0.6rem] font-semibold text-white" style={{ background: p.c }}>{p.in}</span>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-ink">{p.n}</p>
                  <p className="text-xs text-muted">{p.r}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-white" style={{ background: PURPLE }}>
            <Icon name="message" className="h-4 w-4" /> Message care team
          </button>
        </div>

        <div className={CARD}>
          <h5 className="font-semibold text-ink">Study snapshot</h5>
          <dl className="mt-3 space-y-2.5 text-sm">
            {[
              { k: "Cohort", v: "A – Placebo" },
              { k: "Enrolled", v: "Feb 15, 2024" },
              { k: "Next check-in", v: "Today, 6:00 PM" },
              { k: "Adherence", v: "78%" },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between">
                <dt className="text-muted">{r.k}</dt>
                <dd className="font-medium text-ink">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ---- 7. real-time alerts ---------------------------------------- */

const ALERT_STATS = [
  { label: "Urgent", value: "3", tint: "#fdecec", fg: "#c0392b", icon: "alert" },
  { label: "Needs review", value: "8", tint: "#fff3e0", fg: "#c77700", icon: "eye" },
  { label: "Resolved today", value: "12", tint: "#e8f6f0", fg: "#0f7a52", icon: "shield" },
];

const ALERTS = [
  { sev: "urgent", in: "JC", c: "#6d28d9", who: "Cooper, Jane", what: "Reported pain 9/10 after morning dose", time: "12 min ago", icon: "alert" },
  { sev: "urgent", in: "WW", c: "#0071e3", who: "Warren, Wade", what: "Safety flag: 2 doses logged within 1 hour", time: "40 min ago", icon: "pill" },
  { sev: "review", in: "EH", c: "#17a673", who: "Howard, Esther", what: "Missed evening check-in 3 days in a row", time: "2h ago", icon: "clock" },
  { sev: "review", in: "CW", c: "#e0479e", who: "William, Cameron", what: "Logged a new symptom: dizziness while standing", time: "3h ago", icon: "activity" },
  { sev: "info", in: "BC", c: "#f59e0b", who: "Cooper, Bessie", what: "Completed weekly survey, mood improving", time: "5h ago", icon: "message" },
];

function AlertsScreen() {
  const sevStyle: Record<string, { bar: string; fg: string; bg: string; label: string }> = {
    urgent: { bar: "#dc2626", fg: "#b3261e", bg: "#fdecec", label: "Urgent" },
    review: { bar: "#f59e0b", fg: "#a16207", bg: "#fef8e7", label: "Needs review" },
    info: { bar: "#17a673", fg: "#0f7a52", bg: "#e8f6f0", label: "Info" },
  };
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold text-ink">Real-time alerts</h4>
          <p className="text-xs text-muted">What patients reported, most urgent pulled to the top</p>
        </div>
        <div className="flex gap-2">
          {["All", "Urgent", "Today"].map((f, i) => (
            <span key={f} className="rounded-md border px-3 py-1.5 text-sm" style={i === 0 ? { background: PURPLE, borderColor: PURPLE, color: "#fff" } : { borderColor: "#e5e5e5", color: "#525252" }}>{f}</span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ALERT_STATS.map((s) => (
          <div key={s.label} className={CARD}>
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">{s.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: s.tint, color: s.fg }}>
                <Icon name={s.icon} className="h-[18px] w-[18px]" />
              </span>
            </div>
            <p className="mt-3 text-[26px] font-bold leading-none text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {ALERTS.map((a) => {
          const s = sevStyle[a.sev];
          return (
            <div key={a.who + a.what} className="flex items-center gap-3 overflow-hidden rounded-md bg-white p-3.5 shadow-[0_1px_4px_rgba(130,143,163,0.22)]">
              <span className="h-10 w-1 shrink-0 rounded-full" style={{ background: s.bar }} />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-semibold text-white" style={{ background: a.c }}>{a.in}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {a.who}
                  <span className="rounded-md px-2 py-0.5 text-[0.65rem] font-medium" style={{ color: s.fg, background: s.bg }}>{s.label}</span>
                </p>
                <p className="truncate text-xs text-ink/60">{a.what}</p>
              </div>
              <span className="hidden shrink-0 text-xs text-muted sm:block">{a.time}</span>
              <button className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-white" style={{ background: PURPLE }}>Review</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

