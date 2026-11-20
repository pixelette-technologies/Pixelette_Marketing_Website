import Image from "next/image";
import Link from "next/link";
import { influencerPartnershipsContent } from "@/data/services/influencerPartnerships";

const { close } = influencerPartnershipsContent;

const InfluencerClose = () => {
  return (
    <section className='ipClose' aria-labelledby='ip-close-heading'>
      <div className='ipClose__media' aria-hidden='true'>
        <Image
          src={close.image.src}
          alt=''
          fill
          sizes='100vw'
          className='ipClose__image'
        />
      </div>
      <div className='ipClose__shade' aria-hidden='true' />

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
