import Link from "next/link";
import { ComponentType, FC } from "react";
import Heading from "./Heading";
import Text from "./Text";

export interface PointItemCta {
  label: string;
  to: string;
}

export interface PointItemContent {
  /** "01" — mono numeral. The Growth System only. Mutually exclusive with icon. */
  index?: string;
  /** Leading mark. The process steps only. Mutually exclusive with index. */
  icon?: ComponentType;
  title: string;
  body: string;
  /** Sub-capabilities, joined into ONE line. The Growth System only. */
  capabilities?: string[];
  /** Per-item CTA. Ways to work with us only. */
  cta?: PointItemCta;
}

export interface PointItemProps extends PointItemContent {
  /** 'plain' is a bare block; 'card' takes the .card geometry. */
  variant?: "plain" | "card";
}

// The one item block. Six of the twelve homepage sections are the same shape —
// a heading, a sentence, and optionally a numeral, a mark, a capability line
// or a link — so they share this rather than growing six near-identical cards.
//
// THERE IS NO theme/ground PROP, deliberately. ArrowCard's `theme` boolean is
// the cautionary tale: switching colour from a call site produced four live
// contrast failures at once, and the fix was to make colour contextual. Ground
// is read from the band in _pointItem.scss, so a section cannot get it wrong.
//
// There is no className escape hatch either. An unused hatch is how a shared
// card acquires six bespoke per-section overrides and stops being shared.
//
// `capabilities` renders as ONE paragraph joined with " | " rather than a list
// with generated separators: it wraps at the spaces like the prose it is, and
// .small is already coloured for both grounds by the primitives.
const PointItem: FC<PointItemProps> = ({
  index,
  icon: Icon,
  title,
  body,
  capabilities,
  cta,
  variant = "plain"
}) => {
  return (
    <div className={variant === "card" ? "pointItem pointItem--card" : "pointItem"}>
      {index && <Text className='pointItem__index'>{index}</Text>}

      {Icon && (
        <div className='pointItem__icon'>
          <Icon />
        </div>
      )}

      {/* h4 in the outline: the section eyebrow is the h2 and the visual .h2 is
          the h3, so the items sit one level below. The .h3 SCALE with an h4
          ELEMENT is the same visual-level / semantic-level split the rest of
          the home page already uses. */}
      <Heading className='h3 pointItem__title' level={4}>
        {title}
      </Heading>

      <Text className='body'>{body}</Text>

      {capabilities?.length ? (
        <Text className='small pointItem__caps'>{capabilities.join(" | ")}</Text>
      ) : null}

      {cta && (
        <Link href={cta.to} className='pointItem__cta'>
          {cta.label}
        </Link>
      )}
    </div>
  );
};

export default PointItem;
