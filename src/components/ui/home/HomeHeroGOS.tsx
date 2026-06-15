import Link from "next/link";

/**
 * HomeHeroGOS - art-directed editorial hero.
 *
 * Content is VISIBLE BY DEFAULT (server-rendered, no JS dependency). The
 * entrance is a pure-CSS enhancement (line-mask + staggered rise) that is
 * disabled under prefers-reduced-motion. This replaces the earlier
 * framer-motion choreography, which SSR'd content at opacity:0 and left the
 * hero BLANK for reduced-motion users and anyone whose JS did not run.
 * Claims-safe: only the approved group line.
 */

const INDEX = [
  { n: "01", k: "Strategy" },
  { n: "02", k: "Demand" },
  { n: "03", k: "Proof" },
  { n: "04", k: "Compound" }
];

export default function HomeHeroGOS() {
  return (
    <section className="pmHero">
      <div className="pmHero__inner pmHero__inner--anim">
        <div className="pmHero__meta">
          <span>Pixelette Marketing</span>
          <span>Retained growth partner</span>
        </div>

        <p className="pmHero__eyebrow">Premium retained growth</p>

        <h1 className="pmHero__title">
          <span className="pmHero__line">
            <span className="pmHero__line-in">Growth, engineered</span>
          </span>
          <span className="pmHero__line">
            <span className="pmHero__line-in">
              to <em>compound.</em>
            </span>
          </span>
        </h1>

        <p className="pmHero__lead">
          A retained growth partner for ambitious technology, commerce and Web3
          brands. Strategy, demand and proof, run as one quiet, compounding
          system.
        </p>

        <div className="pmHero__actions">
          <Link href="/contactus" className="pmBtn pmBtn--magnetic">
            Book a growth strategy call
          </Link>
          <Link href="/services" className="pmBtn pmBtn--ghost">
            See how we operate
          </Link>
        </div>

        <ol className="pmHero__index">
          {INDEX.map((i) => (
            <li key={i.n}>
              <span className="pmHero__index-n">{i.n}</span>
              <span className="pmHero__index-k">{i.k}</span>
            </li>
          ))}
        </ol>
      </div>

      <span className="pmHero__sidelabel" aria-hidden="true">
        The marketing arm of Pixelette Group
      </span>
    </section>
  );
}
