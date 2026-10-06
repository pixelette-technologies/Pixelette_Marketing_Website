"use client";

import type { GrowthDemoConfig } from "@/data/services/specialist/growthIntelligenceDemo";
import { useRef } from "react";
import { usePrefersReducedMotion, useRevealOnce } from "./hooks";
import IllustrativeLineChart from "./IllustrativeLineChart";
import KpiRow from "./KpiRow";

// The hero's compact preview of the Growth Intelligence view: the Growth
// mode's three figures and its main chart, drawn by the SAME components from
// the SAME data as the full view — one analytics system, not two. Labelled
// illustrative in visible text, and it links down to the full view.

const GrowthPreview = ({ demo }: { demo: GrowthDemoConfig }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const phase = useRevealOnce(ref, reduced);
  const mode = demo.modes[0];

  return (
    <div className='giPreview' ref={ref} data-phase={phase}>
      <div className='giPreview__head'>
        <p className='giPreview__title'>{demo.heading}</p>
        <p className='giPreview__flag'>{demo.qualification}</p>
      </div>
      <KpiRow kpis={mode.kpis} phase={phase} reduced={reduced} compact />
      <p className='giPreview__chartTitle'>{mode.line.title}</p>
      <IllustrativeLineChart
        chart={mode.line}
        periods={demo.periods}
        phase={phase}
        reduced={reduced}
        compact
      />
      <a className='giPreview__link' href='#growth-intelligence-view'>
        Explore the full view <span aria-hidden='true'>↓</span>
      </a>
    </div>
  );
};

export default GrowthPreview;
