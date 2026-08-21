import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/lib/projects";
import type { BlockKey, Project } from "@/lib/projects";
import { CompetitionTable } from "@/components/competition-table";
import { PillarsGrid } from "@/components/pillars-grid";
import { ImpactStats } from "@/components/impact-stats";
import { AppStoreReviews } from "@/components/app-store-reviews";
import { Reveal } from "@/components/reveal";
import { ScreenGallery } from "@/components/screen-gallery";
import { PhoneMockup } from "@/components/phone-mockup";
import { PainpalApp } from "@/components/painpal-app";
import { ClinicalDashboard } from "@/components/clinical-dashboard";
import { AIBuildsHub } from "@/components/ai-builds-hub";
import { DSAgentDashboard } from "@/components/ds-agent-dashboard";
import { DonationPrototype } from "@/components/donation-prototype";
import { BeforeFlow } from "@/components/before-flow";
import { AtAGlance } from "@/components/at-a-glance";
import { Rich } from "@/components/rich-text";
import { PersonaCards } from "@/components/persona-cards";
import { FeatureList } from "@/components/feature-list";
import { ProductSplit } from "@/components/product-split";
import { DesignTone } from "@/components/design-tone";
import { ClinicalChallenge } from "@/components/clinical-challenge";
import { StatCards } from "@/components/stat-cards";
import { FlowDiagram } from "@/components/flow-diagram";
import {
  FindingCards,
  PrincipleCards,
  DecisionCards,
} from "@/components/case-study-blocks";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

const accentText: Record<string, string> = {
  violet: "text-accent",
  lime: "text-accent",
  ink: "text-accent",
};

// Semantic metric colors (green = a win) used by the metrics banner.
const METRIC_COLOR: Record<string, string> = {
  green: "#17a673",
  accent: "#0071e3",
  pink: "#e0479e",
  ink: "#1d1d1f",
};

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [
    { label: "Role", value: project.role },
    { label: "Company", value: project.company },
    { label: "Team", value: project.team },
    { label: "Timeline", value: project.timeline },
  ];

  return (
    <article>
      {/* HEADER -------------------------------------------- */}
      <header className="mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <Link
          href="/#work"
          className="link-draw text-sm text-muted hover:text-ink"
        >
          ← Back to work
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-6 font-display text-display text-ink">
          {project.title}
        </h1>
        <p className={`mt-4 text-xl ${accentText[project.accent]}`}>
          {project.subtitle}
        </p>

        {/* meta grid */}
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                {m.label}
              </dt>
              <dd className="mt-1 text-sm text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* role focus */}
        {project.roleFocus && (
          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              My role focused on
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.roleFocus.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/80"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* at a glance, the 5-second TL;DR */}
        {project.atAGlance && (
          <div className="mt-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              At a glance
            </p>
            <AtAGlance
              data={project.atAGlance}
              variant={project.atAGlanceVariant}
            />
          </div>
        )}

        {/* dual-product orientation cards */}
        {project.products && (
          <div className="mt-6">
            <ProductSplit products={project.products} />
          </div>
        )}
      </header>

      {/* METRICS BANNER ------------------------------------- */}
      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          {project.statHighlights ? (
            <StatCards items={project.statHighlights} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-line bg-white p-6"
                >
                  <p
                    className="font-mono text-5xl font-semibold leading-none sm:text-6xl"
                    style={{ color: METRIC_COLOR[m.accent ?? "accent"] }}
                  >
                    {m.value}
                  </p>
                  <p className="mt-3 text-sm font-medium text-ink">{m.label}</p>
                  {m.note && <p className="mt-1 text-xs text-muted">{m.note}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTIONS ------------------------------------------ */}
      <div className="mx-auto max-w-6xl space-y-20 px-5 py-16 sm:space-y-28 sm:px-8 sm:py-24">
        {project.sections.map((s, i) => (
          <Reveal key={i} className="scroll-mt-24">
            {/* stacked: kicker, title, then prose beneath */}
            <p className="font-mono text-base font-bold uppercase tracking-[0.14em] text-accent">
              {s.kicker}
            </p>
            <h2
              className="mt-2 font-display text-[1.25rem] leading-snug tracking-tight text-ink"
              style={{ fontWeight: 600 }}
            >
              {s.title}
            </h2>
            {s.body.length > 0 && (
              <div className="mt-5 space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="text-lg leading-relaxed text-ink/80">
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            )}

            {s.after && (
              <div className="mt-8">{renderBlock(s.after, project)}</div>
            )}
          </Reveal>
        ))}

        {/* Galleries, real phone showcases and/or reserved placeholders */}
        {(project.galleryGroups ?? []).map((group) => (
          <Reveal key={group.label}>
            {group.shots ? (
              // Full-width phone showcase
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {group.label}
                </p>
                {group.note && (
                  <p className="mt-2 max-w-xl text-sm text-muted">{group.note}</p>
                )}

                {/* design constraints + anti-patterns */}
                {(group.builtAround || group.avoided) && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-12 sm:gap-8">
                    {group.builtAround && (
                      <div className="sm:col-span-8">
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                          Built around
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {group.builtAround.map((b) => (
                            <span
                              key={b}
                              className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/80"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {group.avoided && (
                      <div className="sm:col-span-4">
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                          What we avoided
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {group.avoided.map((a) => (
                            <li
                              key={a}
                              className="flex items-start gap-2 text-sm text-ink/70"
                            >
                              <span className="mt-0.5 text-[#dc2626]">✕</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8">
                  {group.display === "phone" ? (
                    <PhoneMockup shots={group.shots} />
                  ) : (
                    <ScreenGallery shots={group.shots} />
                  )}
                </div>
              </div>
            ) : (
              // Reserved placeholder group
              <div className="grid gap-6 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {group.label}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Reserved space, images coming soon.
                  </p>
                </div>
                <div className="grid gap-4 sm:col-span-8 sm:grid-cols-2">
                  {Array.from({ length: group.count ?? 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-line bg-paper-2 text-center text-sm text-muted"
                    >
                      {group.label}
                      <br />
                      /public/work/{project.slug}/
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        ))}

        {/* Reflection, the closing note, always last */}
        {project.reflection && (
          <Reveal>
            <p className="font-mono text-base font-bold uppercase tracking-[0.14em] text-accent">
              Reflection
            </p>
            <h2
              className="mt-2 font-display text-[1.25rem] leading-snug tracking-tight text-ink"
              style={{ fontWeight: 600 }}
            >
              {project.reflection.title}
            </h2>
            <div className="mt-5 space-y-4">
              {project.reflection.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink/80">
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* NEXT PROJECT -------------------------------------- */}
      <NextProject slug={project.slug} />
    </article>
  );
}

function renderBlock(key: BlockKey, project: Project) {
  switch (key) {
    case "contextStats":
      return project.contextStats ? (
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Why it matters
          </p>
          <ImpactStats
            stats={project.contextStats}
            variant={project.contextStatsAsCards ? "card" : "border"}
          />
        </div>
      ) : null;
    case "findings":
      return project.findings ? (
        <FindingCards
          findings={project.findings}
          variant={project.findingsVariant}
        />
      ) : null;
    case "competition":
      return project.competition ? (
        <CompetitionTable {...project.competition} />
      ) : null;
    case "principles":
      return project.principles ? (
        <PrincipleCards
          principles={project.principles}
          variant={project.principlesVariant}
          projectName={project.title}
        />
      ) : null;
    case "decisions":
      return project.decisions ? (
        <DecisionCards
          decisions={project.decisions}
          variant={project.decisionsVariant}
        />
      ) : null;
    case "pillars":
      return project.pillars ? <PillarsGrid pillars={project.pillars} /> : null;
    case "impactStats":
      return project.impactStats ? (
        <ImpactStats stats={project.impactStats} />
      ) : null;
    case "reviews":
      return project.reviews ? (
        <AppStoreReviews reviews={project.reviews} />
      ) : null;
    case "before":
      return <BeforeFlow />;
    case "personas":
      return project.personas ? (
        <PersonaCards
          personas={project.personas}
          variant={project.personasVariant}
        />
      ) : null;
    case "appFeatures":
      return project.appFeatures ? (
        <div className="space-y-12">
          <PainpalApp />
          <FeatureList features={project.appFeatures} badge="HIPAA compliant" />
        </div>
      ) : null;
    case "desktopFeatures":
      return project.desktopFeatures ? (
        <FeatureList features={project.desktopFeatures} badge="HIPAA compliant" />
      ) : null;
    case "dashboard":
      return (
        <div className="space-y-10">
          <ClinicalDashboard />
          {project.desktopFeatures && (
            <FeatureList
              features={project.desktopFeatures}
              badge="HIPAA compliant"
            />
          )}
        </div>
      );
    case "ethics":
      return project.ethics ? <FeatureList features={project.ethics} /> : null;
    case "designTone":
      return project.designTone ? (
        <DesignTone data={project.designTone} />
      ) : null;
    case "challenge":
      return project.challenge ? (
        <ClinicalChallenge data={project.challenge} />
      ) : null;
    case "statCards":
      return project.resultStats ? (
        <StatCards items={project.resultStats} />
      ) : null;
    case "flow":
      return <FlowDiagram />;
    case "prototype":
      return <DonationPrototype />;
    case "aiBuildsHub":
      return (
        <div className="space-y-12">
          <AIBuildsHub />
          {project.appFeatures && <FeatureList features={project.appFeatures} />}
        </div>
      );
    case "dsAgentDashboard":
      return (
        <div className="space-y-10">
          <DSAgentDashboard />
          {project.desktopFeatures && (
            <FeatureList features={project.desktopFeatures} />
          )}
        </div>
      );
    default:
      return null;
  }
}

function NextProject({ slug }: { slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  if (!next || next.slug === slug) return null;
  return (
    <Link
      href={`/work/${next.slug}`}
      className="group block border-t border-line bg-paper-2"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-12 sm:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Next project
          </p>
          <p className="mt-2 font-display text-title text-ink transition-transform group-hover:translate-x-1">
            {next.title}
          </p>
        </div>
        <span className="text-3xl text-ink transition-transform group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </div>
    </Link>
  );
}
