import { CloseWaveBand } from "@/components/common";
import { aboutClose } from "@/data/aboutus";

// Same wave close band as Social Value / Accessibility. Copy stays local.

const AboutClose = () => {
  const { heading, lead, cta } = aboutClose;

  return (
    <CloseWaveBand
      headingId='about-close-heading'
      heading={heading}
      copy={lead}
      cta={{ label: cta.label, href: cta.to }}
    />
  );
};

export default AboutClose;
