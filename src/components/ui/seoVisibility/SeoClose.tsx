import Link from "next/link";
import { seoVisibilityContent } from "@/data/services/seoVisibility";

const { close } = seoVisibilityContent;

const SeoClose = () => {
  return (
    <section className='seoClose' aria-labelledby='seo-close-heading'>
      <div className='container_main'>
        <div className='seoClose__banner'>
          <div className='seoClose__copy'>
            <h2 id='seo-close-heading' className='seoClose__heading'>
              {close.heading}
            </h2>
            <p className='seoClose__lead'>{close.lead}</p>
          </div>
          <Link href={close.cta.href} className='seoCta seoCta--onTint'>
            {close.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeoClose;
