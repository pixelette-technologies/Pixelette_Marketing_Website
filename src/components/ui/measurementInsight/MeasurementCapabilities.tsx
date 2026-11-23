import { measurementInsightContent } from "@/data/services/measurementInsight";

const { capabilities } = measurementInsightContent;

const MeasurementCapabilities = () => {
  return (
    <section className='miCaps' aria-labelledby='mi-caps-heading'>
      <div className='container_main'>
        <p className='miEyebrow'>{capabilities.eyebrow}</p>
        <h2 id='mi-caps-heading' className='miTitle'>
          {capabilities.heading}
        </h2>
        <ul className='miCaps__grid'>
          {capabilities.items.map(item => (
            <li className='miCaps__item' key={item.title}>
              <h3 className='miCaps__title'>{item.title}</h3>
              <p className='miCaps__body'>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MeasurementCapabilities;
