import { ServiceCloseBand } from "@/components/common";
import { paidMediaContent } from "@/data/services/paidMedia";

const { close } = paidMediaContent;

const PaidMediaClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='ppc-close-heading'
  />
);

export default PaidMediaClose;
