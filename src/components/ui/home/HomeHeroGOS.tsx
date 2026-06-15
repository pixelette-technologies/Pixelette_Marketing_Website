"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * HomeHeroGOS - art-directed editorial hero with a restrained entrance
 * choreography: the headline rises line-by-line behind a mask, the supporting
 * elements stagger in on a slow expo-out ease. Reduced-motion renders static.
 * Claims-safe: only the approved group line.
 */

const INDEX = [
  { n: "01", k: "Strategy" },
  { n: "02", k: "Demand" },
  { n: "03", k: "Proof" },
  { n: "04", k: "Compound" }
];

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }
};
const line: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } }
};

export default function HomeHeroGOS() {
  const reduce = useReducedMotion();
  const animate = reduce ? undefined : "show";
  const initial = reduce ? undefined : "hidden";

  return (
    <section className='pmHero'>
      <motion.div
        className='pmHero__inner'
        variants={container}
        initial={initial}
        animate={animate}
      >
        <motion.div className='pmHero__meta' variants={rise}>
          <span>Pixelette Marketing</span>
          <span>Retained growth partner</span>
        </motion.div>

        <motion.p className='pmHero__eyebrow' variants={rise}>
          Premium retained growth
        </motion.p>

        <h1 className='pmHero__title'>
          <span className='pmHero__line'>
            <motion.span className='pmHero__line-in' variants={line}>
              Growth, engineered
            </motion.span>
          </span>
          <span className='pmHero__line'>
            <motion.span className='pmHero__line-in' variants={line}>
              to <em>compound.</em>
            </motion.span>
          </span>
        </h1>

        <motion.p className='pmHero__lead' variants={rise}>
          A retained growth partner for ambitious technology, commerce and Web3
          brands. Strategy, demand and proof, run as one quiet, compounding
          system.
        </motion.p>

        <motion.div className='pmHero__actions' variants={rise}>
          <Link href='/contactus' className='pmBtn pmBtn--magnetic'>
            Book a growth strategy call
          </Link>
          <Link href='/services' className='pmBtn pmBtn--ghost'>
            See how we operate
          </Link>
        </motion.div>

        <motion.ol className='pmHero__index' variants={rise}>
          {INDEX.map((i) => (
            <li key={i.n}>
              <span className='pmHero__index-n'>{i.n}</span>
              <span className='pmHero__index-k'>{i.k}</span>
            </li>
          ))}
        </motion.ol>
      </motion.div>

      <span className='pmHero__sidelabel' aria-hidden='true'>
        The marketing arm of Pixelette Group
      </span>
    </section>
  );
}
