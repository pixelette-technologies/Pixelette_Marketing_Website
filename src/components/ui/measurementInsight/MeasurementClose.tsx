import { ServiceCloseBand } from "@/components/common";
import { measurementInsightContent } from "@/data/services/measurementInsight";

const { close } = measurementInsightContent;

const MeasurementClose = () => (
  <ServiceCloseBand
    heading={close.heading}
    lead={close.lead}
    cta={close.cta}
    headingId='mi-close-heading'
  />
);

export default MeasurementClose;
