import { ServiceCloseBand } from "@/components/common";
import { influencerPartnershipsContent } from "@/data/services/influencerPartnerships";

const { close } = influencerPartnershipsContent;

const InfluencerClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    cta={close.cta}
    headingId='ip-close-heading'
  />
);

export default InfluencerClose;
