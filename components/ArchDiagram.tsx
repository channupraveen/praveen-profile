import { Fragment } from "react";
import type { ArchLayer } from "@/lib/data";

function Node({ label, emphasis }: { label: string; emphasis?: boolean }) {
  return (
    <div
      className={`min-w-0 rounded-md border px-2.5 py-1.5 text-center text-[12px] leading-tight sm:text-[13px] ${
        emphasis ? "border-accent bg-accent text-panel" : "border-line-strong bg-panel text-fg"
      }`}
    >
      {label}
    </div>
  );
}

/** Vertical architecture diagram: each layer is one node or a row of parallel nodes. */
export function ArchDiagram({ layers, compact = false }: { layers: ArchLayer[]; compact?: boolean }) {
  const gap = compact ? "h-3.5" : "h-5";
  return (
    <div className="flex w-full flex-col items-center" role="img" aria-label={layers.flat().join(", then ")}>
      {layers.map((layer, i) => (
        <Fragment key={i}>
          {i > 0 && <div className={`flow-line ${gap}`} />}
          {Array.isArray(layer) ? (
            <div
              className="grid w-full max-w-md gap-1.5 border-t border-line-strong pt-2.5"
              style={{ gridTemplateColumns: `repeat(${layer.length}, minmax(0, 1fr))` }}
            >
              {layer.map((n) => (
                <Node key={n} label={n} />
              ))}
            </div>
          ) : (
            <Node label={layer} emphasis={i === 0} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
