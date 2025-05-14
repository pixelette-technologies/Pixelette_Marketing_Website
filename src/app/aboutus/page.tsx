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
}

export default function AboutUs() {
  return (
    <>
      <AboutUsHero />
      <WhoWeAre />
      <OurValues />
      <OurServices />
      <OurTeam />
      <div style={{ marginTop: "-1.2rem" }}>
        <TrustedBrands topHeading={true} heading='Our clients' />
      </div>
      <QuestionAndAnswer
        subheading={true}
        heading={"We turn ideas into measurable wins"}
        text={
          "Pixelette Marketing teams up with brands like yours – bold, ambitious and ready to shape the future. Together, we create campaigns that deliver results you can see and success you can feel."
        }
      />
    </>
  );
}
