import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Let's work together, ${site.name}`,
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Contact
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-display text-ink">
        Have a hard problem that needs{" "}
        <span className="text-accent">good design</span>?
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
        I&rsquo;m open to senior roles, contracts, and collaborations. The best
        way to start is an email with two lines about the problem.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-accent px-6 py-4 text-base font-medium text-white transition-colors hover:bg-accent-ink"
        >
          {site.email}
        </a>
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="link-draw text-base text-ink hover:text-accent"
          >
            {s.label} ↗
          </a>
        ))}
      </div>

      <a
        href={site.cvHref}
        download
        className="mt-6 inline-flex items-center gap-2 text-base text-ink/80 hover:text-accent"
      >
        Download CV ↓
      </a>
    </div>
  );
}
