import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { strategyHero } from "@/data/strategy";
import DimensionWave from "./DimensionWave";

// The interior hero. `.wash-left` is the guide's offset interior ground, and
// the wrapper is what lets the gradient run full-bleed behind the container
// rather than being clipped to it — container_main carries overflow: hidden.
//
// .h1p, NOT .h1. The interior-page variant is 31 -> 52px against .h1's
// 36 -> 64, and _tokens.scss describes it as the one that drives every service,
// category and article route. AboutUsHero takes .h1 because that page is the
// second front door; this one sits under a capability.
//
// THE EYEBROW IS A <Text>, NOT A <Heading>. A heading above the h1 inverts the
// document outline — the call HomeHero made and AboutUsHero repeats. There is
// one h1 on this route and it is here.
//
// BOTH CONTROLS ARE FRAGMENT LINKS, not <Link>. They target anchors on this
// same page; _base.scss already sets scroll-behavior: smooth and a
// scroll-padding-top that tracks --header-h, so each jump glides and lands
// clear of the sticky bar without this component knowing the header exists.
// That is also why neither needs a click handler: no JavaScript is involved in
// either scroll, so both work before hydration and with JS off entirely.
//
// NO IMAGE. Every hero image in public/ is bought stock, and the brief bars
// stock photography outright. The composition is the measure — 34rem against
// the 1160px wrap leaves the right side deliberately empty — and the figure
// beneath the copy is the visual.

const StrategyHero = () => {
  const {
    eyebrow,
    headingLead,
    headingAccent,
    lead,
    primaryCta,
    microcopy,
    secondaryCta
  } = strategyHero;

  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='strategyHero'>
          <Text className='eyebrow'>{eyebrow}</Text>

          {/* Two lines, and the break is authored rather than left to the
              measure: "Know where to compete. / Know why you win." is a pair,
              and a heading that wrapped between "where" and "to" would break
              the parallel that makes it work. */}
          <Heading className='h1p strategyHero__heading' level={1}>
            {headingLead} <span>{headingAccent}</span>
          </Heading>

          <Text className='lead'>{lead}</Text>

          <div className='strategyHero__actions'>
            <a href={primaryCta.to} className='btn'>
              {primaryCta.label}
            </a>
            <a href={secondaryCta.to} className='btn2'>
              {secondaryCta.label}
            </a>
            {/* The time estimate sits with the primary control rather than
                under the lead: it is a condition of taking the action, so it
                belongs where the action is. */}
            <Text className='small strategyHero__microcopy'>{microcopy}</Text>
          </div>

          <DimensionWave />
        </section>
      </Container>
    </div>
  );
};

export default StrategyHero;
