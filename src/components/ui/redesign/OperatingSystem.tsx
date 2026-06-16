import Reveal from "./Reveal";

/**
 * OperatingSystem - the deep oxblood "brand world" moment, as a composed
 * typographic spread with restrained scroll reveals. Claims-safe.
 */

const STEPS = [
  {
    id: "01",
    name: "Strategy",
    body: "We map the growth model first. Positioning, audience and offer, and the few channels that genuinely compound for your market."
  },
  {
    id: "02",
    name: "Demand",
    body: "We build qualified demand across search, social, content and paid, composed to reach buyers who are ready to move."
  },
  {
    id: "03",
    name: "Proof",
    body: "We turn outcomes into assets. Content, authority and evidence that shorten every conversation that follows."
  },
  {
    id: "04",
    name: "Compound",
    body: "Each month feeds the next. Strategy sharpens demand, demand creates proof, and proof compounds into durable growth."
  }
];

export default function OperatingSystem() {
  return (
    <section className='pmSection pmSection--dark pmOs'>
      <div className='pmWrap'>
        <Reveal className='pmHead pmHead--center'>
          <p className='pmEyebrow'>The operating system</p>
          <h2 className='pmH2'>
            Four moves, run as one <em>compounding</em> system.
          </h2>
        </Reveal>

        <ol className='pmOs__grid'>
          {STEPS.map((s, i) => (
            <Reveal as='li' className='pmOs__item' key={s.id} delay={i * 0.08}>
              <span className='pmOs__num'>{s.id}</span>
              <h3 className='pmOs__name'>{s.name}</h3>
              <p className='pmOs__body'>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
