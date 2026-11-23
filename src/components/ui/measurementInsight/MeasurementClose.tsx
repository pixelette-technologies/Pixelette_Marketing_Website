import Link from "next/link";
import { measurementInsightContent } from "@/data/services/measurementInsight";

const { close } = measurementInsightContent;

const MeasurementClose = () => {
  return (
    <section className='miClose' aria-labelledby='mi-close-heading'>
      <div className='container_main'>
        <p className='miEyebrow'>{close.eyebrow}</p>
        <h2 id='mi-close-heading' className='miTitle'>
          {close.heading}
        </h2>
        <p className='miClose__lead'>{close.lead}</p>
        <Link href={close.cta.href} className='miCta'>
          {close.cta.label}
          <span aria-hidden='true'> →</span>
        </Link>
      </div>
    </section>
  );
};

export default MeasurementClose;
