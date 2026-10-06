import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutHero } from "@/data/aboutus";
import Link from "next/link";

// The interior hero. Keeps .wash-left — the guide's offset interior ground —
// and keeps the wrapper so the gradient runs full-bleed behind the container
// rather than being clipped to it.
//
// NO IMAGE, by instruction (30 Sep 2026 brief). The headline is the hero: two
// lines, the statement in near-black and the turn in burgundy. Each line is a
// block span, so the break is authored rather than left to the measure, and a
// screen reader still hears one sentence.
//
// The eyebrow is a <p>, NOT a <Heading>. A heading above the h1 inverts the
// document outline, which is the call HomeHero already made and recorded.

const AboutUsHero = () => {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='heroSectionAbout'>
          <Text className='eyebrow'>{aboutHero.eyebrow}</Text>

          <Heading className='h1' level={1}>
            <span className='heroSectionAbout__lead'>
              {aboutHero.headingLead}
            </span>{" "}
            <span className='heroSectionAbout__accent'>
              {aboutHero.headingAccent}
            </span>
          </Heading>

          <Text className='lead'>{aboutHero.lead}</Text>

          <Link href={aboutHero.cta.to} className='btn'>
            {aboutHero.cta.label}
          </Link>
        </section>
      </Container>
    </div>
  );
};

export default AboutUsHero;
