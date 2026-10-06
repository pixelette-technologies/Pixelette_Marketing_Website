import type { SpecialistSectionHead } from "@/data/services/specialist";

// 04 What we measure. The page's one burgundy band, because these pages sit
// under Demand & PERFORMANCE and this is where the second word is earned.
//
// LABELS, NEVER FIGURES. No number, no percentage, no chart: the section
// shows what the work is judged on, not a result it has not produced. The
// legacy pages' "0%" placeholder statistics were exactly that fault.
//
// Not .band-dark: that is the panel gradient and route-walk counts it. This
// is the brief's burgundy under its own class, as the diagnostic's close is.

interface MeasureBandProps extends SpecialistSectionHead {
  heading: string;
  body: string;
  metrics: string[];
  /** A statement under the metrics, across the band's full width. */
  note?: string;
}

const MeasureBand = ({ eyebrow, heading, body, metrics, note }: MeasureBandProps) => (
  <div className='spMeasure'>
    <div className='container_main'>
      <section className='spMeasure__inner' aria-labelledby='sp-measure'>
        <div className='spMeasure__copy'>
          <p className='spMeasure__eyebrow'>{eyebrow}</p>
          <h2 className='spMeasure__heading' id='sp-measure'>
            {heading}
          </h2>
          <p className='spMeasure__body'>{body}</p>
        </div>
        <ul className='spMeasure__metrics' aria-label='What we measure'>
          {metrics.map(metric => (
            <li className='spMeasure__metric' key={metric}>
              {metric}
            </li>
          ))}
        </ul>
        {note && <p className='spMeasure__note'>{note}</p>}
      </section>
    </div>
  </div>
);

export default MeasureBand;
