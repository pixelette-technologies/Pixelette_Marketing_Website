import { socialCommunityContent } from "@/data/services/socialCommunity";
import SocialIcon from "./SocialIcons";

const { measure } = socialCommunityContent;

const SocialMeasure = () => {
  return (
    <section className='scMeasure' aria-labelledby='sc-measure-heading'>
      <div className='container_main'>
        <header className='scMeasure__head'>
          <h2 id='sc-measure-heading' className='scMeasure__heading'>
            {measure.heading}
          </h2>
          <p className='scMeasure__lead'>{measure.lead}</p>
        </header>
        <ul className='scMeasure__grid'>
          {measure.items.map((item) => (
            <li className='scMeasure__item' key={item.label}>
              <span className='scMeasure__icon' aria-hidden='true'>
                <SocialIcon name={item.icon} />
              </span>
              <span className='scMeasure__label'>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SocialMeasure;
