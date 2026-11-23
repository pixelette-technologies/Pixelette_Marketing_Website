import { paidMediaContent } from "@/data/services/paidMedia";

const { deliver } = paidMediaContent;

const PaidMediaDeliver = () => {
  return (
    <section className='ppcDeliver' aria-labelledby='ppc-deliver-heading'>
      <div className='container_main'>
        <div className='ppcDeliver__intro'>
          <h2 id='ppc-deliver-heading' className='ppcTitle'>
            {deliver.heading}
          </h2>
          <p className='ppcDeliver__caption'>{deliver.caption}</p>
        </div>
        <ol className='ppcDeliver__grid'>
          {deliver.items.map(item => (
            <li className='ppcDeliver__item' key={item.index}>
              <span className='ppcDeliver__index'>{item.index}</span>
              <h3 className='ppcDeliver__title'>{item.title}</h3>
              <p className='ppcDeliver__body'>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PaidMediaDeliver;
