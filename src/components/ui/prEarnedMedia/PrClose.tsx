import { ServiceCloseBand } from "@/components/common";
import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";

const { close } = prEarnedMediaContent;

const PrClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='pr-close-heading'
  />
);

export default PrClose;
