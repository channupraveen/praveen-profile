import Link from "next/link";
import type { Project } from "@/lib/data";
import { ArchDiagram } from "./ArchDiagram";
import { Benchmark } from "./Benchmark";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "./Icons";
import { Spotlight } from "./Spotlight";
import { Badge, Button } from "./ui";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const p = project;
  const caseHref = `/work/${p.slug}`;

  return (
    <Spotlight className="rounded-2xl">
      <article className="group overflow-hidden rounded-2xl border border-line bg-panel/60 transition-[border-color,transform] duration-300 hover:border-line-strong md:hover:-translate-y-0.5">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          {/* Text */}
          <div className="flex flex-col p-5 sm:p-9">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-wider text-faint sm:mb-5 sm:text-[11px]">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-6 shrink-0 bg-line-strong transition-all duration-500 group-hover:w-10 group-hover:bg-accent/60" />
              <span className="text-muted">{p.tagline}</span>
            </div>

            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <Link href={caseHref} className="transition-colors hover:text-accent">
                {p.name}
              </Link>
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted text-pretty">{p.description}</p>

            {p.aiFeatures && (
              <div className="mt-6 rounded-xl border border-accent/25 bg-accent/[0.04] p-4">
                <p className="mb-3 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-accent">
                  <span className="pulse-dot size-1.5 rounded-full bg-accent" />
                  AI features
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.aiFeatures.map((f) => (
                    <span key={f.title} className="rounded-md border border-accent/20 bg-bg/60 px-2 py-1 text-xs text-fg/90">
                      {f.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {p.highlights.slice(0, 8).map((h, i) => (
                <li key={h} className={`flex gap-2.5 text-fg/85 ${i >= 5 ? "hidden sm:flex" : ""}`}>
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2 pt-7 sm:flex sm:flex-wrap sm:items-center sm:pt-8">
              {p.primaryCta === "demo" && p.demo && (
                <Button href={p.demo} variant="primary">
                  Live Demo <ArrowUpRight />
                </Button>
              )}
              {p.primaryCta === "architecture" ? (
                <Button href={`${caseHref}#architecture`} variant="primary">
                  Architecture <ArrowRight />
                </Button>
              ) : (
                <Button href={caseHref} variant={p.primaryCta === "demo" && p.demo ? "secondary" : "primary"}>
                  Case Study <ArrowRight />
                </Button>
              )}
              {p.github && (
                <Button href={p.github} variant="secondary">
                  <GitHubIcon /> GitHub
                </Button>
              )}
              {p.primaryCta !== "demo" && p.demo && (
                <Button href={p.demo} variant="secondary">
                  Website <ArrowUpRight />
                </Button>
              )}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex flex-col justify-center gap-6 border-t border-line bg-bg/40 px-4 py-7 sm:p-9 lg:border-t-0 lg:border-l">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Architecture</p>
              <ArchDiagram layers={p.architecture} compact />
            </div>
            {p.benchmark && (
              <div className="relative">
                <Benchmark data={p.benchmark} />
              </div>
            )}
          </div>
        </div>
      </article>
    </Spotlight>
  );
}
