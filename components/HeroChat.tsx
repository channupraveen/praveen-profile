"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { localAnswer } from "@/lib/assistant";
import profilePhoto from "@/public/img.jpeg";

type Msg = { id: number; role: "user" | "assistant"; content: string; animate?: boolean };

const SUGGESTIONS = [
  "What's his experience?",
  "Why should I hire him?",
  "What AI has he built?",
  "What's his tech stack?",
  "Tell me about AIOpsCare",
  "How does his voice assistant work?",
  "Tell me about SwarmAI",
  "What backend skills does he have?",
  "Has he built SaaS products?",
  "What's his education?",
  "Where is he based?",
  "How can I contact him?",
];

const WELCOME =
  "Hi, I'm Praveen's AI assistant. Ask me anything about his **experience**, **AI projects**, **skills** — or why he'd be a great hire.";

/* ───────── tiny markdown: paragraphs, "- " bullets, **bold** ───────── */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    out.push(
      <ul key={`ul${out.length}`} className="space-y-1.5">
        {list.map((li, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent/80" />
            <span>{inline(li)}</span>
          </li>
        ))}
      </ul>,
    );
    list = [];
  };
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (m) {
      list.push(m[1]);
      continue;
    }
    flush();
    if (line.trim()) out.push(<p key={`p${out.length}`}>{inline(line)}</p>);
  }
  flush();
  return <div className="space-y-2.5">{out}</div>;
}

/* ───────── reveals an answer progressively, like a streaming reply ───────── */
function Typewriter({ text, onTick }: { text: string; onTick: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? text.length : Math.max(2, Math.ceil(text.length / 90));
    let count = 0;
    const t = window.setInterval(() => {
      count = Math.min(text.length, count + step);
      setN(count);
      onTick();
      if (count >= text.length) window.clearInterval(t);
    }, 18);
    return () => window.clearInterval(t);
  }, [text, onTick]);
  const done = n >= text.length;
  return <RichText text={done ? text : text.slice(0, n) + " ▍"} />;
}

/* ───────── horizontally scrollable suggestions: wheel, drag, arrows, touch ───────── */
function SuggestionRail({ items, disabled, onPick }: { items: string[]; disabled: boolean; onPick: (s: string) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const [edges, setEdges] = useState({ left: false, right: true });

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    // Mouse wheel scrolls the row sideways (only while there is room to scroll)
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
      if (max <= 0 || atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const nudge = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * 220, behavior: "smooth" });

  return (
    <div className="group/rail relative border-t border-line">
      <div
        ref={rail}
        className="no-scrollbar flex cursor-grab gap-2 overflow-x-auto scroll-smooth px-3 pt-3 select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !rail.current) return;
          drag.current = { down: true, startX: e.clientX, startLeft: rail.current.scrollLeft, moved: false };
          rail.current.style.scrollBehavior = "auto";
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down || !rail.current) return;
          const dx = e.clientX - d.startX;
          if (Math.abs(dx) > 5) d.moved = true;
          rail.current.scrollLeft = d.startLeft - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
          if (rail.current) rail.current.style.scrollBehavior = "";
        }}
        onPointerLeave={() => {
          drag.current.down = false;
          if (rail.current) rail.current.style.scrollBehavior = "";
        }}
        onClickCapture={(e) => {
          // a drag shouldn't count as clicking a chip
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {items.map((s) => (
          <button
            key={s}
            type="button"
            disabled={disabled}
            onClick={() => onPick(s)}
            className="press shrink-0 rounded-full border border-line-strong bg-bg/50 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg disabled:opacity-40"
          >
            {s}
          </button>
        ))}
        <span className="w-1 shrink-0" aria-hidden />
      </div>

      {/* fade edges + arrow buttons */}
      {[
        { side: "left" as const, show: edges.left, dir: -1 as const },
        { side: "right" as const, show: edges.right, dir: 1 as const },
      ].map(({ side, show, dir }) => (
        <div
          key={side}
          className={`pointer-events-none absolute top-3 bottom-0 flex w-14 items-start transition-opacity duration-200 ${
            side === "left" ? "left-0 justify-start bg-gradient-to-r pl-2" : "right-0 justify-end bg-gradient-to-l pr-2"
          } from-panel via-panel/80 to-transparent ${show ? "opacity-100" : "opacity-0"}`}
        >
          <button
            type="button"
            tabIndex={show ? 0 : -1}
            aria-label={side === "left" ? "Previous suggestions" : "More suggestions"}
            onClick={() => nudge(dir)}
            className={`press grid size-[30px] place-items-center rounded-full border border-line-strong bg-panel-2 text-muted shadow-lg shadow-black/40 transition-colors hover:border-accent/50 hover:text-fg ${
              show ? "pointer-events-auto" : ""
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={side === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

function Sparkle({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zm7 12l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" />
    </svg>
  );
}

export function HeroChat() {
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);

  // Scroll only the chat panel — never the page.
  const toBottom = useCallback((smooth = false) => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);
  const onTick = useCallback(() => toBottom(false), [toBottom]);

  useEffect(() => {
    if (messages.length > 1 || loading) toBottom(true);
  }, [messages, loading, toBottom]);

  async function send(text: string) {
    const q = text.trim().slice(0, 800);
    if (!q || loading) return;

    const userMsg: Msg = { id: nextId.current++, role: "user", content: q };
    const history = [...messages.filter((m) => m.id !== 0), userMsg]
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    setMessages((m) => [...m, userMsg]);
    setInput("");
    if (field.current) field.current.style.height = "";
    setLoading(true);

    let answer: string;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { answer?: string };
      answer = data.answer || localAnswer(q);
    } catch {
      answer = localAnswer(q); // works even without a backend
    }

    setLoading(false);
    setMessages((m) => [...m, { id: nextId.current++, role: "assistant", content: answer, animate: true }]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="photo-in relative w-full">
      {/* soft glow + animated gradient border */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/[0.07] blur-3xl" />
      <div className="chat-ring pointer-events-none absolute -inset-px rounded-2xl" />

      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-panel/90 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="relative shrink-0">
            <Image
              src={profilePhoto}
              alt="Praveen Kumar"
              width={72}
              height={72}
              placeholder="blur"
              className="size-9 rounded-full object-cover object-[48%_15%] ring-1 ring-line-strong"
            />
            <span className="pulse-dot absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-panel bg-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ask about Praveen</p>
            <p className="truncate text-[11px] text-muted">AI assistant · answers from his CV & projects</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 font-mono text-[10px] text-accent">
            <Sparkle className="size-3" /> AI
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scroller}
          className="chat-scroll h-[21rem] space-y-5 overflow-y-auto overscroll-contain px-4 py-5 sm:h-[23rem]"
          aria-live="polite"
        >
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="msg-in flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-fg px-3.5 py-2 text-sm leading-relaxed text-bg">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="msg-in flex gap-3">
                <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent/90 to-emerald-700 text-bg">
                  <Sparkle />
                </div>
                <div className="min-w-0 flex-1 text-sm leading-relaxed text-fg/85">
                  {m.animate ? <Typewriter text={m.content} onTick={onTick} /> : <RichText text={m.content} />}
                </div>
              </div>
            ),
          )}

          {loading && (
            <div className="msg-in flex items-center gap-3">
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent/90 to-emerald-700 text-bg">
                <Sparkle />
              </div>
              <div className="typing flex items-center gap-1 rounded-full border border-line bg-panel-2 px-3 py-2.5">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions — scroll with wheel, drag, arrows or swipe */}
        <SuggestionRail items={SUGGESTIONS} disabled={loading} onPick={send} />

        {/* Input */}
        <form onSubmit={onSubmit} className="p-3">
          <div className="flex items-end gap-2 rounded-xl border border-line-strong bg-bg/60 p-1.5 pl-3.5 transition-colors focus-within:border-accent/50">
            <textarea
              ref={field}
              rows={1}
              value={input}
              maxLength={800}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={onKeyDown}
              placeholder="Ask about experience, AI work, skills…"
              aria-label="Ask a question about Praveen"
              className="max-h-[120px] min-h-9 flex-1 resize-none bg-transparent py-2 text-base text-fg placeholder:text-faint focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="press grid size-9 shrink-0 place-items-center rounded-lg bg-fg text-bg transition-opacity disabled:opacity-25"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[10.5px] text-faint">AI answers can be imperfect — the CV is the source of truth.</p>
        </form>
      </div>
    </div>
  );
}
