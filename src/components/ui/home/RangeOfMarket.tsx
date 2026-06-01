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

type RenderIconsProps = {
  icons: IconComponent[];
};

const renderIcons = ({ icons }: RenderIconsProps) => {
  return icons.map((Icon, index) => (
    <div key={index} className='icon-wrapper'>
      <Icon />
    </div>
  ));
};

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
    <div className='bg_primary' data-aos='fade-up' data-aos-duration='1200'>
      <Container className='main'>
        <section className='rangeOfMarket'>
          <header data-aos='fade-left' data-aos-duration='1400'>
            {renderIcons({
              icons: [
                ...iconsGroup1,
                ...iconsGroup1,
                ...iconsGroup1,
                ...iconsGroup1
              ]
            })}
          </header>

          <center className='text_align_center'>
            <Heading
              className='secondry--semibold color_white'
              animation='fade-left'
              duration='1600'
              level={2}
            >
              Our range of marketing tech and platforms
            </Heading>
            <Text
              className='primary color_white'
              animation='fade-right'
              duration='1800'
            >
              Pixelette Marketing utilizes a diverse range of platforms to drive
              engagement, generate leads and boost your ROI
            </Text>
          </center>

          <div data-aos='fade-right' data-aos-duration='2000'>
            {renderIcons({
              icons: [
                ...iconsGroup2,
                ...iconsGroup2,
                ...iconsGroup2,
                ...iconsGroup2
              ]
            })}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default RangeOfMarket;
