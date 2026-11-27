import { leadGenerationContent } from "@/data/services/leadGeneration";

const { offer } = leadGenerationContent;

const LeadOffer = () => {
  return (
    <section className='lgOffer' aria-labelledby='lg-offer-heading'>
      <div className='container_main'>
        <div className='lgOffer__grid'>
          <div className='lgOffer__intro'>
            <p className='lgOffer__label'>{offer.label}</p>
            <h2 id='lg-offer-heading' className='lgTitle'>
              {offer.heading}
            </h2>
            <p className='lgOffer__lead'>{offer.intro}</p>
          </div>
          <ul className='lgCaps'>
            {offer.items.map(item => (
              <li className='lgCaps__item' key={item.title}>
                <h3 className='lgCaps__title'>{item.title}</h3>
                <p className='lgCaps__body'>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className='lgMeasure'>
          {offer.measureLead} <em>{offer.measureEmphasis}</em>
        </p>
      </div>
    </section>
  );
};

export default LeadOffer;
