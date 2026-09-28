import type { CSSProperties } from "react";
import { Heading } from "@/components/feature";
import type {
  GrowthStage,
  SectorCard,
  SplitHeading
} from "@/data/industries/whoWeHelp";

// The three pieces the home page's Who we help preview and the /industries hub
// share. One implementation each, so the eight sectors cannot look like two
// different lists on two pages — which is the problem the 23 Sep taxonomy
// consolidation exists to end. The rules are in _dynamicMarket.scss.

/** The two-line heading treatment.
 *
 *  `lead` takes its own line; `tail` and `accent` share the second. The break
 *  is a block-level span rather than a <br>, so the first line can still wrap
 *  on its own at phone widths. The {" "} after it is not decoration: without
 *  it the text content reads "Across sectors.Built around", which is what a
 *  screen reader, a search snippet and a copy-paste all get. */
export const SplitTitle = ({ heading }: { heading: SplitHeading }) => (
  <>
    <span className='dynamicMarket__line'>{heading.lead}</span>{" "}
    {heading.tail}{" "}
    <span className='dynamicMarket__accent'>{heading.accent}</span>
  </>
);

/** The eight sector cards.
 *
 *  `compact` is four across on a wide screen, with a smaller chip and a
 *  tighter card, so eight markets read as breadth at a glance. The home page
 *  and the hub both use it; the full card, two across, left the hub's cards
 *  mostly empty at wide viewports.
 *
 *  `level` is the heading level of each card title. It depends on the page's
 *  outline, not on the component: h4 on the home page, where the section
 *  eyebrow is the h2, and h2 on the hub, where the grid sits directly under
 *  the h1 with no section heading of its own. */
export const SectorGrid = ({
  sectors,
  compact = false,
  level
}: {
  sectors: SectorCard[];
  compact?: boolean;
  level: 2 | 3 | 4;
}) => (
  <ul
    className={compact ? "sectorGrid sectorGrid--compact" : "sectorGrid"}
    data-reveal='stagger'
  >
    {sectors.map(({ title, body, icon: Icon, tone, image }) => (
      <li
        key={title}
        className={`sectorCard sectorCard--${tone}`}
        // The art is a custom property rather than an <Image>, because it is
        // decoration bleeding out of a masked window and carries no
        // information a screen reader could use. Unset — which is every card
        // today — the stylesheet's var() falls through to the tone wash.
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
          <Heading className='sectorCard__title' level={level}>
            {title}
          </Heading>
          <p className='sectorCard__body'>{body}</p>
        </div>
      </li>
    ))}
  </ul>
);

/** Launch, scale, established — business stage, never sector. */
export const StageList = ({
  stages,
  level
}: {
  stages: GrowthStage[];
  level: 3 | 4;
}) => (
  <div className='dynamicMarket__stages' data-reveal='stagger'>
    {stages.map(({ title, body, icon: Icon }) => (
      <div className='growthStage' key={title}>
        <span className='growthStage__chip'>
          <Icon />
        </span>
        <div>
          <Heading className='growthStage__title' level={level}>
            {title}
          </Heading>
          <p className='growthStage__body'>{body}</p>
        </div>
      </div>
    ))}
  </div>
);
