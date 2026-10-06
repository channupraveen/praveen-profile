import Link from "next/link";
import type { Project } from "@/lib/data";
import { ArchDiagram } from "./ArchDiagram";
import { Benchmark } from "./Benchmark";

/** One project, laid out as a row: story on the left, how it's built on the right. */
export function ProjectCard({ project: p }: { project: Project; index?: number }) {
  const caseHref = `/work/${p.slug}`;

  return (
    <article className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:py-16">
      <div className="min-w-0">
        <p className="text-[15px] text-muted">{p.tagline}</p>
        <h3 className="mt-2 text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]">
          <Link href={caseHref} className="transition-colors hover:text-accent">
            {p.name}
          </Link>
        </h3>
        <p className="mt-4 max-w-[36rem] text-[17px] leading-relaxed text-fg/85">{p.description}</p>

        {p.aiFeatures && (
          <div className="mt-6 max-w-[36rem] rounded-2xl bg-accent/[0.06] p-5">
            <p className="font-medium text-accent">What the AI does</p>
            <ul className="mt-2.5 list-disc space-y-1 pl-5 text-[15px] text-fg/85 marker:text-accent/50">
              {p.aiFeatures.map((f) => (
                <li key={f.title}>{f.title}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 max-w-[36rem] text-[15px] leading-relaxed text-muted">
          <span className="text-fg">Built with</span> {p.tech.join(", ")}.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
          <Link href={p.primaryCta === "architecture" ? `${caseHref}#architecture` : caseHref} className="link">
            {p.primaryCta === "architecture" ? "Read how it works" : "Read the case study"}
          </Link>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="link">
              {p.primaryCta === "demo" ? "Try the live demo" : "Visit the website"}
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="link">
              Source on GitHub
            </a>
          )}
        </div>
      </div>

      <div className="min-w-0 space-y-5 self-center">
        <div className="rounded-2xl border border-line bg-panel px-4 py-7 sm:px-6">
          <p className="mb-5 text-center text-sm text-muted">How it&apos;s put together</p>
          <ArchDiagram layers={p.architecture} compact />
        </div>
        {p.benchmark && <Benchmark data={p.benchmark} />}
      </div>
    </article>
  );
}
