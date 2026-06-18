import Link from "next/link";

/**
 * EdHero - type-led editorial hero (Direction A). Content visible by default;
 * the entrance is pure CSS. Claims-safe: proposition + capability tags only,
 * no metrics, clients, logos or testimonials.
 */
export default function EdHero() {
  return (
    <section className="edHero">
      <div className="edWrap edHero__inner">
        <p className="edEyebrow edRise edRise--1">Premium retained growth partner</p>

        <h1 className="edHero__title edRise edRise--2">
          Marketing that <em>compounds.</em>
        </h1>

        <p className="edHero__lead edRise edRise--3">
          A retained growth partner for ambitious technology, commerce and Web3
          brands. One senior team running strategy, demand and proof as a single
          system, so momentum builds instead of resetting every quarter.
        </p>

        <div className="edActions edHero__actions edRise edRise--4">
          <Link href="#contact" className="edBtn edBtn--primary">
            Book a growth call
          </Link>
          <Link href="#approach" className="edBtn edBtn--ghost">
            See how we work <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>

        <div className="edHero__meta edRise edRise--5">
          <span>The marketing arm of Pixelette Group</span>
          <i aria-hidden="true" />
          <span>Strategy, demand and proof</span>
          <i aria-hidden="true" />
          <span>Retained, senior, accountable</span>
        </div>
      </div>
    </section>
  );
}
