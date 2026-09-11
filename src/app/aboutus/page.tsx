import { QuestionAndAnswer, TrustedBrands } from "@/components/common";
import { proofCopy } from "@/data/home";
import {
  AboutUsHero,
  OurServices,
  OurTeam,
  OurValues,
  WhoWeAre
} from "@/components/ui/aboutUs";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About Us | Your Digital Marketing Partners',
  description: 'At Pixelette Marketing, we’re more than a team. We’re your digital marketing solutions partner on the path from 0 to 1. Let’s build something big.',
  keywords: ['digital marketing solutions', 'digital marketing agency'],
  alternates: {
    canonical: 'https://www.pixelettemarketing.com/aboutus',
  },
  openGraph: {
    title: 'About Us | Your Digital Marketing Partners',
    description: 'At Pixelette Marketing, we’re more than a team. We’re your digital marketing solutions partner on the path from 0 to 1. Let’s build something big.',
  },
}

export default function AboutUs() {
  return (
    <>
      <AboutUsHero />
      <WhoWeAre />
      <OurValues />
      <OurServices />
      {/* Authored team -> clients -> close, and it stays that way. The close
          is lifted between the other two VISUALLY, by `order` in
          _aboutClose.scss, so three dark bands stop stacking without any
          content being reordered. */}
      <div className='aboutClose' data-reveal='group'>
        <OurTeam />
        {/* 11 Sep 2026. This was `topHeading heading='Our clients'` — the
            inline layout with its eyebrow suppressed, which made it the third
            different claim about the same six logos: "Our clients" here,
            "Trusted by / Leading Brands" on the eight service pages, and the
            brief's sentence on the home page.

            It takes the home page's treatment now, reading proofCopy rather
            than restating it, so there is ONE definition of what this row of
            logos is claimed to be. "Our clients" was also the strongest of the
            three claims and the least accurate: the set includes portfolio
            ventures, which is exactly what "brands and ventures" exists to say.

            NO `cta`, deliberately, and this is not an oversight. The order
            shuffle in _aboutClose.scss is only safe because OurTeam and
            TrustedBrands contain no focusable elements — its own comment says
            so and says it would not be safe if the strip ever became links.
            The strip renders visually AFTER the close but sits BEFORE it in
            the DOM, so a CTA here would be reached by keyboard before a link
            the user can already see above it. The home page has no such
            shuffle and keeps its CTA. */}
        <TrustedBrands
          layout='stacked'
          eyebrow={proofCopy.eyebrow}
          heading={proofCopy.heading}
          standfirst={proofCopy.standfirst}
        />
        <QuestionAndAnswer
          subheading={true}
          heading={"We turn ideas into measurable wins"}
          text={
            "Pixelette Marketing teams up with brands like yours – bold, ambitious and ready to shape the future. Together, we create campaigns that deliver results you can see and success you can feel."
          }
        />
      </div>
    </>
  );
}
