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

const renderIcons = (icons: IconComponent[]) =>
  icons.map((Icon, index) => (
    <div key={index} className='icon-wrapper'>
      <Icon />
    </div>
  ));

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
    <div className='rangeOfMarketBand'>
      <Container className='main'>
        <section className='rangeOfMarket'>
          <header>{renderIcons(iconsGroup1)}</header>

          <center className='text_align_center'>
            <Heading className='secondry--semibold' level={2}>
              Our range of marketing tech and platforms
            </Heading>
            <Text className='primary'>
              Pixelette Marketing utilises a diverse range of platforms to drive
              engagement, generate leads and boost your ROI
            </Text>
          </center>

          <div>{renderIcons(iconsGroup2)}</div>
        </section>
      </Container>
    </div>
  );
};

export default RangeOfMarket;
