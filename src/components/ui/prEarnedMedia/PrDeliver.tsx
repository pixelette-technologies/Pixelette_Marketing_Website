import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";

const { deliver } = prEarnedMediaContent;

const PrDeliver = () => {
  return (
    <section className='prDeliver' aria-labelledby='pr-deliver-heading'>
      <div className='container_main'>
        <h2 id='pr-deliver-heading' className='prSectionTitle'>
          {deliver.heading}
        </h2>
        <ul className='prDeliver__grid'>
          {deliver.items.map(item => (
            <li className='prDeliver__item' key={item.title}>
              <h3 className='prDeliver__title'>{item.title}</h3>
              <p className='prDeliver__body'>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PrDeliver;
