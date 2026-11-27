import { ServiceCloseBand } from "@/components/common";
import { emailMarketingContent } from "@/data/services/emailMarketing";

const { close } = emailMarketingContent;

const EmailClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='em-close-heading'
  />
);

export default EmailClose;
