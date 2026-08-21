import type { Challenge } from "@/lib/projects";
import { Icon } from "@/components/icons";

/**
 * The clinical challenge, split the way the two users actually live it:
 * what patients experience, what clinicians face, and the goals the design
 * had to hit for both. Icon-bulleted so a reader scans it in seconds instead
 * of parsing prose.
 */
export function ClinicalChallenge({ data }: { data: Challenge }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Column
          label="Patients experience"
          headIcon="heart"
          items={data.patients}
          tint="#0071e3"
        />
        <Column
          label="Clinicians face"
          headIcon="users"
          items={data.clinicians}
          tint="#0071e3"
        />
      </div>

      {data.goals && data.goals.length > 0 && (
        <div className="rounded-2xl bg-ink p-8 text-white">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
            The design challenge
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {data.goals.map((g) => (
              <div key={g.text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10 text-white">
                  <Icon name={g.icon} className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <p className="text-sm font-medium leading-snug">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Column({
  label,
  headIcon,
  items,
  tint,
}: {
  label: string;
  headIcon: string;
  items: { icon: string; text: string }[];
  tint: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
          style={{ color: tint, background: "rgba(0,113,227,0.08)" }}
        >
          <Icon name={headIcon} className="h-[1.15rem] w-[1.15rem]" />
        </span>
        <p className="font-display text-lg text-ink">{label}</p>
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((it) => (
          <li key={it.text} className="flex items-center gap-3">
            <span className="flex-none" style={{ color: tint }}>
              <Icon name={it.icon} className="h-[1.1rem] w-[1.1rem]" />
            </span>
            <span className="text-sm text-ink/80">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
