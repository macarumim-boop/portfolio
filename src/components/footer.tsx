import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact-footer" className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Have a hard problem?
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 block font-display text-title leading-none text-ink hover:text-accent"
        >
          {site.email}
        </a>

        <div className="mt-12 flex flex-col justify-between gap-8 border-t border-line pt-8 sm:flex-row sm:items-end">
          <div className="flex flex-wrap gap-6">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <p className="text-xs text-muted">
            © {site.name} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
