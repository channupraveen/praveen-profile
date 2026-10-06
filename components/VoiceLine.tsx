"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Real ways hospital staff use AIOpsCare by voice, each showing a different AI feature.
const LINES = [
  {
    use: "Reporting a fault",
    said: "The AC in the ICU isn't working.",
    result: "Creates a maintenance ticket and assigns it to the right team.",
  },
  {
    use: "Asking about operations",
    said: "How many tickets are still open today?",
    result: "Answers from that hospital's own live data, and nothing else.",
  },
  {
    use: "Getting a report",
    said: "Summarise this week's maintenance work.",
    result: "Writes a short plain-English summary for the manager.",
  },
  {
    use: "Checking on a job",
    said: "Who is working on the lift repair?",
    result: "Finds the ticket and says who owns it and its status.",
  },
];

const SPEAK_MS = 2400;
const RESULT_MS = 2600;
const GAP_MS = 400;

type Phase = "speaking" | "result" | "gap";

export function VoiceLine() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");

  useEffect(() => {
    const wait = phase === "speaking" ? SPEAK_MS : phase === "result" ? RESULT_MS : GAP_MS;
    const t = window.setTimeout(() => {
      if (phase === "speaking") setPhase("result");
      else if (phase === "result") setPhase("gap");
      else {
        setI((n) => (n + 1) % LINES.length);
        setPhase("speaking");
      }
    }, wait);
    return () => window.clearTimeout(t);
  }, [phase]);

  const line = LINES[i];

  return (
    <div className="max-w-xl border-l-2 border-marigold pl-4 sm:pl-5">
      <p className="text-sm text-muted">What staff ask AIOpsCare, my hospital operations product, by voice or chat:</p>

      <div className="mt-3 flex items-center gap-3">
        <div className="wave" data-speaking={phase === "speaking"} aria-hidden>
          {Array.from({ length: 14 }, (_, k) => (
            <span key={k} style={{ "--i": k } as CSSProperties} />
          ))}
        </div>
        <span className="text-xs text-faint">{line.use}</span>
      </div>

      <p
        data-show={phase !== "gap"}
        className="voice-text mt-2 min-h-[1.6em] text-xl leading-snug font-medium sm:text-2xl"
        aria-live="polite"
      >
        “{line.said}”
      </p>
      <p data-show={phase === "result"} className="voice-text mt-1.5 min-h-[1.5em] text-[15px] text-accent">
        {line.result}
      </p>

      <p className="mt-3 text-xs text-faint">Works in English, Hindi, Telugu and Tamil.</p>
    </div>
  );
}
