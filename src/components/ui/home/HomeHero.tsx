import Link from "next/link";
import { Container } from "@/components/common";
import { Button } from "@/components/feature";
import { heroCopy } from "@/data/home";
import LivingSignal from "./LivingSignal";

// 01 — THE HERO. Locked implementation specification, 28 Sep 2026.
//
// The copy is the spec's, word for word: the eyebrow, the headline with NO
// full stop after "bottom line", one supporting line, the primary CTA and a
// secondary text link. The five-word capability line that sat under the
// CTAs in the earlier concept is deliberately gone (Section 03 says it), and
// the space it left is meant to stay empty.
//
// It replaces the baseline's collage hero. HeroCollage.tsx is left on disk,
// unused, rather than deleted, because deleting it was not asked for.
//
// THIS FILE STAYS A SERVER COMPONENT. The Living Signal owns its own client
// boundary, so the headline, the line under it and the actions are rendered
// on the server whatever the picture beside them does.
//
// The primary CTA is a Button with `to`, which renders a single link. The
// baseline wrapped a <button> in a <Link>, an interactive element inside
// another, and that is fixed here in passing.

export default function HomeHero() {
  const { eyebrow, headline, support, primaryCta, secondaryCta } = heroCopy;

  return (
    <div className='homeHero wash'>
      <Container className='main'>
        <div className='homeHero__grid'>
          <div className='homeHero__copy'>
            <p className='homeHero__eyebrow'>{eyebrow}</p>

            <h1 className='h1 homeHero__title'>
              {headline.lead} {headline.tail}
            </h1>

            <p className='lead homeHero__support'>{support}</p>

            <div className='homeHero__actions'>
              <Button to={primaryCta.to} className='primary btn--pill'>
                {primaryCta.label}
                <span aria-hidden='true'>→</span>
              </Button>
              <Link href={secondaryCta.to} className='textLink textLink--brand'>
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className='homeHero__visual'>
            <LivingSignal
              labels={heroCopy.signalLabels}
              annotation={heroCopy.annotation}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
