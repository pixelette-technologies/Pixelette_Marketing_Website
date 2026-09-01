import { QuestionAndAnswer, TrustedBrands } from "@/components/common";
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
      <div className='aboutClose'>
        <OurTeam />
        <TrustedBrands topHeading={true} heading='Our clients' />
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
