import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { ArrowEast } from "@/assets/sectors";
import { whoWeHelpData, type SplitHeading } from "@/data/home";
import Link from "next/link";
import type { CSSProperties } from "react";

// D4. This section used to be pulled 481px up the page with a negative margin
// so it would sit inside the 750px of empty panel EngagementStalls was holding
// open, and a decorative WhiteBackground SVG was absolutely positioned over
// the join to hide the seam — itself nudged with a second negative margin and
// three more breakpoints. With the hole gone there is nothing to climb into
// and nothing to cover, so the overlap, the blob and the fourteen media
// queries that maintained them across widths all go. The section stacks.
//
// Phase F. Guide anatomy: the eyebrow is the h2, the heading is the h3, the
// standfirst is .lead.
//
// --- 23 Sep 2026: nine sector cards, from a supplied design ------------------
// This replaces the typographic field of eleven markets that replaced the four
// linked sector cards on 21 Sep. The reasoning for both turns is in
// homeContent.ts beside the data; the short version is that the September
// objection was to FOUR TECHNOLOGY cards reading as a client boundary, and a
// nine-card grid that spans technology, money, health, retail, property,
// services, education and industry — and closes on "And beyond" — makes the
// opposite claim with the layout instead of against it.
//
// THE FIELD'S MARKUP IS NOT GONE, it moved: /industries still renders
// .marketField from the same data and was deliberately left alone in this
// pass, so _dynamicMarket.scss still carries those rules. See the note there
// before deleting anything that looks unused.
//
// STILL A <ul>, for the same reason the field was: it is a list of nine and a
// screen reader should be able to count it. Each card is a listitem with a
// heading inside, which is what makes the grid navigable by heading as well as
// by list.
//
// data-reveal='stagger' cascades the cards in on scroll, and again on the
// three stages. The primitive caps the delay and ScrollReveal returns without
// touching the DOM under a reduced motion preference, so the effect degrades
// to nothing on its own.
//
// THE SECTION NOW CARRIES TWO BANDS. Markets above, growth stages below,
// separated by a rule and re-opened with their own eyebrow. That is a second
// eyebrow inside one <section>, which the rest of the site does not do — it is
// the design's structure, and the heading outline below keeps it legal.

/** The two-line heading treatment, used by both bands.
 *
 *  `lead` takes its own line; `tail` and `accent` share the second. The break
 *  is a block-level span rather than a <br>, so the first line can still wrap
 *  on its own at phone widths instead of overflowing. */
const SplitTitle = ({ heading }: { heading: SplitHeading }) => (
  <>
    <span className='dynamicMarket__line'>{heading.lead}</span>
    {heading.tail}{" "}
    <span className='dynamicMarket__accent'>{heading.accent}</span>
  </>
);

const DynamicMarket = () => {
  const { eyebrow, heading, lead, aside, sectors, stagesBand, stages, cta } =
    whoWeHelpData;

  return (
    <div className='dynamicMarket sec'>
      <Container className='main'>
        <header className='dynamicMarket__head'>
          <div className='dynamicMarket__headMain'>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2 dynamicMarket__heading' level={3}>
              <SplitTitle heading={heading} />
            </Heading>
            <Text className='lead'>{lead}</Text>
          </div>

          {/* The thesis, in the rail. Mono and small on purpose: it is a
              margin note on the grid below, not a second standfirst, and it is
              the reason the grid is allowed to be a grid at all. */}
          <p className='dynamicMarket__aside'>{aside}</p>
        </header>

        <ul className='sectorGrid' data-reveal='stagger'>
          {sectors.map(({ title, body, icon: Icon, tone, image, terminal }) => (
            <li
              key={title}
              className={[
                "sectorCard",
                `sectorCard--${tone}`,
                terminal && "sectorCard--terminal"
              ]
                .filter(Boolean)
                .join(" ")}
              // The art is a custom property rather than an <Image>, because
              // it is decoration bleeding out of a masked window and carries
              // no information a screen reader could use. Unset — which is
              // every card today — the stylesheet's var() falls through to the
              // tone wash on its own, so there is no empty-state branch here.
              style={
                image
                  ? ({ "--sector-art": `url("${image}")` } as CSSProperties)
                  : undefined
              }
            >
              <span className='sectorCard__art' aria-hidden='true' />

              <span className='sectorCard__chip'>
                <Icon />
              </span>

              <div className='sectorCard__text'>
                {/* h4: the section eyebrow is the h2 and the visual .h2 is the
                    h3, so the cards sit one level below. Same visual-level /
                    semantic-level split the rest of the home page uses. */}
                <Heading className='sectorCard__title' level={4}>
                  {title}
                </Heading>
                <p className='sectorCard__body'>{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <hr className='rule dynamicMarket__rule' />

        {/* The second band. Its eyebrow is a <p> and not a heading: the
            section already has its h2, and promoting this to one would either
            outrank the cards it follows or open a sibling section that does
            not exist. The h3 beneath it is a peer of the first band's. */}
        <div className='dynamicMarket__band'>
          <div className='dynamicMarket__bandHead'>
            <p className='eyebrow'>{stagesBand.eyebrow}</p>
            <Heading className='h2 dynamicMarket__heading' level={3}>
              <SplitTitle heading={stagesBand.heading} />
            </Heading>
          </div>

          <p className='dynamicMarket__bandBody'>{stagesBand.body}</p>

          <Link href={cta.to} className='btn dynamicMarket__cta'>
            {cta.label}
            <ArrowEast />
          </Link>
        </div>

        <div className='dynamicMarket__stages' data-reveal='stagger'>
          {stages.map(({ title, body, icon: Icon }) => (
            <div className='growthStage' key={title}>
              <span className='growthStage__chip'>
                <Icon />
              </span>
              <div>
                <Heading className='growthStage__title' level={4}>
                  {title}
                </Heading>
                <p className='growthStage__body'>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DynamicMarket;
