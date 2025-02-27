import ArrowRed from "@/assets/common/ArrowLeft";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
// import { growthStartsData } from "@/data";
import Image from "next/image";

// type GrowthData = {
//   value: string;
//   detail: string;
// };

export default function GrowthSection() {
  return (
    <Container className='main'>
      <div className='growthSection'>
        <Heading
          className='primary color_secondry font_family_glory uppercase'
          animation='fade-right'
          duration='1400'
        >
          Growth <span className='color_primary'>starts</span> here
          <ArrowRed />
        </Heading>

        {/* <header>
         
          <Heading
            className='secondary color_secondary font_family_glory uppercase'
            animation='fade-right'
            duration='1400'
          >
            SUCCESS FOLLOWS NEXT.
          </Heading>
          <div
            className='bg_tertiary'
            data-aos='fade-up'
            data-aos-duration='1600'
          >
            {growthStartsData.map((el: GrowthData, index: number) => (
              <div key={index}>
                <Heading className='primary color_primary font_family_glory uppercase'>
                  {el.value}
                </Heading>
                <Text className='secondary color_secondary--light font_family_glory'>
                  {el.detail}
                </Text>
              </div>
            ))}
          </div>
        </header> */}

        <section>
          <div>
            {/* <Heading>Success Follows Next</Heading> */}
            <section data-aos='fade-right' data-aos-duration={1300}>
              <div>
                <div>
                  <Heading className='primary font_family_glory color_primary'>
                    300%
                  </Heading>
                  <Text className='secondry font_family_glory'>
                    growth in 1 month in community membership for a Web3
                    platform
                  </Text>
                </div>
                <div>
                  <Heading className='primary font_family_glory color_primary'>
                    40%
                  </Heading>
                  <Text className='secondry font_family_glory'>
                    lead conversion increase in Fintech app over six months
                  </Text>
                </div>
              </div>
              <div>
                <div>
                  <Heading className='primary font_family_glory color_primary'>
                    2.5x
                  </Heading>
                  <Text className='secondry font_family_glory'>
                    ROI on PPC campaigns for a SaaS company
                  </Text>
                </div>
                <div>
                  <Heading className='primary font_family_glory color_primary'>
                    120%
                  </Heading>
                  <Text className='secondry font_family_glory'>
                    increase in qualified social media leads for an AI startup
                    in 60 days
                  </Text>
                </div>
              </div>
            </section>
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
