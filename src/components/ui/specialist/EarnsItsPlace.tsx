import { Container } from "@/components/common";
import type { SpecialistItem, SpecialistSectionHead } from "@/data/services/specialist";
import Link from "next/link";
import SectionHead from "./SectionHead";

// 02 When this earns its place. Three commercial situations, before any
// service is named: the page argues for the intervention before it sells it.
//
// Three editorial columns on a top divider, pink numerals, no card fill. The
// hover (divider to pink, a 2px rise) is pointer-only and carries nothing:
// every word is already on the page. See _specialist.scss.
//
// INDUSTRIES OWNS MARKET CONTEXT. The legacy pages repeated a technology /
// SaaS / Web3 section each; the brief replaces all of it with one line and
// one link, which sits here because this is the section about fit.

interface EarnsItsPlaceProps extends SpecialistSectionHead {
  items: SpecialistItem[];
  /** The sentence before the Industries link. */
  market?: string;
}

const EarnsItsPlace = ({
  eyebrow,
  heading,
  intro,
  items,
  market = "Different markets behave differently."
}: EarnsItsPlaceProps) => (
  <Container className='main'>
    <section className='spSection spEarns' aria-labelledby='sp-earns'>
      <SectionHead id='sp-earns' eyebrow={eyebrow} heading={heading} intro={intro} />
      <ol className='spEarns__list'>
        {items.map((item, index) => (
          <li className='spEarns__item' key={item.title}>
            <span className='spEarns__index' aria-hidden='true'>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className='spEarns__title'>{item.title}</h3>
            <p className='spEarns__body'>{item.body}</p>
          </li>
        ))}
      </ol>
      <p className='spEarns__market'>
        {market}{" "}
        <Link href='/industries' className='spLink'>
          See how we approach your industry <span aria-hidden='true'>→</span>
        </Link>
      </p>
    </section>
  </Container>
);

export default EarnsItsPlace;
