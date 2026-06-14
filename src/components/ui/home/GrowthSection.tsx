import ArrowRed from "@/assets/common/ArrowLeft";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";

export default function GrowthSection() {
  return (
    <Container className='main'>
      <div className='growthSection'>
        <Heading
          className='primary color_secondry font_family_glory uppercase'
          animation='fade-right'
          duration='1400'
          level={2}
        >
          Growth <span className='color_primary'>starts</span> here
          <ArrowRed />
        </Heading>

        <section>
          <div>
            <header>
              <Heading animation='fade-right' duration={"1300"} level={3}>
                Success Follows Next
              </Heading>
              <section data-aos='fade-right' data-aos-duration={1300}>
                <div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      Growth
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      Audience and community growth for Web3 and technology
                      brands
                    </Text>
                  </div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      Conversion
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      Funnel and lead-conversion optimisation for fintech brands
                    </Text>
                  </div>
                </div>
                <div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      Paid ROI
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      Paid media managed for measurable return for SaaS brands
                    </Text>
                  </div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      Pipeline
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      Qualified lead generation for high-growth startups
                    </Text>
                  </div>
                </div>
              </section>
            </header>

            <div data-aos='fade-left' data-aos-duration='2000'>
              <Image
                src='/home/growthBanner.webp'
                alt='Growth Banner'
                width={663}
                height={649}
              />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
