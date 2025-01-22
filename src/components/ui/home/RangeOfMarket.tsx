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

const RangeOfMarket = () => {
  return (
    <div className='bg_primary'>
      <Container className='main'>
        <section className='rangeOfMarket'>
          <header>
            <Ahrefs />
            <Calendly />
            <CoSchedule />
            <Canva />
            <HotJar />
            <Semrush />
            <Grammerly />
            <Loom />
          </header>
          <center className='text_align_center'>
            <Heading className='secondry--semibold color_white'>
              Our range of marketing tech and platforms
            </Heading>
            <Text className='primary color_white'>
              Pixelette Marketing utilizes a diverse range of platforms to drive
              engagement, generate leads and boost your ROI
            </Text>
          </center>
          <div>
            <Jira />
            <LinkedIn />
            <PyTorch />
            <Apollo />
            <Sprout />
            <Buffer />
            <MailChimp />
          </div>
        </section>
      </Container>
    </div>
  );
};

export default RangeOfMarket;
