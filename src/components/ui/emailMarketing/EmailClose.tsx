import Link from "next/link";
import { emailMarketingContent } from "@/data/services/emailMarketing";

const { close } = emailMarketingContent;

const EmailClose = () => {
  return (
    <section className='emClose' aria-labelledby='em-close-heading'>
      <div className='container_main'>
        <div className='emClose__banner'>
          <div>
            <h2 id='em-close-heading' className='emClose__heading'>
              {close.heading}
            </h2>
            <p className='emClose__lead'>{close.lead}</p>
          </div>
          <Link href={close.cta.href} className='emClose__cta'>
            {close.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmailClose;
