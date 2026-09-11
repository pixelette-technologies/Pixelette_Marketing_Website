import { Container } from "@/components/common";
import { Heading, PointItem, Text } from "@/components/feature";
import type { PointItemContent, PointItemCta } from "@/components/feature";
import Link from "next/link";
import { FC } from "react";

export interface ItemsSectionContent {
  eyebrow: string;
  heading: string;
  /** The brief supplies no standfirst for the process section. The content
   *  rule is to ship the pattern without the missing element rather than
   *  invent one — see GrowthSection, which opens on its h2 for the same
   *  reason. */
  lead?: string;
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
          {lead && <Text className='lead'>{lead}</Text>}
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

        {/* THE CONTROL IS CHOSEN BY GROUND, NOT BY THE CALL SITE. Same rule
            the colours follow: a section cannot get it wrong from outside.

            .btn2 on a dark band resolves to --color-panel-btn-text on a
            --color-panel-btn-border edge, which is correct and deliberate but
            deliberately quiet — it is the SECONDARY control. On the Growth
            System that quiet outline is the only action under five cards that
            are now a bright light surface, and it disappears under them. The
            filled .btn is the system's primary control and it is what that
            slot wants.

            Light grounds keep .btn2: there the section CTA sits among ordinary
            page furniture and the outline is the right weight. */}
        {cta && (
          <Link
            href={cta.to}
            className={`${ground === "dark" ? "btn" : "btn2"} itemsSection__cta`}
          >
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
