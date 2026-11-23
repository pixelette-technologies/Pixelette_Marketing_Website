import Link from "next/link";
import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";

const { close } = prEarnedMediaContent;

const PrClose = () => {
  return (
    <section className='prClose' aria-labelledby='pr-close-heading'>
      <div className='container_main'>
        <div className='prClose__banner'>
          <div className='prClose__copy'>
            <h2 id='pr-close-heading' className='prClose__heading'>
              {close.heading}
            </h2>
            <p className='prClose__lead'>{close.lead}</p>
          </div>
          <Link href={close.cta.href} className='prClose__cta'>
            {close.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrClose;
