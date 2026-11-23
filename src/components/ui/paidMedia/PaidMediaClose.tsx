import Link from "next/link";
import { paidMediaContent } from "@/data/services/paidMedia";

const { close } = paidMediaContent;

const PaidMediaClose = () => {
  return (
    <section className='ppcClose' aria-labelledby='ppc-close-heading'>
      <div className='container_main ppcClose__row'>
        <div className='ppcClose__copy'>
          <h2 id='ppc-close-heading' className='ppcTitle'>
            {close.heading}
          </h2>
          <p className='ppcClose__lead'>{close.lead}</p>
        </div>
        <Link href={close.cta.href} className='ppcCta ppcCta--plum'>
          {close.cta.label}
          <span aria-hidden='true'> →</span>
        </Link>
      </div>
    </section>
  );
};

export default PaidMediaClose;
