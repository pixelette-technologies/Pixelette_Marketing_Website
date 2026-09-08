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
//
// --- 8 Sep 2026 brief -------------------------------------------------------
// The four cells are the brief's commercial framework now: Demand, Pipeline,
// Conversion, Revenue. It replaces Growth / Paid ROI / Conversion / Pipeline,
// where "Paid ROI" was a channel outcome sitting in a row of funnel outcomes,
// and it is the framework the rest of the site, the reporting and the sales
// material are meant to repeat.
//
// THE CELLS READ DOWN, NOT ACROSS. The two <div>s are COLUMNS, so the first
// holds Demand and Conversion and the second Pipeline and Revenue. Set them in
// Z-order and the framework reads Demand, Conversion, Pipeline, Revenue, which
// is not the order anything else on the site states it in.
//
// The section now carries a real eyebrow and a standfirst, both supplied by
// the brief, so the anatomy is the house one: eyebrow, h2, standfirst. That
// also settles the levels. The eyebrow is the h2 and the visual .h2 is the h3,
// as every other section on this page has it — before the brief, the title was
// the h2 and the eyebrow beneath it was an h3, which read backwards in the
// outline and was the last section still doing it.
//
// The accent moves with the heading. It keeps hanging off .sectionTitle > span
// BY CLASS rather than by position: this accent has already gone dead twice
// from structural edits, and a third would be silent.

export default function GrowthSection() {
  return (
    <Container className='main'>
      <div className='growthSection rule-cap'>
        <section>
          <div>
            <header>
              <Heading className='eyebrow' level={2}>
                Four commercial outcomes
              </Heading>

              <Heading className='h2 sectionTitle' level={3}>
                Everything we do has to move{" "}
                <span>a number that matters</span>
              </Heading>

              <Text className='lead'>
                Marketing activity is not the objective. Commercial progress
                is. We design each programme around the part of the growth
                system that needs to move.
              </Text>

              <section>
                <div>
                  <div>
                    <Heading className='h4' level={4}>
                      Demand
                    </Heading>
                    <Text className='small'>
                      Reach the right market with a proposition that earns
                      attention and creates qualified interest.
                    </Text>
                  </div>
                  <div>
                    <Heading className='h4' level={4}>
                      Conversion
                    </Heading>
                    <Text className='small'>
                      Improve the journey from first touch to enquiry,
                      opportunity and decision.
                    </Text>
                  </div>
                </div>
                <div>
                  <div>
                    <Heading className='h4' level={4}>
                      Pipeline
                    </Heading>
                    <Text className='small'>
                      Turn demand into sales-ready conversations and commercial
                      opportunities.
                    </Text>
                  </div>
                  <div>
                    <Heading className='h4' level={4}>
                      Revenue
                    </Heading>
                    <Text className='small'>
                      Connect marketing performance to commercial return and
                      optimise accordingly.
                    </Text>
                  </div>
                </div>
              </section>

              <Text className='small growthSection__closing'>
                Demand. Pipeline. Conversion. Revenue. Every channel should
                have a reason to exist.
              </Text>
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
