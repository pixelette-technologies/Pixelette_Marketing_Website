import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { ArrowEast } from "@/assets/sectors";
import { sectors, whoWeHelpPreview } from "@/data/industries/whoWeHelp";
import Link from "next/link";
import { SectorGrid, SplitTitle } from "./WhoWeHelpParts";

// The home page's Who we help section.
//
// --- 23 Sep 2026: a preview, not a second copy of the hub -------------------
// This section had grown into the whole sector story: nine cards (the ninth,
// "And beyond", sitting in the grid as though it were an industry), a margin
// note, a rule, a second eyebrow and the three growth stages. /industries was
// telling a different version of it, with a different list.
//
// Both now read ONE taxonomy, data/industries/whoWeHelp.ts, and this section
// does one job: establish breadth quickly and hand off. The eight sectors
// render compact, four across, and the only way on is "Explore who we help".
// The unlisted-sector line, the deeper experience and the growth stages moved
// to the hub, where there is room to explain them.
//
// Heading outline: the eyebrow is the h2, the visual .h2 is the h3, the cards
// are h4 — the same visual-level / semantic-level split the rest of the home
// page uses.

const DynamicMarket = () => {
  const { eyebrow, heading, lead, cta } = whoWeHelpPreview;

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
        </header>

        <SectorGrid sectors={sectors} compact level={4} />

        <div className='dynamicMarket__foot'>
          <Link href={cta.to} className='btn dynamicMarket__cta'>
            {cta.label}
            <ArrowEast />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default DynamicMarket;
