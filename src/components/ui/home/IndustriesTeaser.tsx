import Link from "next/link";
import { Container } from "@/components/common";
import { industriesTeaser } from "@/data/industries/industries";

// Home 05: the Industries teaser. 29 Sep 2026, locked information
// architecture. It replaced the eight-card Who we help section.
//
// ONE JOB: acknowledge breadth and route to /industries. No cards beneath it,
// on instruction — the eight markets and the market-by-market thinking are the
// Industries page's, and repeating them here is the duplication the
// specification removed.
//
// Heading outline: the eyebrow is a label, the visual .h2 is the section's h2,
// as in the opening sections above it.

export default function IndustriesTeaser() {
  const { eyebrow, heading, lead, cta } = industriesTeaser;

  return (
    <section className='homeTeaser sec' aria-labelledby='industries-teaser-title'>
      <Container className='main'>
        <div className='homeTeaser__grid'>
          <div className='homeTeaser__head'>
            <p className='eyebrow'>{eyebrow}</p>
            <h2 className='h2' id='industries-teaser-title'>
              {heading}
            </h2>
          </div>
          <div className='homeTeaser__body'>
            <p className='lead'>{lead}</p>
            <Link href={cta.to} className='textLink textLink--brand'>
              {cta.label}
              <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
