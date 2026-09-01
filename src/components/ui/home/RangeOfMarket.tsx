import {
  Ahrefs,
  Apollo,
  Calendly,
  Canva,
  CoSchedule,
  Grammerly,
  HotJar,
  Jira,
  LinkedIn,
  Loom,
  PyTorch,
  Semrush,
  Sprout,
  Buffer,
  MailChimp
} from "@/assets/common";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC } from "react";

type IconComponent = FC;

// Both icon rows used to be rendered four times over and scrolled in opposite
// directions with `animation: scrollX 30s linear infinite`. The keyframes went
// with the decorative layer in D2, which stopped the motion but left four
// static copies of each row. They render ONCE now — 8 platforms and 7, not 32
// and 28. No distinct content is lost.
//
// Phase F. Kept dark, deliberately — Option A, chosen by the user on 1 Sep so
// that Marketing keeps a rhythm of its own rather than becoming a replica of
// Certified's light-throughout page. The alternative was retinting fifteen
// third-party brand marks, every one of which carries a hard-coded white fill
// attribute, so that they could sit on a light ground. That is a brand-usage
// question, not a CSS one.
//
// What changes is that it now shares .band-dark with the client-logo band
// instead of restating the same gradient locally, so the two read as the same
// device recurring rather than two unrelated black rectangles.

const renderIcons = (icons: IconComponent[]) =>
  icons.map((Icon, index) => (
    <div key={index} className='icon-wrapper'>
      <Icon />
    </div>
  ));

// One marquee row. The track carries the icon set TWICE — it slides by exactly
// one group and restarts on the duplicate, which is what makes the loop
// seamless. The second group is aria-hidden so the accessibility tree sees
// eight platforms, not sixteen; the marks themselves are already aria-hidden
// inside their own components.
//
// The two rows run in opposite directions, which is what the pre-revamp version
// did and what the user asked for. `reverse` picks the counter-rotating
// keyframe rather than negating the duration, so both rows start from a settled
// position instead of mid-slide.
const MarqueeRow: FC<{ icons: IconComponent[]; reverse?: boolean }> = ({
  icons,
  reverse
}) => (
  <div className={reverse ? "marquee marquee--reverse" : "marquee"}>
    <div className='marquee__track'>
      <div className='marquee__group'>{renderIcons(icons)}</div>
      <div className='marquee__group' aria-hidden>
        {renderIcons(icons)}
      </div>
    </div>
  </div>
);

const RangeOfMarket: FC = () => {
  const iconsGroup1: IconComponent[] = [
    Ahrefs,
    Calendly,
    CoSchedule,
    Canva,
    HotJar,
    Semrush,
    Grammerly,
    Loom
  ];

  const iconsGroup2: IconComponent[] = [
    Jira,
    LinkedIn,
    PyTorch,
    Apollo,
    Sprout,
    Buffer,
    MailChimp
  ];

  return (
    <div className='rangeOfMarketBand band-dark'>
      <Container className='main'>
        <section className='rangeOfMarket'>
          <header>
            <MarqueeRow icons={iconsGroup1} />
          </header>

          <center className='text_align_center'>
            <Heading className='h2' level={2}>
              Our range of marketing tech and platforms
            </Heading>
            <Text className='lead'>
              Pixelette Marketing utilises a diverse range of platforms to drive
              engagement, generate leads and boost your ROI
            </Text>
          </center>

          <div>
            <MarqueeRow icons={iconsGroup2} reverse />
          </div>
        </section>
      </Container>
    </div>
  );
};

export default RangeOfMarket;
