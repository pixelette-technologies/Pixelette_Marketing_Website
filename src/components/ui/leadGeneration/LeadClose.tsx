import { ServiceCloseBand } from "@/components/common";
import { leadGenerationContent } from "@/data/services/leadGeneration";

const { close } = leadGenerationContent;

const LeadClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='lg-close-heading'
  />
);

export default LeadClose;
