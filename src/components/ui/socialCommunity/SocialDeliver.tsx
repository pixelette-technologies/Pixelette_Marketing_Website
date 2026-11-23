import { socialCommunityContent } from "@/data/services/socialCommunity";
import SocialIcon from "./SocialIcons";

const { deliver } = socialCommunityContent;

const SocialDeliver = () => {
  return (
    <section className='scDeliver' aria-labelledby='sc-deliver-heading'>
      <div className='container_main'>
        <h2 id='sc-deliver-heading' className='scDeliver__heading'>
          {deliver.heading}
        </h2>
        <ul className='scDeliver__grid'>
          {deliver.items.map((item) => (
            <li className='scDeliver__item' key={item.title}>
              <span className='scDeliver__icon' aria-hidden='true'>
                <SocialIcon name={item.icon} />
              </span>
              <h3 className='scDeliver__title'>{item.title}</h3>
              <p className='scDeliver__body'>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SocialDeliver;
