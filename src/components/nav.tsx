import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-ink"
          aria-label={`${site.name}, home`}
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-draw hidden text-ink/80 hover:text-ink sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-ink"
          >
            Let&rsquo;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
