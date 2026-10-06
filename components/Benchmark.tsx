import type { Project } from "@/lib/data";

export function Benchmark({ data }: { data: NonNullable<Project["benchmark"]> }) {
  const max = Math.max(...data.rows.map((r) => r.seconds));
  return (
    <figure className="rounded-lg border border-line bg-panel p-4">
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
        <span className="text-muted">Same workload, time to finish</span>
        <span className="font-medium text-accent">{data.result}</span>
      </figcaption>
      <div className="space-y-2.5">
        {data.rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[3.75rem_1fr_3.5rem] items-center gap-3 text-sm">
            <span className="text-muted">{r.label}</span>
            <div className="h-2 overflow-hidden rounded-full bg-panel-2">
              <div
                className={`bar-grow h-2 rounded-full ${i === data.rows.length - 1 ? "bg-accent" : "bg-faint"}`}
                style={{ width: `${(r.seconds / max) * 100}%`, animationDelay: `${i * 150}ms` }}
              />
            </div>
            <span className="text-right tabular-nums">{r.seconds}s</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-faint">{data.note}</p>
    </figure>
  );
}
