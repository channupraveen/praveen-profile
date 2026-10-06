"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  {
    id: "about",
    label: "About",
    icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  },
  {
    id: "work",
    label: "Work",
    icon: <path d="M3 7h18v12H3zM8 7V5h8v2" />,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 14" />,
  },
  {
    id: "github",
    label: "Code",
    icon: <path d="M4 5h16v14H4zM8 10l2 2-2 2m5 0h3" />,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <path d="M3 5h18v14H3zm0 1 9 7 9-7" />,
  },
];

/**
 * App-style bottom navigation for phones. Appears after the hero and
 * highlights the section currently on screen.
 */
export function MobileDock() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (pathname !== "/") return;

    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav
      data-show={show}
      aria-label="Section navigation"
      className="dock safe-bottom fixed left-1/2 z-40 md:hidden"
    >
      <ul className="flex items-center gap-0.5 rounded-2xl border border-line-strong bg-panel/85 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`press flex w-[3.6rem] flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] transition-colors ${
                  on ? "bg-fg/[0.08] text-fg" : "text-muted"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`size-[18px] transition-colors ${on ? "text-accent" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {it.icon}
                </svg>
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
