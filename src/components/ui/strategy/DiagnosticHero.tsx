import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { diagnosticHero } from "@/data/strategy";

// The interior hero. .wash-left is the guide's offset interior ground, and the
// wrapper is what lets the gradient run full-bleed behind the container rather
// than being clipped to it — container_main carries overflow: hidden.
//
// .h1p, NOT .h1. The interior-page variant is 31 -> 52px against .h1's
// 36 -> 64, and _tokens.scss describes it as the one that drives every service,
// category and article route. This is an interior page. AboutUsHero takes .h1
// because that page is the second front door; this one sits under a capability.
//
// THE EYEBROW IS A <Text>, NOT A <Heading>. A heading above the h1 inverts the
// document outline — the call HomeHero made and AboutUsHero repeats.
//
// NO IMAGE, and the reason is the same one that took the collage off the About
// hero: there is no honest asset for this page. Every hero image in public/ is
// bought stock, and a stock photograph under a headline about diagnosis is the
// thing the instrument below is meant to replace. The composition is the
// measure — 34rem against the 1160px wrap leaves the right side deliberately
// empty, and the wash is the only other thing in the band.
//
// The CTA is a fragment link, not a <Link>. It targets #diagnostic on this same
// page; _base.scss already sets scroll-behavior: smooth and a scroll-padding-top
// that tracks --header-h, so the jump glides and lands clear of the sticky bar
// without this component knowing the header exists.

const DiagnosticHero = () => {
  const { eyebrow, headingLead, headingAccent, lead, note, cta } =
    diagnosticHero;

  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='diagnosticHero'>
          <Text className='eyebrow'>{eyebrow}</Text>

          <Heading className='h1p' level={1}>
            {headingLead} <span>{headingAccent}</span>
          </Heading>

          <Text className='lead'>{lead}</Text>

          <a href={cta.to} className='btn'>
            {cta.label}
          </a>

          <Text className='small'>{note}</Text>
        </section>
      </Container>
    </div>
  );
};

export default DiagnosticHero;
