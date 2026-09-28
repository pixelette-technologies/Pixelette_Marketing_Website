import Link from "next/link";
import { Container } from "@/components/common";
import { growthSystemData } from "@/data/home";
import CapabilitySystem from "./CapabilitySystem";

// The frame around the connected growth system: the section's heading, the
// figure, and the route into What We Do (brief, section 9). The heading and
// the CTA are server-rendered; only the figure is a client component.
//
// This section carries the page's one .rule-cap. It used to sit on the
// commercial-outcomes figure, which the journey replaced; the capabilities
// are the offer itself, which is what the signature mark is for.

export default function ConnectedSystem() {
  const { eyebrow, heading, lead, cta } = growthSystemData;

  return (
    <section className='capSystem sec'>
      <Container className='main'>
        <div className='capSystem__inner rule-cap'>
          <header className='capSystem__head'>
            <h2 className='eyebrow'>{eyebrow}</h2>
            <h3 className='h2'>{heading}</h3>
            <p className='lead'>{lead}</p>
          </header>

          <CapabilitySystem />

          {cta && (
            <Link href={cta.to} className='btn2 btn--arrow capSystem__cta'>
              {cta.label}
              <span aria-hidden='true'>→</span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
