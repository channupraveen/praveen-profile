import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArchDiagram } from "@/components/ArchDiagram";
import { Benchmark } from "@/components/Benchmark";
import { Button, Container, Footer } from "@/components/ui";
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
  return { title: `${p.name}, ${p.tagline}`, description: p.description };
}

function Block({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="grid gap-4 border-t border-line py-12 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const prose = "max-w-[42rem] text-[17px] leading-relaxed text-fg/85";

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <main className="flex-1">
        <header className="pt-28 pb-14 sm:pt-36">
          <Container>
            <Link href="/#work" className="link text-[15px] text-muted">
              Back to all work
            </Link>
            <p className="mt-10 text-[15px] text-muted">{p.tagline}</p>
            <h1 className="mt-2 text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] sm:text-[4.25rem]">{p.name}</h1>
            <p className="mt-6 max-w-[40rem] text-lg leading-relaxed text-muted">{p.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.demo && (
                <Button href={p.demo} variant="primary">
                  {p.primaryCta === "demo" ? "Try the live demo" : "Visit the website"}
                </Button>
              )}
              {p.github && (
                <Button href={p.github} variant={p.demo ? "secondary" : "primary"}>
                  Source on GitHub
                </Button>
              )}
            </div>
            <p className="mt-8 max-w-[42rem] text-[15px] text-muted">
              <span className="text-fg">Built with</span> {p.tech.join(", ")}.
            </p>
          </Container>
        </header>

        <Container className="pb-16">
          {p.problem && (
            <Block title="The problem">
              <p className={prose}>{p.problem}</p>
            </Block>
          )}
          {p.why && (
            <Block title="Why I built it">
              <p className={prose}>{p.why}</p>
            </Block>
          )}
          {p.solution && (
            <Block title="What I built">
              <p className={prose}>{p.solution}</p>
            </Block>
          )}

          {p.aiFeatures && (
            <Block id="ai" title="What the AI does">
              <dl className="grid max-w-[52rem] gap-x-10 gap-y-7 sm:grid-cols-2">
                {p.aiFeatures.map((f) => (
                  <div key={f.title} className="border-t-2 border-accent pt-3">
                    <dt className="font-medium">{f.title}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          <Block id="architecture" title="How it's put together">
            <div className={`grid gap-4 ${p.secondaryArchitecture ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" : ""}`}>
              <div className="rounded-2xl border border-line bg-panel px-4 py-8">
                <ArchDiagram layers={p.architecture} />
              </div>
              {p.secondaryArchitecture && (
                <div className="flex flex-col justify-center rounded-2xl border border-line bg-panel px-4 py-8">
                  <p className="mb-5 text-center text-sm text-muted">{p.secondaryArchitecture.label}</p>
                  <ArchDiagram layers={p.secondaryArchitecture.layers} />
                </div>
              )}
            </div>
          </Block>

          {p.decisions && (
            <Block title="Decisions I made">
              <dl className="max-w-[44rem] space-y-6">
                {p.decisions.map((d) => (
                  <div key={d.title}>
                    <dt className="font-medium">{d.title}</dt>
                    <dd className="mt-1.5 text-[16px] leading-relaxed text-muted">{d.body}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {p.challenges && (
            <Block title="What was hard">
              <dl className="max-w-[44rem] space-y-6">
                {p.challenges.map((c) => (
                  <div key={c.title}>
                    <dt className="font-medium">{c.title}</dt>
                    <dd className="mt-1.5 text-[16px] leading-relaxed text-muted">{c.body}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          <Block title="What's in it">
            <ul className="grid max-w-[52rem] list-disc gap-x-10 gap-y-2 pl-5 text-[16px] text-fg/85 marker:text-line-strong sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Block>

          {p.screenshots && p.screenshots.length > 0 && (
            <Block title="Screenshots">
              <div className="grid gap-4">
                {p.screenshots.map((s) => (
                  <div key={s.src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-panel">
                    <Image src={s.src} alt={s.alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 800px, 100vw" />
                  </div>
                ))}
              </div>
            </Block>
          )}

          {p.benchmark && (
            <Block title="Results">
              <div className="max-w-xl">
                <Benchmark data={p.benchmark} />
              </div>
            </Block>
          )}

          <Block title="What I learned">
            {p.learned && (
              <ul className="max-w-[44rem] list-disc space-y-2 pl-5 text-[16px] text-fg/85 marker:text-line-strong">
                {p.learned.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
            <p className="mt-6 max-w-[42rem] font-display text-xl leading-snug font-semibold">{p.takeaway}</p>
          </Block>

          <Link href={`/work/${next.slug}`} className="group mt-6 block border-t border-line pt-10">
            <p className="text-[15px] text-muted">Next project</p>
            <p className="mt-2 text-[2rem] leading-tight font-bold tracking-[-0.03em] transition-colors group-hover:text-accent sm:text-[2.6rem]">
              {next.name}
            </p>
            <p className="mt-1 text-[15px] text-muted">{next.tagline}</p>
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
