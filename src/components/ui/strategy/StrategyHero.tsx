import { diagnosticIntro, strategyHero } from "@/data/strategy";
import type { MouseEvent } from "react";
import ImpactCompass from "./ImpactCompass";

// Impact Compass intro — approved Option 3 (20 Nov 2026).
// Split composition: copy left, coded compass on a dark burgundy field.
// "Start diagnostic" is a real #diagnostic link (works without JS) and
// starts the in-page experience when hydrated.

interface StrategyHeroProps {
  onStart: () => void;
  resumable?: boolean;
  onResume?: () => void;
  onRestart?: () => void;
}

const StrategyHero = ({
  onStart,
  resumable = false,
  onResume,
  onRestart
}: StrategyHeroProps) => {
  const { eyebrow, heading, lead, process, facts, primaryCta } = strategyHero;

  const start = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onStart();
  };

  return (
    <section className='impactIntro' aria-labelledby='impact-intro-heading'>
      <div className='impactIntro__copy'>
        <div className='impactIntro__copyInner'>
          <p className='impactIntro__eyebrow'>
            <span className='impactIntro__eyebrowText'>{eyebrow}</span>
          </p>

          <h1 id='impact-intro-heading' className='impactIntro__heading'>
            {heading}
          </h1>

          <p className='impactIntro__lead'>{lead}</p>

          <p className='impactIntro__process' aria-label={process.join(", then ")}>
            {process.map((step, i) => (
              <span key={step}>
                {i > 0 && (
                  <span className='impactIntro__processArrow' aria-hidden='true'>
                    {" "}
                    →{" "}
                  </span>
                )}
                <span>{step}</span>
              </span>
            ))}
          </p>

          <ul className='impactIntro__facts'>
            {facts.map(fact => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          {resumable ? (
            <div className='impactIntro__resume'>
              <p className='impactIntro__resumeText'>{diagnosticIntro.resume}</p>
              <div className='impactIntro__actions'>
                <button type='button' className='btn' onClick={onResume}>
                  {diagnosticIntro.resumeAction}
                </button>
                <button type='button' className='btn2' onClick={onRestart}>
                  {diagnosticIntro.restartAction}
                </button>
              </div>
            </div>
          ) : (
            <div className='impactIntro__actions'>
              <a
                href={primaryCta.to}
                className='btn impactIntro__cta'
                onClick={start}
              >
                {primaryCta.label}
              </a>
            </div>
          )}

          <p className='impactIntro__assurance'>{diagnosticIntro.assurance}</p>
        </div>
      </div>

      <div className='impactIntro__visual' aria-hidden='true'>
        <div className='impactIntro__orbits' />
        <ImpactCompass variant='intro' className='impactCompass impactCompass--intro' />
      </div>
    </section>
  );
};

export default StrategyHero;
