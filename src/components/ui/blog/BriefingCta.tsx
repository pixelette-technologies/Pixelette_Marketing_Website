import Link from "next/link";
import { Container } from "@/components/common";
import { briefing } from "@/data/insights/insights";

// /blog-list, 06 The Pixelette briefing. 30 Sep 2026, to the final Insights
// brief. The page ends on the weekly cadence rather than on more cards.
//
// A PLACEHOLDER CTA, NOT A FORM. No newsletter list, provider or endpoint
// exists, and the brief bars building one, so the button goes to the contact
// form and the note under it says so. When a sign-up exists, the button's
// href is the only thing to change.

export default function BriefingCta() {
  return (
    <div className='sec ixBriefBand'>
      <Container className='main'>
        <section className='ixBrief' aria-labelledby='ix-brief'>
          <p className='ixBrief__label'>{briefing.label}</p>
          <h2 className='ixBrief__headline' id='ix-brief'>
            {briefing.headline}
          </h2>
          <p className='ixBrief__copy'>{briefing.copy}</p>
          <Link href={briefing.cta.href} className='ixBrief__cta'>
            {briefing.cta.label}
            <span aria-hidden='true'>→</span>
          </Link>
          <p className='ixBrief__note'>{briefing.note}</p>
        </section>
      </Container>
    </div>
  );
}
