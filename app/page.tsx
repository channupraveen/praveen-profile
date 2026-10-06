import { ArchDiagram } from "@/components/ArchDiagram";
import { HeroChat } from "@/components/HeroChat";
import { ArrowRight, ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Button, Container, Eyebrow, Footer, SectionHeading } from "@/components/ui";
import Image from "next/image";
import type { CSSProperties } from "react";
import profilePhoto from "@/public/img.jpeg";
import {
  buildAreas,
  credibility,
  education,
  experience,
  principles,
  projects,
  site,
  skills,
  technologies,
} from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function AnimatedWords({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`hero-word ${className}`} style={{ "--i": start + i } as CSSProperties}>
          {w}&nbsp;
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const swarm = projects.find((p) => p.slug === "swarmai")!;

  return (
    <>
      <main className="flex-1">
        {/* ───────── Hero ───────── */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-12 sm:min-h-0 sm:pt-44 sm:pb-24">
          <div className="bg-grid bg-grid-animated pointer-events-none absolute inset-0" />
          <div className="hero-glow glow-drift pointer-events-none absolute inset-0" />
          <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
            {/* Name badge — shows a round avatar on phones/tablets */}
            <div
              className="fade-up mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-panel/70 py-1 pr-3 pl-1 text-[11px] text-muted backdrop-blur sm:mb-8 sm:text-xs lg:pl-3"
              style={d(0)}
            >
              <span className="relative shrink-0 lg:hidden">
                <Image
                  src={profilePhoto}
                  alt=""
                  width={56}
                  height={56}
                  className="size-7 rounded-full object-cover object-[48%_15%] ring-1 ring-line-strong"
                />
                <span className="pulse-dot absolute -right-0.5 -bottom-0.5 size-2 rounded-full border border-bg bg-accent" />
              </span>
              <span className="pulse-dot hidden size-1.5 shrink-0 rounded-full bg-accent lg:block" />
              <span className="truncate">Praveen Kumar · Software Engineer · AI Engineer</span>
            </div>

            <h1 className="max-w-4xl text-[2.6rem] leading-[1.04] font-semibold tracking-tight sm:text-6xl">
              <AnimatedWords text="I build software that" />
              <AnimatedWords text="solves real problems." start={4} className="text-muted" />
            </h1>

            <p
              className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:mt-7 sm:text-lg"
              style={d(700)}
            >
              Software Engineer with 3+ years of experience building full-stack applications, AI-powered SaaS products,
              distributed AI systems, and production-oriented backend platforms.
            </p>

            <div
              className="fade-up mt-9 grid grid-cols-2 gap-2.5 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-3"
              style={d(850)}
            >
              <Button href="#work" variant="primary">
                View My Work <ArrowRight />
              </Button>
              <Button href={site.cv} external>
                <DownloadIcon /> Download CV
              </Button>
              <Button href={site.github}>
                <GitHubIcon /> GitHub
              </Button>
              <Button href="#contact" variant="ghost">
                Contact Me <ArrowRight />
              </Button>
            </div>
            </div>

            {/* AI chat — ask anything about Praveen */}
            <HeroChat />
          </Container>

          {/* Tech stack marquee */}
          <div className="fade-up marquee relative mt-14 overflow-hidden sm:mt-20" style={d(1000)}>
            <div className="marquee-track font-mono text-xs text-faint">
              {[...technologies, ...technologies].map((t, i) => (
                <span
                  key={i}
                  aria-hidden={i >= technologies.length}
                  className="mr-3 shrink-0 rounded-full border border-line bg-panel/50 px-3 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Credibility strip ───────── */}
        <div className="border-y border-line">
          <Container className="px-0! sm:px-8!">
            <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
              {credibility.map((c) => (
                <div key={c} className="flex items-center gap-3 bg-bg px-5 py-5 text-sm text-fg/85 sm:px-6">
                  <span className="size-1 shrink-0 rounded-full bg-accent" />
                  {c}
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* ───────── About ───────── */}
        <section id="about" className="py-20 sm:py-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Turning complex problems into practical software.
              </h2>
              <div className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-line-strong bg-panel sm:aspect-[16/10] lg:aspect-[4/5]">
                <Image
                  src={profilePhoto}
                  alt="Praveen Kumar, Software Engineer"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 700px, 100vw"
                  className="object-cover object-[48%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5 text-[17px] leading-relaxed text-muted">
                <p>
                  I&apos;m a software engineer focused on building practical AI-powered products and scalable software
                  systems. My experience spans full-stack development, backend engineering, AI applications, SaaS
                  architecture, and distributed systems.
                </p>
                <p>
                  I&apos;ve worked on products involving multi-tenant architectures, multilingual voice AI, LLM-powered
                  chat and reporting, workflow automation, AI content generation, distributed LLM inference,
                  authentication, OAuth, analytics, and enterprise-style operational systems.
                </p>
                <p>
                  I&apos;m particularly interested in the intersection of{" "}
                  <span className="text-fg">software engineering and AI</span> — building systems where AI is not just a
                  demo, but an actual part of the product.
                </p>
              </div>
              <div className="mt-8 rounded-xl border border-line bg-panel p-5">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-faint">Current focus</p>
                <div className="flex flex-wrap gap-2">
                  {["AI Engineering", "Voice AI", "LLM Applications", "Backend Systems", "SaaS", "Distributed AI"].map((f) => (
                    <span key={f} className="rounded-md bg-panel-2 px-2.5 py-1 text-sm text-fg/90">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ───────── Selected Work ───────── */}
        <section id="work" className="border-t border-line py-20 sm:py-32">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Selected Work"
                title="Selected Work"
                intro="A few projects that represent how I approach software engineering — from production-oriented SaaS platforms to distributed AI infrastructure."
              />
            </Reveal>
            <div className="space-y-5 sm:space-y-6">
              {projects.map((p, i) => (
                <Reveal key={p.slug}>
                  <ProjectCard project={p} index={i} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ───────── What I Build ───────── */}
        <section className="border-t border-line py-20 sm:py-32">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Engineering" title="What I build" />
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {buildAreas.map((a, i) => (
                <Reveal key={a.title} delay={i * 60} className="bg-bg">
                  <div className="group h-full bg-bg p-6 transition-colors duration-300 hover:bg-panel/60 sm:p-9">
                    <p className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-lg font-medium transition-colors group-hover:text-accent">{a.title}</h3>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                      {a.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ───────── Technical Skills ───────── */}
        <section id="skills" className="border-t border-line py-20 sm:py-32">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Skills"
                title="Technical skills"
                intro="Highlighted skills are tagged with the project where I've applied them."
              />
            </Reveal>
            <div className="divide-y divide-line border-y border-line">
              {skills.map((s) => (
                <Reveal key={s.group}>
                  <div className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <p className="font-mono text-xs uppercase tracking-wider text-faint sm:pt-1">{s.group}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((it) => {
                        const name = typeof it === "string" ? it : it.name;
                        const used = typeof it === "string" ? null : it.used;
                        return (
                          <span
                            key={name}
                            className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[13px] text-fg/90 transition-colors hover:border-accent/40 hover:text-accent sm:text-sm ${
                              used ? "border-accent/20 bg-accent/[0.04]" : "border-line bg-panel"
                            }`}
                          >
                            {name}
                            {used && (
                              <span className="rounded bg-bg/70 px-1.5 py-px font-mono text-[10px] text-muted">{used}</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ───────── Philosophy ───────── */}
        <section className="border-t border-line py-20 sm:py-32">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Philosophy" title="How I think about engineering" />
            </Reveal>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="border-l border-line-strong pl-6">
                    <h3 className="text-lg font-medium">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ───────── Experience ───────── */}
        <section id="experience" className="border-t border-line py-20 sm:py-32">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="3+ years building software professionally"
                intro="From full-stack product work to founding and engineering an AI-powered SaaS."
              />
            </Reveal>

            <ol className="relative space-y-6 sm:space-y-8 md:ml-[11.5rem] md:border-l md:border-line md:pl-10">
              {experience.map((job, i) => (
                <li key={job.company} className="relative">
                  <Reveal delay={i * 80}>
                    {/* timeline dot + date (desktop) */}
                    <span
                      className={`absolute top-7 -left-[45px] hidden size-2.5 rounded-full border md:block ${
                        i === 0 ? "pulse-dot border-accent bg-accent" : "border-line-strong bg-bg"
                      }`}
                    />
                    <p className="absolute top-6 -left-[13.5rem] hidden w-40 text-right font-mono text-xs text-muted md:block">
                      {job.period}
                    </p>

                    <article className="rounded-2xl border border-line bg-panel/60 p-5 transition-colors hover:border-line-strong sm:p-7">
                      <p className="mb-2 font-mono text-[11px] text-muted md:hidden">{job.period}</p>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{job.role}</h3>
                        <span className="text-muted">·</span>
                        <span className={i === 0 ? "text-accent" : "text-fg/90"}>{job.company}</span>
                        <span className="text-sm text-faint">{job.place}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted">{job.summary}</p>
                      <ul className="mt-4 space-y-2">
                        {job.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent/70" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.tags.map((t) => (
                          <span key={t} className="rounded-md border border-line bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>

            {/* Education + CV */}
            <Reveal>
              <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 md:ml-[11.5rem]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-faint">Education</p>
                  {education.map((e) => (
                    <p key={e.degree} className="mt-1.5 text-fg/90">
                      {e.degree} <span className="text-muted">· {e.school} · {e.year}</span>
                    </p>
                  ))}
                </div>
                <Button href={site.cv} external>
                  <DownloadIcon /> Download CV
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ───────── Open Source + GitHub ───────── */}
        <section id="github" className="border-t border-line py-20 sm:py-32">
          <Container className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-7 sm:p-9">
                <Eyebrow>Open Source</Eyebrow>
                <h3 className="text-2xl font-semibold tracking-tight">{swarm.name}</h3>
                <p className="mt-2 text-muted">Distributed local LLM inference using multiple Ollama workers.</p>
                <div className="my-8 flex-1">
                  <ArchDiagram layers={["Client", "Coordinator", "Scheduler", ["Ollama", "Ollama", "Ollama"]]} compact />
                </div>
                <div>
                  <Button href={swarm.github ?? site.github}>
                    <GitHubIcon /> View on GitHub
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel/60 p-7 sm:p-9">
                <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
                <div className="relative">
                  <Eyebrow>GitHub</Eyebrow>
                  <h3 className="text-2xl font-semibold tracking-tight">Explore my code</h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    Most of my projects are built as working systems rather than tutorial exercises. Explore the source
                    code, architecture, and implementation details on GitHub.
                  </p>
                </div>
                <div className="relative mt-10 flex flex-col gap-3 rounded-xl border border-line bg-bg/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="truncate font-mono text-sm text-muted">github.com/channupraveen</span>
                  <Button href={site.github} variant="primary">
                    Visit GitHub <ArrowUpRight />
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ───────── Contact ───────── */}
        <section id="contact" className="relative overflow-hidden border-t border-line py-24 sm:py-36">
          <div className="hero-glow glow-drift pointer-events-none absolute inset-0" />
          <Container className="relative text-center">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Let&apos;s build something.
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
                I&apos;m interested in software engineering, AI engineering, SaaS products, and challenging technical
                problems.
              </p>
              <div className="mx-auto mt-10 grid max-w-xs grid-cols-1 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-3">
                {site.email && (
                  <Button href={`mailto:${site.email}`} variant="primary">
                    <MailIcon /> Get In Touch
                  </Button>
                )}
                <Button href={site.linkedin} variant={site.email ? "secondary" : "primary"}>
                  <LinkedInIcon /> LinkedIn
                </Button>
                <Button href={site.github}>
                  <GitHubIcon /> GitHub
                </Button>
                <Button href={site.cv} external>
                  <DownloadIcon /> Download CV
                </Button>
              </div>
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="mt-6 inline-block font-mono text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors select-all hover:text-accent hover:decoration-accent/60"
                >
                  {site.email}
                </a>
              )}
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
