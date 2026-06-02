import { Heading, Text } from "@/components/feature";

const WhoWeAre = () => {
  return (
    <div className='whoWeAre'>
      <section
        className='bg_primary'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <div>
          <header data-aos='fade-up' data-aos-duration='1200'>
            <Text className='primary color_primary'>Who we are</Text>
          </header>
          <Heading
            className='secondry--light color_white'
            animation='fade-up'
            duration='1300'
            level={2}
          >
            Bridging the gap in marketing for emerging industries
          </Heading>
          <div>
            <Text
              className='secondry color_white'
              animation='fade-up'
              duration='1400'
            >
              When Pixelette Marketing began in 2020, we recognized an untapped
              opportunity to serve industries breaking new ground. Emerging
              fields like AI, blockchain, fintech and startups overall needed
              more than generic marketing strategies – they required a partner
              who truly grasped their complexities and ambitions.
            </Text>
            <Text
              className='secondry color_white'
              animation='fade-up'
              duration='1500'
            >
              So, we took a different path. We’re not just marketers, we’re
              partners for innovators. Every campaign, every strategy, every
              piece of content we craft is designed to uplift groundbreaking
              ideas and deliver measurable results. It’s not just about being
              seen; it’s about being understood.
            </Text>
          </div>
        </div>
      </section>
      <section
        className='bg_secondry'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <div>
          <header data-aos='fade-up' data-aos-duration='1200'>
            <Text className='primary color_secondry'>Our approach</Text>
          </header>
          <Heading
            className='secondry--light color_white'
            animation='fade-up'
            duration='1300'
            level={2}
          >
            Your vision, our blueprint
          </Heading>
          <Text
            className='secondry color_white'
            animation='fade-up'
            duration='1400'
          >
            Your ambitions set the direction; we provide the roadmap. With a
            clear understanding of your goals, we design actionable plans to
            bring your vision to life.
          </Text>
          <ul>
            <li data-aos='fade-up' data-aos-duration='1430'>
              Our decisions are rooted in data, making sure every move made is
              backed by actionable insights.
            </li>
            <li data-aos='fade-up' data-aos-duration='1530'>
              No one-size-fits-all solutions here. Every campaign is customised
              to fit the unique voice and goals of your brand.
            </li>
            <li data-aos='fade-up' data-aos-duration='1630'>
              We focus only on tangible outcomes (and no vanity metrics),
              whether that’s generating leads or getting you an uptick in
              revenue.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAre;
