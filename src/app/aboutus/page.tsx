import { QuestionAndAnswer, TrustedBrands } from "@/components/common";
import {
  AboutUsHero,
  OurServices,
  OurTeam,
  OurValues,
  WhoWeAre
} from "@/components/ui/aboutUs";

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
