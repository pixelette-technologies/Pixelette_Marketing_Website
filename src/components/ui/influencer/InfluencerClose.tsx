import Link from "next/link";
import { influencerPartnershipsContent } from "@/data/services/influencerPartnerships";

const { close } = influencerPartnershipsContent;

// One continuous band: camera photo as CSS background on the right, HTML
// heading + CTA on a solid left wash. No grid seam; mock CTA never under HTML.

const InfluencerClose = () => {
  return (
    <section
      className='ipClose'
      aria-labelledby='ip-close-heading'
      style={{ backgroundImage: `url(${close.image.src})` }}
    >
      <div className='ipClose__wash' aria-hidden='true' />
      <div className='container_main ipClose__inner'>
        <h2 id='ip-close-heading' className='ipClose__heading'>
          <span className='ipClose__headingLead'>{close.headingLead}</span>{" "}
          <span className='ipClose__headingAccent'>{close.headingAccent}</span>
        </h2>

        <Link href={close.cta.href} className='ipClose__cta'>
          {close.cta.label}
          <span aria-hidden='true'> →</span>
        </Link>
      </div>
    </section>
  );
};

export default InfluencerClose;
