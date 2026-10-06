"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-[17px] font-bold tracking-tight" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-fg px-4 py-1.5 text-[14px] font-medium text-panel transition-colors hover:bg-accent"
          >
            CV
          </a>
        </div>

        <button
          type="button"
          className="press -mr-2 grid size-10 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute top-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div className="menu-panel md:hidden" data-open={open}>
        <div className="overflow-hidden">
          <ul className="px-5 pt-1 pb-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 font-display text-xl font-semibold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.cv} target="_blank" rel="noreferrer" className="block py-3.5 font-display text-xl font-semibold text-accent">
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
