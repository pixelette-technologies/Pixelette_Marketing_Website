import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import GrowthSystem from "./GrowthSystem";

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
//
// --- 22 Sep 2026 ------------------------------------------------------------
// The four outcomes and the figure beside them are one component now, because
// they share a selection: hovering an outcome lights its station on the ring,
// and selecting a station lights the outcome. Two components cannot do that
// without lifting the state to a parent, and this parent would then be a client
// component for no other reason.
//
// SO THE HEADING BLOCK IS PASSED AS CHILDREN. The eyebrow, the title and the
// standfirst have no state and no business shipping as client JavaScript; they
// render here, on the server, and GrowthSystem places them. That is the whole
// reason this file still exists.
//
// The closing line moved into GrowthSystem and lost its first sentence. It read
// "Demand. Pipeline. Conversion. Revenue. Every channel should have a reason to
// exist." — the first half restated the framework's order because the 2x2 grid
// above it could not, reading down its columns rather than across. The
// outcomes are a numbered list now and state their own order, so that sentence
// was answering a question nothing asks any more. The second half is the
// argument and it stays.

export default function GrowthSection() {
  return (
    <Container className='main'>
      <div className='growthSection rule-cap'>
        <section>
          <GrowthSystem>
            <Heading className='eyebrow' level={2}>
              Four commercial outcomes
            </Heading>

            <Heading className='h2 sectionTitle' level={3}>
              Everything we do has to move <span>a number that matters</span>
            </Heading>

            <Text className='lead'>
              Marketing activity is not the objective. Commercial progress is.
              We design each programme around the part of the growth system
              that needs to move.
            </Text>
          </GrowthSystem>
        </section>
      </div>
    </Container>
  );
}
