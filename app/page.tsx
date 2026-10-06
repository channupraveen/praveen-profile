import Image from "next/image";
import type { CSSProperties } from "react";
import { HeroChat } from "@/components/HeroChat";
import { ProjectCard } from "@/components/ProjectCard";
import { VoiceLine } from "@/components/VoiceLine";
import { Button, Container, Footer, SectionHeading } from "@/components/ui";
import { education, experience, principles, projects, recruiter, site, skills } from "@/lib/data";
import profilePhoto from "@/public/img.jpeg";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Home() {
  return (
    <>
      <main className="flex-1">
        {/* ───────── Hero ───────── */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-24">
          <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <div className="fade-up flex items-center gap-4" style={d(0)}>
                <Image
                  src={profilePhoto}
                  alt=""
                  width={112}
                  height={112}
                  placeholder="blur"
                  className="size-14 rounded-full object-cover object-[48%_15%]"
                />
                <div>
                  <p className="font-display text-xl font-bold tracking-tight">{site.name}</p>
                  <p className="text-[15px] text-accent">
                    {recruiter.title}, {recruiter.years}
                  </p>
                </div>
              </div>
              <h1
                className="fade-up mt-8 text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-[4.25rem]"
                style={d(80)}
              >
                I build software people can talk to.
              </h1>
              <p className="fade-up mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted sm:text-lg" style={d(180)}>
                I build production SaaS end to end with Python, FastAPI, PostgreSQL and Angular, and I add AI where it
                does real work: LLM assistants, voice in four languages and structured outputs that drive actions.
              </p>

              <div className="fade-up mt-9" style={d(300)}>
                <VoiceLine />
              </div>

              <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={d(420)}>
                <Button href="#work" variant="primary">
                  See my work
                </Button>
                <Button href={site.cv} external>
                  Download CV
                </Button>
                <Button href={site.github} variant="ghost">
                  GitHub
                </Button>
              </div>
            </div>

            <div className="min-w-0 lg:pt-2">
              <HeroChat />
            </div>
          </Container>
        </section>

        {/* ───────── At a glance (for recruiters) ───────── */}
        <section aria-labelledby="glance" className="border-t border-line bg-panel py-14 sm:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="glance" className="text-2xl font-bold tracking-tight sm:text-3xl">
                At a glance
              </h2>
              <p className="text-[15px] text-muted">
                For recruiters: the short version.{" "}
                <a href={site.cv} target="_blank" rel="noreferrer" className="link font-medium text-fg">
                  Full CV (PDF)
                </a>
              </p>
            </div>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {[
                { k: "Role", v: recruiter.title },
                { k: "Experience", v: `${recruiter.years} across ${experience.length} companies` },
                { k: "Based in", v: recruiter.location },
                { k: "Core stack", v: recruiter.coreStack.join(", ") },
                { k: "AI", v: recruiter.aiStack.join(", ") },
                { k: "Looking for", v: recruiter.lookingFor },
                { k: "Work rights", v: recruiter.workRights },
                { k: "Notice period", v: recruiter.notice },
                { k: "Contact", v: site.email, href: `mailto:${site.email}` },
              ]
                .filter((row) => row.v)
                .map((row) => (
                  <div key={row.k} className="bg-bg p-5">
                    <dt className="text-sm text-muted">{row.k}</dt>
                    <dd className="mt-1 text-[16px] leading-snug font-medium">
                      {row.href ? (
                        <a href={row.href} className="link break-all">
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
            </dl>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {recruiter.proof.map((p) => (
                <li key={p.label}>
                  <p className="font-display text-[2.75rem] leading-none font-bold tracking-[-0.03em] text-accent">{p.value}</p>
                  <p className="mt-2 max-w-[16rem] text-[15px] leading-snug text-muted">{p.label}</p>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-[15px] text-muted">
              Worked at{" "}
              {experience.map((j, i) => (
                <span key={j.company}>
                  <span className="font-medium text-fg">{j.company}</span>
                  {i < experience.length - 2 ? ", " : i === experience.length - 2 ? " and " : "."}
                </span>
              ))}
            </p>
          </Container>
        </section>

        {/* ───────── Work ───────── */}
        <section id="work" className="border-t border-line py-20 sm:py-28">
          <Container>
            <SectionHeading
              title="Selected work"
              intro="Four projects, from a SaaS product hospitals can use by voice to an experiment in running language models across several machines."
            />
            <div className="divide-y divide-line border-y border-line">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>

        {/* ───────── About ───────── */}
        <section id="about" className="border-t border-line py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-[28px] bg-panel-2">
              <Image
                src={profilePhoto}
                alt="Praveen Kumar"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-[48%_20%]"
              />
            </div>
            <div className="min-w-0">
              <SectionHeading title="A bit about me" />
              <div className="max-w-[36rem] space-y-5 text-[17px] leading-relaxed text-muted">
                <p>
                  I started out building REST APIs and Angular screens for business software. Since then I&apos;ve moved
                  closer to the parts that are hard to get right: multi-tenant data, permissions, and making AI behave
                  reliably inside a real product.
                </p>
                <p>
                  The work I&apos;m proudest of is AIOpsCare. Hospital staff can report a problem by speaking in their own
                  language, and the system turns it into a ticket. Making that reliable on Android phones, and making
                  Telugu, Hindi and Tamil sound right in speech, meant solving problems no tutorial covers.
                </p>
              </div>

              <h3 className="mt-12 text-xl font-semibold tracking-tight">How I work</h3>
              <dl className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {principles.map((p) => (
                  <div key={p.title}>
                    <dt className="font-medium text-fg">{p.title}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        {/* ───────── Experience ───────── */}
        <section id="experience" className="border-t border-line py-20 sm:py-28">
          <Container>
            <SectionHeading title="Where I've worked" />
            <ol className="border-t border-line">
              {experience.map((job) => (
                <li key={job.company} className="grid gap-3 border-b border-line py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
                  <p className="text-[15px] text-muted md:pt-1">{job.period}</p>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {job.role}, <span className="text-accent">{job.company}</span>
                    </h3>
                    <p className="mt-1 text-[15px] text-muted">{job.summary}</p>
                    <ul className="mt-4 max-w-[44rem] list-disc space-y-1.5 pl-5 text-[16px] leading-relaxed text-fg/85 marker:text-line-strong">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-faint">{job.tags.join(", ")}</p>
                  </div>
                </li>
              ))}
              <li className="grid gap-3 py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
                <p className="text-[15px] text-muted">{education[0].year}</p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{education[0].degree}</h3>
                  <p className="mt-1 text-[15px] text-muted">{education[0].school}</p>
                </div>
              </li>
            </ol>
          </Container>
        </section>

        {/* ───────── Skills ───────── */}
        <section id="skills" className="border-t border-line py-20 sm:py-28">
          <Container>
            <SectionHeading
              title="What I work with"
              intro="Where a skill is followed by a project name, you can see it in use in that project above."
            />
            <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="border-b border-line pb-2 font-display text-lg font-semibold">{s.group}</dt>
                  <dd className="mt-3">
                    <ul className="space-y-1.5 text-[15px]">
                      {s.items.map((it) => {
                        const name = typeof it === "string" ? it : it.name;
                        const used = typeof it === "string" ? null : it.used;
                        return (
                          <li key={name} className="text-fg/90">
                            {name}
                            {used && <span className="text-faint"> ({used})</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* ───────── Contact ───────── */}
        <section id="contact" className="border-t border-line py-24 sm:py-32">
          <Container>
            <h2 className="max-w-3xl text-[2.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[3.5rem]">
              I&apos;m open to software and AI engineering roles.
            </h2>
            <p className="mt-6 text-[17px] text-muted">The quickest way to reach me is email.</p>
            <a
              href={`mailto:${site.email}`}
              className="link mt-3 inline-block font-display text-2xl font-semibold break-all sm:text-4xl"
            >
              {site.email}
            </a>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={site.linkedin}>LinkedIn</Button>
              <Button href={site.github}>GitHub</Button>
              <Button href={site.cv} external>
                Download CV
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
