"use client";

import { Container } from "@/components/common";
import type { GrowthDemoConfig } from "@/data/services/specialist/growthIntelligenceDemo";
import { useId, useRef, useState } from "react";
import ContributionView from "./ContributionView";
import DecisionModeSelector from "./DecisionModeSelector";
import { usePrefersReducedMotion, useRevealOnce } from "./hooks";
import IllustrativeLineChart from "./IllustrativeLineChart";
import InsightPanel from "./InsightPanel";
import KpiRow from "./KpiRow";
import SourceBars from "./SourceBars";

// 03 THE GROWTH INTELLIGENCE VIEW — the page's signature interaction, and the
// specialist family's one deliberate exception to "no visuals": data
// visualisation is part of this capability, so here it is shown working.
//
// IT DEMONSTRATES A SEQUENCE, DATA → INTERPRETATION → DECISION, and says so
// with its three stage labels: the figures and charts (01), the three-part
// reading of them (02), and the one decision they support (03). Choosing a
// business question — Growth, Efficiency, Pipeline — changes every part of it
// at once, with no reload.
//
// ILLUSTRATIVE, VISIBLY. The qualification is printed under the heading and
// again on the view itself; it is never only a tooltip, and nothing here is
// presented as a Pixelette or client result.
//
// MOTION IS STATE, NOT DECORATION: an entrance once (figures count, lines
// draw, bars grow), a transition on each mode change, then stillness. Under
// reduced motion every state arrives at once. See _growthIntelligence.scss.

const GrowthIntelligenceDemo = ({ demo }: { demo: GrowthDemoConfig }) => {
  const [active, setActive] = useState(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const phase = useRevealOnce(viewRef, reduced);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const mode = demo.modes[active];

  return (
    <Container className='main'>
      <section
        className='spSection giSection'
        id='growth-intelligence-view'
        aria-labelledby='gi-view'
      >
        <header className='spHead giSection__head'>
          <p className='spHead__eyebrow'>{demo.eyebrow}</p>
          <h2 className='spHead__heading' id='gi-view'>
            {demo.heading}
          </h2>
          <p className='giQualify'>{demo.qualification}</p>
        </header>

        <div className='giView' ref={viewRef} data-phase={phase}>
          <div className='giView__bar'>
            <DecisionModeSelector
              modes={demo.modes}
              active={active}
              onSelect={setActive}
              idFor={tabId}
              panelId={panelId}
            />
            <p className='giView__flag'>{demo.qualification}</p>
          </div>

          <div
            className='giView__panel'
            id={panelId}
            role='tabpanel'
            aria-labelledby={tabId(active)}
          >
            <div className='giStage'>
              <p className='giStage__label'>
                <span aria-hidden='true'>01</span> Data
              </p>
              <div className='giSwap' key={`kpis-${mode.key}`}>
                <KpiRow kpis={mode.kpis} phase={phase} reduced={reduced} />
              </div>
              <div className='giView__charts'>
                <div className='giView__main'>
                  <IllustrativeLineChart
                    chart={mode.line}
                    periods={demo.periods}
                    phase={phase}
                    reduced={reduced}
                    modeKey={mode.key}
                  />
                </div>
                <div className='giView__side'>
                  <SourceBars bars={mode.bars} phase={phase} />
                  <ContributionView mix={mode.mix} phase={phase} />
                </div>
              </div>
            </div>

            <div className='giSwap' key={`insight-${mode.key}`}>
              <InsightPanel mode={mode} />
            </div>
          </div>

          {/* Announced on change: the question now shown and what it concludes. */}
          <p className='giSr' aria-live='polite'>
            {`${mode.label} view. Decision: ${mode.decision}.`}
          </p>
        </div>
      </section>
    </Container>
  );
};

export default GrowthIntelligenceDemo;
