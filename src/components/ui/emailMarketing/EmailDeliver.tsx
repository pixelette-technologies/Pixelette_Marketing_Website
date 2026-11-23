import { emailMarketingContent } from "@/data/services/emailMarketing";

const { deliver, measure } = emailMarketingContent;

const EmailDeliver = () => {
  return (
    <section className='emDeliver' aria-labelledby='em-deliver-heading'>
      <div className='container_main'>
        <h2 id='em-deliver-heading' className='emSectionTitle'>
          {deliver.heading}
        </h2>
        <ol className='emDeliver__grid'>
          {deliver.items.map(item => (
            <li className='emDeliver__item' key={item.number}>
              <span className='emDeliver__number'>{item.number}</span>
              <div>
                <h3 className='emDeliver__title'>{item.title}</h3>
                <p className='emDeliver__body'>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className='emMeasure'>
          <p className='emMeasure__label'>{measure.label}</p>
          <ul className='emMeasure__items'>
            {measure.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EmailDeliver;
