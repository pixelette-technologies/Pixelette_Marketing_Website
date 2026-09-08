import { Container } from "@/components/common";
import { ArrowCard, Heading, PointItem, Text } from "@/components/feature";
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
// The 15rem top corner radii that appeared only below 1366px went with them.
//
// Phase F. Guide anatomy: mainHeading is the eyebrow, subHeading is the h2,
// the standfirst is .lead.
//
// The hard <br /> inside the heading went too. It is not content — no word
// changes — it is a hand-set line break, and it fights both `text-wrap:
// balance` on the display classes and the measure cap on the copy.
//
// --- 8 Sep 2026 brief -------------------------------------------------------
// SECTOR AND STAGE ARE NOW TWO GROUPS, WHICH IS THE WHOLE POINT. The old
// six-card taxonomy mixed them: "Startup" is a company stage sitting in a list
// of industries, and "Technology" overlapped three of its neighbours. Worse,
// as one flat grid it read as a client boundary — these six and no others.
//
// So the four sectors are presented as selected EXPERIENCE and the three
// growth stages sit below a hairline as their own group. The standfirst says
// in words what the split says in layout: the offer is not limited to these
// categories.
//
// The sectors keep ArrowCard, which is exactly right for them — a title, a
// summary and a link to the industry page. The stages take PointItem and DO
// NOT LINK, because there are no stage pages to link to; the brief gives the
// whole group one route out, "Find your growth route".
//
// The Startup card is gone and /industries/saas keeps its page but loses its
// homepage card, both as the brief directs.

const DynamicMarket = () => {
  return (
    <div className='dynamicMarket sec'>
      <Container className='main'>
        <header>
          <div>
            <Heading className='eyebrow' level={2}>
              {whoWeHelpData.eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {whoWeHelpData.heading}
            </Heading>
          </div>
          <Text className='lead'>{whoWeHelpData.lead}</Text>
        </header>

        <section data-reveal='stagger'>
          {whoWeHelpData.sectors.map((el, index) => (
            <ArrowCard
              key={index}
              mainHeading={el.mainHeading}
              subHeading={el.subHeading}
              summary={el.summary}
              theme={false}
              textfloat={false}
              to={el.to}
            />
          ))}
        </section>

        {/* The hairline is what makes "separately" visible. Without it the
            three stages read as three more sectors that happen not to link. */}
        <div className='rule dynamicMarket__split' />

        <div className='dynamicMarket__stages' data-reveal='stagger'>
          {whoWeHelpData.stages.map((el, index) => (
            <PointItem key={index} {...el} />
          ))}
        </div>

        <Link
          href={whoWeHelpData.cta.to}
          className='btn2 dynamicMarket__cta'
        >
          {whoWeHelpData.cta.label}
        </Link>
      </Container>
    </div>
  );
};

export default DynamicMarket;
