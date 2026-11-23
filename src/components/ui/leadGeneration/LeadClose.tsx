import Link from "next/link";
import { leadGenerationContent } from "@/data/services/leadGeneration";

const { close } = leadGenerationContent;

const LeadClose = () => {
  return (
    <section className='lgClose' aria-labelledby='lg-close-heading'>
      <div className='container_main lgClose__row'>
        <div className='lgClose__copy'>
          <h2 id='lg-close-heading' className='lgTitle'>
            {close.heading}
          </h2>
          <p className='lgClose__lead'>{close.lead}</p>
        </div>
        <Link href={close.cta.href} className='lgCta'>
          {close.cta.label}
          <span aria-hidden='true'> →</span>
        </Link>
      </div>
    </section>
  );
};

export default LeadClose;
