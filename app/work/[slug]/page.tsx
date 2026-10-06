import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArchDiagram } from "@/components/ArchDiagram";
import { Benchmark } from "@/components/Benchmark";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { Badge, Button, Container, Eyebrow, Footer } from "@/components/ui";
import { projects } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.tagline}`, description: p.description };
}

function Block({ id, n, title, children }: { id?: string; n: number; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="grid gap-4 border-t border-line py-12 md:grid-cols-[220px_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:block">
          <p className="font-mono text-[11px] text-faint">{String(n).padStart(2, "0")}</p>
          <h2 className="text-lg font-medium md:mt-2">{title}</h2>
        </div>
        <div className="min-w-0">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const order = [
    p.problem && "Problem",
    p.why && "Why",
    p.solution && "Solution",
    p.aiFeatures && "AI",
    "Architecture",
    p.decisions && "Decisions",
    p.challenges && "Challenges",
    "Implementation",
    p.screenshots?.length && "Screenshots",
    p.benchmark && "Results",
    "Technology",
    "Learned",
  ].filter(Boolean);
  const num = (key: string) => order.indexOf(key) + 1;

  return (
    <>
      <main className="flex-1">
        {/* Header */}
        <header className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className="hero-glow pointer-events-none absolute inset-0" />
          <Container className="relative">
            <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
              <ArrowLeft /> All work
            </Link>
            <Reveal className="mt-10">
              <Eyebrow>Case Study · {p.tagline}</Eyebrow>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{p.name}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{p.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {p.demo && (
                  <Button href={p.demo} variant="primary">
                    {p.primaryCta === "demo" ? "Live Demo" : "Website"} <ArrowUpRight />
                  </Button>
                )}
                {p.github && (
                  <Button href={p.github} variant={p.demo ? "secondary" : "primary"}>
                    <GitHubIcon /> GitHub
                  </Button>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Reveal>
          </Container>
        </header>

        <Container className="pb-16">
          {p.problem && (
            <Block n={num("Problem")} title="Problem">
              <p className="max-w-2xl text-[17px] leading-relaxed text-muted">{p.problem}</p>
            </Block>
          )}

          {p.why && (
            <Block n={num("Why")} title="Why I built it">
              <p className="max-w-2xl text-[17px] leading-relaxed text-muted">{p.why}</p>
            </Block>
          )}

          {p.solution && (
            <Block n={num("Solution")} title="Solution">
              <p className="max-w-2xl text-[17px] leading-relaxed text-muted">{p.solution}</p>
            </Block>
          )}

          {p.aiFeatures && (
            <Block id="ai" n={num("AI")} title="AI features">
              <div className="grid gap-4 sm:grid-cols-2">
                {p.aiFeatures.map((f, i) => (
                  <div
                    key={f.title}
                    className="group relative overflow-hidden rounded-xl border border-accent/20 bg-accent/[0.03] p-5 transition-colors hover:border-accent/40"
                  >
                    <p className="font-mono text-[10.5px] text-accent/80">AI.{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-medium">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          <Block id="architecture" n={num("Architecture")} title="Architecture">
            <div className={`grid gap-4 ${p.secondaryArchitecture ? "lg:grid-cols-[1.4fr_1fr]" : ""}`}>
              <div className="relative overflow-hidden rounded-xl border border-line bg-panel/60 px-4 py-10">
                <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
                <div className="relative">
                  <ArchDiagram layers={p.architecture} />
                </div>
              </div>
              {p.secondaryArchitecture && (
                <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-line bg-panel/60 px-4 py-10">
                  <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    {p.secondaryArchitecture.label}
                  </p>
                  <ArchDiagram layers={p.secondaryArchitecture.layers} />
                </div>
              )}
            </div>
          </Block>

          {p.decisions && (
            <Block n={num("Decisions")} title="Key technical decisions">
              <div className="grid gap-4 sm:grid-cols-2">
                {p.decisions.map((d) => (
                  <div key={d.title} className="rounded-xl border border-line bg-panel/60 p-5">
                    <h3 className="font-medium">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {p.challenges && (
            <Block n={num("Challenges")} title="Challenges">
              <div className="space-y-6">
                {p.challenges.map((c) => (
                  <div key={c.title} className="border-l border-line-strong pl-5">
                    <h3 className="font-medium">{c.title}</h3>
                    <p className="mt-1.5 max-w-2xl leading-relaxed text-muted">{c.body}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          <Block n={num("Implementation")} title="Implementation">
            <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-fg/85">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent/70" />
                  {h}
                </li>
              ))}
            </ul>
          </Block>

          {p.screenshots && p.screenshots.length > 0 && (
            <Block n={num("Screenshots")} title="Screenshots">
              <div className="grid gap-4">
                {p.screenshots.map((s) => (
                  <div key={s.src} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-panel">
                    <Image src={s.src} alt={s.alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 800px, 100vw" />
                  </div>
                ))}
              </div>
            </Block>
          )}

          {p.benchmark && (
            <Block n={num("Results")} title="Results">
              <div className="max-w-xl">
                <Benchmark data={p.benchmark} />
              </div>
            </Block>
          )}

          <Block n={num("Technology")} title="Technology">
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-md border border-line bg-panel px-2.5 py-1 text-sm text-fg/90">
                  {t}
                </span>
              ))}
            </div>
          </Block>

          <Block n={num("Learned")} title="What I learned">
            {p.learned && (
              <ul className="mb-6 space-y-2.5">
                {p.learned.map((l) => (
                  <li key={l} className="flex gap-3 text-fg/85">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent/70" />
                    {l}
                  </li>
                ))}
              </ul>
            )}
            <blockquote className="max-w-2xl border-l-2 border-accent/60 pl-5 text-[17px] leading-relaxed text-fg/90">
              {p.takeaway}
            </blockquote>
          </Block>

          {/* Next project */}
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-8 flex items-center justify-between gap-6 rounded-2xl border border-line bg-panel/60 p-7 transition-colors hover:border-line-strong sm:p-9"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-faint">Next project</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{next.name}</p>
                <p className="mt-1 text-sm text-muted">{next.tagline}</p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-fg" />
            </Link>
          </Reveal>
        </Container>
      </main>
      <Footer />
    </>
  );
}
