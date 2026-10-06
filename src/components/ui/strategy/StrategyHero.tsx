import { Container } from "@/components/common";
import { Text } from "@/components/feature";
import { strategyHero } from "@/data/strategy";
import type { MouseEvent } from "react";

// The interior hero, and the first state of the diagnostic.
//
// NO FIGURE, NO ART, deliberately. The final brief (30 Sep 2026) bars hero
// artwork of any kind: the typography and the interaction carry the page.
//
// TWO LINES OF EQUAL AUTHORITY: the same size and weight, told apart by
// colour only — plum ink, then burgundy, both at full opacity. When the
// diagnostic starts the hero goes COMPACT: the heading gets smaller and the
// lead, facts and controls fold away. It never fades; see _strategyHero.scss.
//
// "Start the diagnostic" is a real link to #diagnostic, so it works before
// hydration and with JavaScript off; with JavaScript it starts the diagnostic
// in place instead of jumping.

interface StrategyHeroProps {
  compact: boolean;
  onStart: () => void;
}

const StrategyHero = ({ compact, onStart }: StrategyHeroProps) => {
  const {
    eyebrow,
    headingLead,
    headingAccent,
    lead,
    facts,
    primaryCta,
    secondaryCta
  } = strategyHero;

  const start = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onStart();
  };

  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='strategyHero'>
          <Text className='eyebrow'>{eyebrow}</Text>

          <h1 className='h1p strategyHero__heading'>
            <span className='strategyHero__line strategyHero__line--lead'>
              {headingLead}
            </span>{" "}
            <span className='strategyHero__line strategyHero__line--accent'>
              {headingAccent}
            </span>
          </h1>

          {/* Folds away when compact. `inert` takes the two controls out of
              the tab order while they are folded. */}
          <div className='strategyHero__more' inert={compact}>
            <div className='strategyHero__moreInner'>
              <Text className='lead strategyHero__lead'>{lead}</Text>

              <ul className='strategyHero__facts'>
                {facts.map(fact => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>

              <div className='strategyHero__actions'>
                <a href={primaryCta.to} className='btn' onClick={start}>
                  {primaryCta.label}
                </a>
                <a href={secondaryCta.to} className='btn2'>
                  {secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default StrategyHero;
