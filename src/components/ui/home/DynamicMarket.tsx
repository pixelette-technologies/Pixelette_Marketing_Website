import { Container } from "@/components/common";
import { Heading, PointItem, Text } from "@/components/feature";
import { whoWeHelpData } from "@/data/home";
import Link from "next/link";

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
// --- 21 Sep 2026: the four sector cards are gone ----------------------------
// AI & Software, FinTech, Web3 & Digital Assets and Technology & Platforms,
// with their summaries and their four View More links. The reason is
// positioning rather than design: four boxed, equal, linked technology sectors
// read as a client boundary, and the standfirst underneath spent its words
// arguing against the layout above it.
//
// A TYPOGRAPHIC FIELD REPLACES THEM, not a longer grid — twelve cards would
// make the same claim as four. Eleven markets are set as type at three scales,
// with no box, no summary and no link, so the group reads as range rather than
// as a menu. "And beyond" closes it as part of the composition.
//
// It is a <ul>, because it is a list and a screen reader should be able to
// count it. The scale a mark takes is a compositional role and carries no
// meaning, so nothing is lost by the field being read in source order at one
// voice — which is also why there is no aria-label dressing it up as a figure.
//
// data-reveal='stagger' cascades the marks in on scroll. The primitive caps
// the delay and ScrollReveal returns without touching the DOM under a reduced
// motion preference, so the effect degrades to nothing on its own.
//
// The three growth stages and the single route out are unchanged, and the
// closing statement bridges market to stage.

const SCALE_CLASS: Record<string, string> = {
  lead: "marketField__mark--lead",
  mid: "marketField__mark--mid",
  quiet: "marketField__mark--quiet"
};

const DynamicMarket = () => {
  const { eyebrow, heading, lead, markets, beyond, stages, cta, positioning } =
    whoWeHelpData;

  return (
    <div className='dynamicMarket sec'>
      <Container className='main'>
        <header>
          <div>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
          </div>
          <Text className='lead'>{lead}</Text>
        </header>

        <ul className='marketField' data-reveal='stagger'>
          {markets.map(mark => (
            <li
              key={mark.label}
              className={[
                "marketField__mark",
                SCALE_CLASS[mark.scale],
                mark.accent && "marketField__mark--accent"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {mark.label}
            </li>
          ))}

          {/* Inside the list rather than after it: it is the last thing read,
              and a sentence sitting outside the <ul> would be announced as
              unrelated to the eleven marks it qualifies. The rule before it is
              a pseudo-element, so no empty span exists to be read out. */}
          <li className='marketField__mark marketField__beyond'>{beyond}</li>
        </ul>

        <div className='dynamicMarket__positioning'>
          <Heading className='h3' level={4}>
            {positioning.heading}
          </Heading>
          <Text className='body'>{positioning.body}</Text>
        </div>

        {/* The hairline that used to sit here was removed on 21 Sep, on the
            user's instruction and from an actual rendered page. It was put in
            to stop the three stages reading as three more sector cards; with
            the cards gone there is nothing left for them to be confused with.
            The gap it carried is kept on the stages. */}
        <div className='dynamicMarket__stages' data-reveal='stagger'>
          {stages.map((el, index) => (
            <PointItem key={index} {...el} />
          ))}
        </div>

        <Link href={cta.to} className='btn2 dynamicMarket__cta'>
          {cta.label}
        </Link>
      </Container>
    </div>
  );
};

export default DynamicMarket;
