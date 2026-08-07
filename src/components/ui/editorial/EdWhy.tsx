import Reveal from "./Reveal";

/**
 * EdWhy - differentiation. Why a retained partner over a panel of vendors.
 * Claims-safe: positioning and capability only (measurement line maps to the
 * real analytics capability, no figures).
 */

const POINTS = [
  {
    name: "One senior team",
    body: "You work with the people doing the work, not an account manager relaying briefs to juniors you never meet."
  },
  {
    name: "Every lever, together",
    body: "Strategy, demand and proof run as one plan, so channels reinforce each other instead of competing for budget."
  },
  {
    name: "Honest about fit",
    body: "If we are not the right partner for where you are headed, we will tell you on the first call, not three months in."
  },
  {
    name: "Measurement you can trust",
    body: "Transparent reporting across Web2 and Web3, with blockchain-backed metrics where they make the numbers verifiable."
  }
];

export default function EdWhy() {
  return (
    <section className="edSection edSection--deep edWhy">
      <div className="edWrap">
        <Reveal className="edHead">
          <p className="edEyebrow">Why Pixelette</p>
          <h2 className="edHead__title">
            A partner, not a panel of <em>vendors.</em>
          </h2>
        </Reveal>

        <div className="edWhy__grid">
          {POINTS.map((p) => (
            <Reveal as="div" className="edWhy__item" key={p.name}>
              <span className="edWhy__mark" aria-hidden="true">
                &#9670;
              </span>
              <div>
                <h3 className="edWhy__name">{p.name}</h3>
                <p className="edWhy__body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
