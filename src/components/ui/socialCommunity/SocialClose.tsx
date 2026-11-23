import Link from "next/link";
import { socialCommunityContent } from "@/data/services/socialCommunity";

const { close } = socialCommunityContent;

const SocialClose = () => {
  return (
    <section className='scClose' aria-labelledby='sc-close-heading'>
      <div className='container_main scClose__inner'>
        <div className='scClose__copy'>
          <h2 id='sc-close-heading' className='scClose__heading'>
            {close.heading}
          </h2>
          <p className='scClose__lead'>{close.lead}</p>
        </div>
        <Link href={close.cta.href} className='scClose__cta'>
          {close.cta.label}
          <span aria-hidden='true'> →</span>
        </Link>
      </div>
    </section>
  );
};

export default SocialClose;
