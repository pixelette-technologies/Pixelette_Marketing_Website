import { Container } from "@/components/common";
import { Heading, PointItem, Text } from "@/components/feature";
import type { PointItemContent, PointItemCta } from "@/components/feature";
import Link from "next/link";
import { FC } from "react";

export interface ItemsSectionContent {
  eyebrow: string;
  heading: string;
  lead: string;
  items: PointItemContent[];
  /** Section-level CTA, rendered last. */
  cta?: PointItemCta;
  /** Trailing .small line. */
  closing?: string;
}

export interface ItemsSectionProps {
  content: ItemsSectionContent;
  ground?: "page" | "alt" | "dark";
  grid?: "auto" | "thirds";
  variant?: "plain" | "card";
  /** Container-width hairline above the section. NEVER .rule-cap — the page
   *  gets exactly one mannerism and GrowthSection already holds it. */
  topRule?: boolean;
}

// The shell for the six homepage sections that are the same shape: section
// header, N uniform items, and optionally a CTA or a closing line.
//
// GROUND IS A PROP AND THE THREE-BAND CAP IS REAL. _surfaces.scss allows three
// .band-dark per page and the home page spends all three — the client logos and
// the Growth System, both of which have to be dark, and the process steps.
// route-walk fails the build if a fourth appears.
//
// GRID IS EXPLICIT, NOT DERIVED FROM items.length. Against the 1160px wrap the
// auto-fit track seats four, so five items on 'auto' give four and a
// full-width orphan, and four items on 'thirds' give three and an orphan.
// Neither is visible until it renders, so the call site states which it wants.
const GROUNDS: Record<NonNullable<ItemsSectionProps["ground"]>, string> = {
  page: "",
  alt: "band-alt",
  dark: "band-dark"
};

const ItemsSection: FC<ItemsSectionProps> = ({
  content,
  ground = "page",
  grid = "auto",
  variant = "plain",
  topRule = false
}) => {
  const { eyebrow, heading, lead, items, cta, closing } = content;

  const inner = (
    <Container className='main'>
      <section
        className={
          topRule ? "itemsSection itemsSection--ruled" : "itemsSection"
        }
      >
        <header>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='lead'>{lead}</Text>
        </header>

        <div
          className={`itemsSection__grid itemsSection__grid--${grid}`}
          data-reveal='stagger'
        >
          {items.map((item, index) => (
            <PointItem key={index} {...item} variant={variant} />
          ))}
        </div>

        {closing && <Text className='small'>{closing}</Text>}

        {cta && (
          <Link href={cta.to} className='btn2 itemsSection__cta'>
            {cta.label}
          </Link>
        )}
      </section>
    </Container>
  );

  // A full-bleed ground has to sit OUTSIDE the container or the gradient gets
  // clipped to the wrap, which is why every band component in this repo is a
  // wrapper around a Container. On the page ground there is nothing to bleed,
  // so no wrapper is emitted rather than an empty div.
  const groundClass = GROUNDS[ground];
  return groundClass ? <div className={groundClass}>{inner}</div> : inner;
};

export default ItemsSection;
