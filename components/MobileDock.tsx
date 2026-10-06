"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  {
    id: "work",
    label: "Work",
    icon: <path d="M3 7h18v12H3zM8 7V5h8v2" />,
  },
  {
    id: "about",
    label: "About",
    icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  },
  {
    id: "experience",
    label: "Jobs",
    icon: <path d="M4 6h16M4 12h16M4 18h10" />,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 14" />,
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
      <ul className="flex items-center gap-0.5 rounded-[20px] border border-line bg-panel/95 p-1.5 shadow-[0_16px_40px_-16px_rgba(21,23,28,0.35)] backdrop-blur-md">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`press flex w-[3.6rem] flex-col items-center gap-1 rounded-[14px] py-1.5 text-[11px] transition-colors ${
                  on ? "bg-accent text-panel" : "text-muted"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
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
