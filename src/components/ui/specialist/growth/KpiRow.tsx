"use client";

import {
  formatNumber,
  type GrowthKpi
} from "@/data/services/specialist/growthIntelligenceDemo";
import { RevealPhase, useTween } from "./hooks";

// Three headline figures. They COUNT UP ONCE, on first view (about 900ms),
// and on a mode change they cross-fade to the new set (the parent keys the
// row) — the units differ between modes (184 becomes £42.6k), so counting
// from one to the other would show meaningless numbers in between. Under
// reduced motion: no count, just the figure. The trend is an arrow AND the
// words of the delta, never a colour on its own.

interface KpiRowProps {
  kpis: GrowthKpi[];
  phase: RevealPhase;
  reduced: boolean;
  compact?: boolean;
}

const ARROW = { up: "↑", down: "↓", none: "" } as const;

const KpiRow = ({ kpis, phase, reduced, compact = false }: KpiRowProps) => {
  // Zero while armed; the real values once shown, counted up. That armed →
  // shown step is the only target change a mounted row ever sees: a mode
  // change REMOUNTS the row (the parent keys it), and a fresh tween starts at
  // its target, so a new mode's figures arrive without counting.
  const targets = kpis.map(kpi => (phase === "armed" ? 0 : kpi.value));
  const values = useTween(targets, 900, phase === "shown" && !reduced);

  return (
    <dl className={compact ? "giKpis giKpis--compact" : "giKpis"}>
      {kpis.map((kpi, i) => (
        <div className='giKpis__item' key={kpi.label}>
          <dt className='giKpis__label'>{kpi.label}</dt>
          <dd className='giKpis__value'>
            {/* Assistive tech reads the final figure, never a mid-count one. */}
            <span aria-hidden='true'>
              {formatNumber(values[i] ?? kpi.value, kpi)}
            </span>
            <span className='giSr'>{formatNumber(kpi.value, kpi)}</span>
          </dd>
          <dd className='giKpis__delta'>
            {kpi.trend !== "none" && (
              <span className='giKpis__arrow' aria-hidden='true'>
                {ARROW[kpi.trend]}
              </span>
            )}
            {kpi.delta}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default KpiRow;
