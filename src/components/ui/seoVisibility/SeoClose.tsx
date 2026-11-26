import { ServiceCloseBand } from "@/components/common";
import { seoVisibilityContent } from "@/data/services/seoVisibility";

const { close } = seoVisibilityContent;

const SeoClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='seo-close-heading'
  />
);

export default SeoClose;
