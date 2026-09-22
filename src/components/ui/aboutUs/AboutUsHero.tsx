import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutHero } from "@/data/aboutus";
import Link from "next/link";

// The interior hero. Keeps .wash-left — the guide's offset interior ground,
// and this is still its only call site — and keeps the wrapper so the gradient
// runs full-bleed behind the container rather than being clipped to it.
//
// THE COLLAGE IS GONE, and that is the one visual decision on this page that
// was not asked for in words. heroImageAbout.webp is a bought retro collage —
// a typewriter, handwritten letters, a woman in a hat — and the instruction
// bars stock marketing graphics outright while asking for a headline that
// dominates. The two cannot both be honoured with the image in place: it takes
// half the hero and argues for craft nostalgia under a headline about
// measurable growth. The asset is untouched on disk, so restoring it is one
// import and one <Image>.
//
// What replaces it is the asymmetry, not another picture. The headline is
// capped at the house 34rem measure against a 1160px wrap, so the right side
// of the hero is deliberately air and the wash is the only thing in it.
//
// The eyebrow is a <p>, NOT a <Heading>. A heading above the h1 inverts the
// document outline, which is the call HomeHero already made and recorded.
//
// Legacy classes are gone with it: heading_tertiary, font_family_glory and
// text_secondry are replaced by .h1 and .lead, and the Button component by a
// plain Link on .btn — Button emits `btn btn_primary` and only the first of
// those two classes has ever meant anything.

const AboutUsHero = () => {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='heroSectionAbout'>
          <Text className='eyebrow'>{aboutHero.eyebrow}</Text>

          <Heading className='h1' level={1}>
            {aboutHero.headingLead}{" "}
            <span>{aboutHero.headingAccent}</span>
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
