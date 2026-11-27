import Image from "next/image";
import { socialCommunityContent } from "@/data/services/socialCommunity";
import SocialIcon from "./SocialIcons";

const { community } = socialCommunityContent;

const SocialCommunityBand = () => {
  return (
    <section className='scCommunity' aria-labelledby='sc-community-heading'>
      <div className='container_main scCommunity__inner'>
        <div className='scCommunity__copy'>
          <h2 id='sc-community-heading' className='scCommunity__heading'>
            {community.heading}
          </h2>
          <p className='scCommunity__lead'>{community.lead}</p>
          <ul className='scCommunity__points'>
            {community.points.map((point) => (
              <li className='scCommunity__point' key={point}>
                <span className='scCommunity__check' aria-hidden='true'>
                  <SocialIcon name='check' />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='scCommunity__showcase' aria-hidden='false'>
          <figure className='scCommunity__primary'>
            <Image
              src={community.showcase.primary.src}
              alt={community.showcase.primary.alt}
              fill
              sizes='(max-width: 900px) 100vw, 42vw'
              className='scCommunity__primaryImage'
            />
            <figcaption className='scCommunity__caption'>
              <span className='scCommunity__captionLead'>
                {community.showcase.captionLead}
              </span>
              {community.showcase.captionRest}
            </figcaption>
          </figure>

          <figure className='scCommunity__reels'>
            <Image
              src={community.showcase.reels.src}
              alt={community.showcase.reels.alt}
              fill
              sizes='(max-width: 900px) 42vw, 180px'
              className='scCommunity__reelsImage'
            />
            <span className='scCommunity__reelMark' aria-hidden='true'>
              <SocialIcon name='reel' />
            </span>
            <span className='scCommunity__play' aria-hidden='true'>
              <SocialIcon name='play' />
            </span>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default SocialCommunityBand;
