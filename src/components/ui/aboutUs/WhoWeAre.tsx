import { Heading, Text } from "@/components/feature";

// D5. Both eyebrows here were invisible: color_primary on a bg_primary ground
// and color_secondry on a bg_secondry ground, each the same colour as the thing
// behind it. The colour utilities are gone and the partial gives both grounds
// and both eyebrows their tones. See _whoWeAre.scss.

const WhoWeAre = () => {
  return (
    <div className='whoWeAre'>
      <section>
        <div>
          <header>
            <Text className='text_primary'>Who we are</Text>
          </header>
          <Heading className='heading_secondry--light' level={2}>
            Bridging the gap in marketing for emerging industries
          </Heading>
          <div>
            <Text className='text_secondry'>
              When Pixelette Marketing began in 2020, we recognized an untapped
              opportunity to serve industries breaking new ground. Emerging
              fields like AI, blockchain, fintech and startups overall needed
              more than generic marketing strategies – they required a partner
              who truly grasped their complexities and ambitions.
            </Text>
            <Text className='text_secondry'>
              So, we took a different path. We’re not just marketers, we’re
              partners for innovators. Every campaign, every strategy, every
              piece of content we craft is designed to uplift groundbreaking
              ideas and deliver measurable results. It’s not just about being
              seen; it’s about being understood.
            </Text>
          </div>
        </div>
      </section>
      <section>
        <div>
          <header>
            <Text className='text_primary'>Our approach</Text>
          </header>
          <Heading className='heading_secondry--light' level={2}>
            Your vision, our blueprint
          </Heading>
          <Text className='text_secondry'>
            Your ambitions set the direction; we provide the roadmap. With a
            clear understanding of your goals, we design actionable plans to
            bring your vision to life.
          </Text>
          <ul>
            <li>
              Our decisions are rooted in data, making sure every move made is
              backed by actionable insights.
            </li>
            <li>
              No one-size-fits-all solutions here. Every campaign is customised
              to fit the unique voice and goals of your brand.
            </li>
            <li>
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
