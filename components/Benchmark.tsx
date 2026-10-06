import type { Project } from "@/lib/data";

export function Benchmark({ data }: { data: NonNullable<Project["benchmark"]> }) {
  const max = Math.max(...data.rows.map((r) => r.seconds));
  return (
    <div className="rounded-lg border border-line bg-panel p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Benchmark · same workload</span>
        <span className="text-sm font-medium text-accent">{data.result}</span>
      </div>
      <div className="space-y-2.5">
        {data.rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[3.75rem_1fr_3.5rem] items-center gap-3">
            <span className="font-mono text-xs text-muted">{r.label}</span>
            <div className="h-2 overflow-hidden rounded-full bg-line">
              <div
                className={`bar-grow h-2 rounded-full ${i === data.rows.length - 1 ? "bg-accent" : "bg-fg/40"}`}
                style={{ width: `${(r.seconds / max) * 100}%`, transitionDelay: `${300 + i * 200}ms` }}
              />
            </div>
            <span className="text-right font-mono text-xs tabular-nums">{r.seconds}s</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-faint">{data.note}</p>
    </div>
  );
}
