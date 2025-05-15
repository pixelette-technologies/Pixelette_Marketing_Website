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
                      300%
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      growth in 1 month in community membership for a Web3
                      platform
                    </Text>
                  </div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      40%
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      lead conversion increase in Fintech app over six months
                    </Text>
                  </div>
                </div>
                <div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      2.5x
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      ROI on PPC campaigns for a SaaS company
                    </Text>
                  </div>
                  <div>
                    <Heading className='primary font_family_glory color_primary' level={4}>
                      120%
                    </Heading>
                    <Text className='secondry font_family_glory'>
                      increase in qualified social media leads for an AI startup
                      in 60 days
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
