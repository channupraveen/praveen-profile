import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/data";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Small sentence-case label. Used sparingly, only where it carries information. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm text-muted">{children}</p>;
}

export function SectionHeading({ title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-14">
      <h2 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-[2.75rem]">{title}</h2>
      {intro && <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty">{intro}</p>}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="text-sm text-muted">{children}</span>;
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export function Button({ href, children, variant = "secondary", external }: BtnProps) {
  const base =
    "press inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-200";
  const styles = {
    primary: "bg-fg text-panel hover:bg-accent",
    secondary: "border border-line-strong bg-panel text-fg hover:border-fg",
    ghost: "link px-1 text-fg",
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
    <footer className="border-t border-line pt-10 pb-28 md:pb-10">
      <Container className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-fg">{site.name}</span>, software and AI engineer in Hyderabad.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className="link">
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="link">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="link">
            GitHub
          </a>
          <span className="text-faint">© 2026</span>
        </div>
      </Container>
    </footer>
  );
}
