import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";

// Phase F. There is no eyebrow available here without writing copy, and the
// content rule says ship the pattern without the missing element rather than
// invent one — so this section opens on the h2 alone. "Success Follows Next"
// takes the eyebrow role for the grid it labels, which is the job it was
// already doing.
//
// The ArrowRed mark is gone. It was the second mannerism — .rule-cap, already
// on this section's opening hairline, is the only one this design gets, and
// the two were competing three lines apart.

export default function GrowthSection() {
  return (
    <Container className='main'>
      <div className='growthSection rule-cap'>


        <section>
          <div>
            <header>
              <Heading className='h2 sectionTitle' level={2}>
                Growth <span>starts</span> here
              </Heading>

              <Heading className='eyebrow' level={3}>
                Success Follows Next
              </Heading>
              <section>
                <div>
                  <div>
                    <Heading className='h4' level={4}>
                      Growth
                    </Heading>
                    <Text className='small'>
                      Audience and community growth for Web3 and technology
                      brands
                    </Text>
                  </div>
                  <div>
                    <Heading className='h4' level={4}>
                      Conversion
                    </Heading>
                    <Text className='small'>
                      Funnel and lead-conversion optimisation for fintech brands
                    </Text>
                  </div>
                </div>
                <div>
                  <div>
                    <Heading className='h4' level={4}>
                      Paid ROI
                    </Heading>
                    <Text className='small'>
                      Paid media managed for measurable return for SaaS brands
                    </Text>
                  </div>
                  <div>
                    <Heading className='h4' level={4}>
                      Pipeline
                    </Heading>
                    <Text className='small'>
                      Qualified lead generation for high-growth startups
                    </Text>
                  </div>
                </div>
              </section>
            </header>

            <div>
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
