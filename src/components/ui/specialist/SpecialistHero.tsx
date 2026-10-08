import { Container } from "@/components/common";
import Link from "next/link";
import type { ReactNode } from "react";

// 01 Capability context + hero. TYPOGRAPHY ONLY: the brief bars hero art,
// photography, generated imagery and any secondary visual. The eyebrow names
// the capability first, so the page reads as a route into Demand &
// Performance rather than as a stand-alone agency.
//
// `aside` is Growth Intelligence's alone (its illustrative preview, by its
// own brief). Without it the markup is the single-column hero.

interface SpecialistHeroProps {
  eyebrow: string;
  heading: string | { lead: string; accent: string };
  lead: string;
  cta: { label: string; href: string };
  /** Growth Intelligence only: a compact preview beside the copy. Absent on
   *  every other specialist page, which stay typography-only. */
  aside?: ReactNode;
}

const SpecialistHero = ({ eyebrow, heading, lead, cta, aside }: SpecialistHeroProps) => {
  const copy = (
    <>
      <p className='spHero__eyebrow'>{eyebrow}</p>
      <h1 className='h1p spHero__heading'>
        {typeof heading === "string" ? (
          heading
        ) : (
          <>
            <span className='spHero__line'>{heading.lead}</span>{" "}
            <span className='spHero__line spHero__line--accent'>
              {heading.accent}
            </span>
          </>
        )}
      </h1>
      <p className='lead spHero__lead'>{lead}</p>
      <div className='spHero__actions'>
        <Link href={cta.href} className='btn'>
          {cta.label}
        </Link>
      </div>
    </>
  );

  return (
    <div className='wash-left'>
      <Container className='main'>
        {aside ? (
          <section className='spHero spHero--withAside'>
            <div className='spHero__copy'>{copy}</div>
            {aside}
          </section>
        ) : (
          <section className='spHero'>{copy}</section>
        )}
      </Container>
    </div>
  );
};

export default SpecialistHero;
