import Image from "next/image";
import { socialCommunityContent } from "@/data/services/socialCommunity";

const { hero } = socialCommunityContent;
const { campaign } = hero;

const CommentPanel = () => (
  <aside className='scHero__comments' aria-label='Illustrative community responses'>
    <ul className='scHero__commentList'>
      {campaign.responses.map((item) => (
        <li className='scHero__comment' key={item.initial}>
          <span
            className={`scHero__avatar scHero__avatar--${item.initial.toLowerCase()}`}
            aria-hidden='true'
          >
            {item.initial}
          </span>
          <div className='scHero__commentBody'>
            <span className='scHero__commentName'>{item.name}</span>
            <p className='scHero__commentText'>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
    <p className='scHero__disclaimer'>{campaign.disclaimer}</p>
  </aside>
);

const SocialHero = () => {
  return (
    <section className='scHero' aria-labelledby='sc-hero-heading'>
      <div className='container_main scHero__inner'>
        <div className='scHero__copy'>
          <p className='scHero__breadcrumb'>{hero.breadcrumb}</p>
          <h1 id='sc-hero-heading' className='scHero__heading'>
            {hero.headingLead} <em>{hero.headingEmphasis}</em>
          </h1>
          <p className='scHero__lead'>{hero.lead}</p>
        </div>

        <div className='scHero__visual'>
          <div className='scHero__frame'>
            <div className='scHero__media'>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes='(max-width: 900px) 100vw, 58vw'
                className='scHero__image'
              />
            </div>

            <div className='scHero__campaign'>
              <p className='scHero__campaignEyebrow'>{campaign.eyebrow}</p>
              <p className='scHero__campaignQuestion'>{campaign.question}</p>
              <p className='scHero__campaignLocation'>{campaign.location}</p>
            </div>
          </div>

          <CommentPanel />
          <div className='scHero__swoop' aria-hidden='true' />
        </div>
      </div>
    </section>
  );
};

export default SocialHero;
