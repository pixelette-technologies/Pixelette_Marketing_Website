import Reveal from "./Reveal";

/**
 * EdApproach - the method as a dark editorial spread (magazine contrast).
 * The four-move operating model in pure type, no device. Claims-safe.
 */

const STEPS = [
  {
    n: "01",
    name: "Strategy",
    body: "We map the growth model first. Positioning, audience and offer, and the few channels that genuinely compound for your market."
  },
  {
    n: "02",
    name: "Demand",
    body: "We build qualified demand across search, social, content and paid, composed to reach buyers who are ready to move."
  },
  {
    n: "03",
    name: "Proof",
    body: "We turn outcomes into assets. Content, authority and evidence that shorten every conversation that follows."
  },
  {
    n: "04",
    name: "Compound",
    body: "Each month feeds the next. Strategy sharpens demand, demand creates proof, and proof compounds into durable growth."
  }
];

export default function EdApproach() {
  return (
    <section className="edSection edSection--ink edApproach" id="approach">
      <div className="edWrap">
        <Reveal>
          <p className="edEyebrow">How we work</p>
          <h2 className="edApproach__title">
            Four moves, run as one <em>compounding</em> system.
          </h2>
        </Reveal>

        <div className="edApproach__grid">
          {STEPS.map((s) => (
            <Reveal as="div" className="edApproach__step" key={s.n}>
              <span className="edApproach__num">{s.n}</span>
              <h3 className="edApproach__name">{s.name}</h3>
              <p className="edApproach__body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
