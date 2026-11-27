import { ServiceCloseBand } from "@/components/common";
import { aboutClose } from "@/data/aboutus";

const AboutClose = () => {
  const { heading, lead, cta } = aboutClose;

  return (
    <div className='aboutCloseWrap'>
      <ServiceCloseBand
        headingId='about-close-heading'
        heading={heading}
        lead={lead}
        cta={{ label: cta.label, href: cta.to }}
      />
    </div>
  );
};

export default AboutClose;
