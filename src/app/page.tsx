import { projects } from "@/lib/projects";
import { Hero } from "@/components/hero";
import { ProjectCards } from "@/components/project-cards";

export default function Home() {
  return (
    <>
      <Hero />

      {/* WORK INDEX ----------------------------------------- */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 pt-2 sm:px-8 sm:pb-28 sm:pt-3">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Selected work
          </h2>
          <span className="font-mono text-xs text-muted">
            [ {String(projects.length).padStart(2, "0")} ]
          </span>
        </div>
        <ProjectCards projects={projects} />
      </section>
    </>
  );
}
