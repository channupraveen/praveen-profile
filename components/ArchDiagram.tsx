import { Fragment, type CSSProperties } from "react";
import type { ArchLayer } from "@/lib/data";

function Node({ label, emphasis, i, fill }: { label: string; emphasis?: boolean; i: number; fill?: boolean }) {
  return (
    <div
      style={{ "--i": i } as CSSProperties}
      className={`arch-node rounded-md border px-2.5 py-1.5 text-center font-mono text-[10.5px] leading-tight sm:px-3 sm:text-xs ${
        fill ? "min-w-0" : "max-w-full"
      } ${
        emphasis
          ? "border-accent/40 bg-accent/[0.07] text-accent"
          : "border-line-strong bg-panel-2 text-fg/90"
      }`}
    >
      {label}
    </div>
  );
}

/**
 * Vertical architecture diagram. Each layer is one node or a row of
 * parallel nodes. Nodes light up in order and dots flow downward.
 */
export function ArchDiagram({ layers, compact = false }: { layers: ArchLayer[]; compact?: boolean }) {
  const gap = compact ? "h-4" : "h-6";
  let order = 0;
  return (
    <div className="flex w-full flex-col items-center" role="img" aria-label={layers.flat().join(" → ")}>
      {layers.map((layer, i) => (
        <Fragment key={i}>
          {i > 0 && <div className={`flow-line ${gap}`} style={{ "--delay": `${i * 0.3}s` } as CSSProperties} />}
          {Array.isArray(layer) ? (
            <div
              className="grid w-full max-w-md gap-1.5 border-t border-line-strong pt-3 sm:gap-2"
              style={{ gridTemplateColumns: `repeat(${layer.length}, minmax(0, 1fr))` }}
            >
              {layer.map((n) => (
                <Node key={n} label={n} i={order++} fill />
              ))}
            </div>
          ) : (
            <Node label={layer} emphasis={i === 0} i={order++} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
