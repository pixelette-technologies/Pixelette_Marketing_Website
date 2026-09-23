import { Container } from "@/components/common";
import GrowthSystem from "./GrowthSystem";

// The section's frame, and nothing else. The hairline it opens on, its rhythm
// and the `.rule-cap` signature live on the wrapper in _growthSection.scss;
// everything inside is GrowthSystem's.
//
// --- 8 Sep 2026 brief -------------------------------------------------------
// The four cells are the brief's commercial framework: Demand, Pipeline,
// Conversion, Revenue. It replaced Growth / Paid ROI / Conversion / Pipeline,
// where "Paid ROI" was a channel outcome sitting in a row of funnel outcomes,
// and it is the framework the rest of the site, the reporting and the sales
// material are meant to repeat.
//
// The brief also supplied a real eyebrow and a standfirst, so the anatomy is
// the house one: eyebrow, h2, standfirst. That settles the levels too — the
// eyebrow is the h2 and the visual .h2 is the h3, as every other section on
// this page has it. Before the brief, the title was the h2 and the eyebrow
// beneath it was an h3, which read backwards in the outline and was the last
// section still doing it.
//
// --- 23 Sep 2026 ------------------------------------------------------------
// THE HEADING BLOCK MOVED INTO GrowthSystem. It was rendered here and passed
// down as children for one reason: GrowthSystem was a client component for its
// tablist, and the eyebrow, title and standfirst had no business shipping as
// client JavaScript. The figure was rebuilt to a supplied reference that puts
// every word on screen at once, so there is no state, no tablist and no client
// boundary — and therefore nothing left for the children contrivance to buy.
//
// What stays here is what belongs to the SECTION rather than to the figure
// inside it, which is the split that has now survived five different figures.

export default function GrowthSection() {
  return (
    <Container className='main'>
      <div className='growthSection rule-cap'>
        <section>
          <GrowthSystem />
        </section>
      </div>
    </Container>
  );
}
