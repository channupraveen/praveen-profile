import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent/90">{children}</p>
  );
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted text-pretty">{intro}</p>}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export function Button({ href, children, variant = "secondary", external }: BtnProps) {
  const base =
    "btn-arrow press inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles = {
    primary: "bg-fg text-bg hover:bg-white",
    secondary: "border border-line-strong bg-panel text-fg hover:border-fg/30 hover:bg-panel-2",
    ghost: "text-muted hover:text-fg",
  }[variant];
  const cls = `${base} ${styles}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pt-12 pb-28 md:pb-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.role}</p>
          <p className="mt-3 text-sm text-faint">Building practical software and AI systems.</p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
            <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-fg">
              <GitHubIcon /> GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-fg">
              <LinkedInIcon /> LinkedIn
            </a>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-fg">
                <MailIcon /> Contact
              </a>
            ) : (
              <a href="/#contact" className="flex items-center gap-1.5 hover:text-fg">
                <MailIcon /> Contact
              </a>
            )}
          </div>
          <p className="font-mono text-xs text-faint">© 2026 {site.name}</p>
        </div>
      </Container>
    </footer>
  );
}
