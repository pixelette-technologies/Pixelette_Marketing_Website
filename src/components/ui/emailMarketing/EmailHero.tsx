import { emailMarketingContent } from "@/data/services/emailMarketing";
import EmailPreview from "./EmailPreview";

const { hero } = emailMarketingContent;

const EmailHero = () => {
  return (
    <section className='emHero' aria-labelledby='em-hero-heading'>
      <div className='container_main'>
        <div className='emHero__inner'>
          <div className='emHero__copy'>
            <p className='emHero__eyebrow'>{hero.eyebrow}</p>
            <h1 id='em-hero-heading' className='emHero__heading'>
              {hero.headingLead}{" "}
              <em>{hero.headingEmphasis}</em>
            </h1>
            <p className='emHero__lead'>{hero.lead}</p>
          </div>
          <EmailPreview />
        </div>
      </div>
    </section>
  );
};

export default EmailHero;
