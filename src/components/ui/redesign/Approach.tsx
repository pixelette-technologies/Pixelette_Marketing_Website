import Reveal from "./Reveal";

/**
 * Approach - large editorial statement on the retained model with restrained
 * reveals. Our own positioning statement, not an attributed testimonial.
 * Claims-safe.
 */

const PILLARS = [
  {
    k: "Senior team, one roadmap",
    v: "You work with operators, not account managers reading a script. One roadmap, owned end to end."
  },
  {
    k: "Compounding, not campaigns",
    v: "We optimise for momentum that builds, not one-off spikes that fade the moment the budget stops."
  },
  {
    k: "Proof you own",
    v: "Every engagement leaves you with assets, content and positioning that keep working long after."
  }
];

export default function Approach() {
  return (
    <section className='pmSection pmSection--light pmApproach'>
      <div className='pmWrap'>
        <Reveal>
          <p className='pmEyebrow pmEyebrow--crim'>Why retained</p>
          <p className='pmApproach__quote'>
            Project work buys you motion. A retained partner builds{" "}
            <em>momentum.</em>
          </p>
        </Reveal>

        <ul className='pmApproach__cols'>
          {PILLARS.map((p, i) => (
            <Reveal as='li' className='pmApproach__col' key={p.k} delay={i * 0.08}>
              <h3>{p.k}</h3>
              <p>{p.v}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
