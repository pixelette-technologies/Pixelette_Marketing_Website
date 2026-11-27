import { ServiceCloseBand } from "@/components/common";
import { socialCommunityContent } from "@/data/services/socialCommunity";

const { close } = socialCommunityContent;

const SocialClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='sc-close-heading'
  />
);

export default SocialClose;
