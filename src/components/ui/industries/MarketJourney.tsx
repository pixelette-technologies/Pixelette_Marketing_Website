import type { CSSProperties } from "react";
import type { MarketJourney as Journey } from "@/data/industries/industries";
import { industryLabels } from "@/data/industries/industries";

// The Market journey. 30 Sep 2026. The Industries page's visual device.
//
// FIVE STAGES ON ONE THIN LINE, AND NOT A FUNNEL. It shows how the buying
// mechanics differ between markets; nothing narrows, nothing is counted.
//
// THE TEXT IS THE CONTENT and the line is decoration. The five stages are an
// ordered list a screen reader, a crawler and a reader without JavaScript all
// get whole; the track, the fill and the signal are aria-hidden. With nothing
// playing — no JavaScript, reduced motion, or the travel finished — the line is
// drawn in full with every stage reached, which is the state it rests in.
//
// No state or effect lives here. The one-shot travel is CSS keyed off the
// explorer's data-journey and the panel's is-active class, in
// _industriesHub.scss, so a new market restarts it and nothing loops.

interface MarketJourneyProps {
  id: string;
  stages: Journey;
}

export default function MarketJourney({ id, stages }: MarketJourneyProps) {
  const labelId = `market-journey-${id}`;

  return (
    <div className='marketJourney'>
      <p className='marketJourney__label' id={labelId}>
        {industryLabels.journey}
      </p>
      <div className='marketJourney__body'>
        <span className='marketJourney__track' aria-hidden='true'>
          <span className='marketJourney__fill' />
          <span className='marketJourney__travel'>
            <span className='marketJourney__signal' />
          </span>
        </span>
        <ol className='marketJourney__stages' aria-labelledby={labelId}>
          {stages.map((stage, index) => (
            <li
              key={stage}
              className='marketJourney__stage'
              style={{ "--i": index } as CSSProperties}
            >
              <span className='marketJourney__node' aria-hidden='true' />
              <span className='marketJourney__name'>{stage}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
