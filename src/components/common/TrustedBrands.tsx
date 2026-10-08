import { FC, ReactNode } from "react";
import Container from "./Container";
import { Heading, Text } from "../feature";
import Image from "next/image";
import Link from "next/link";

interface TrustedBrandsProps {
  topHeading?: boolean;
  heading?: string;
  /** Overrides the "Trusted by" label. */
  eyebrow?: string;
  /** 'inline' keeps the label beside the strip. 'stacked' lifts the heading
   *  and a standfirst above it, onto the symmetric measure. */
  layout?: "inline" | "stacked";
  /** Rendered in 'stacked' only. */
  standfirst?: string;
  cta?: { label: string; to: string };
  /** Replaces the client logos with another set of marks, each carrying the
   *  name a screen reader announces. /services' tool band, 25 Sep 2026. */
  items?: { name: string; mark: ReactNode }[];
  /** A modifier on the band, for the one caller that needs one. */
  className?: string;
}

// The logo row used to be rendered four times over and scrolled with a CSS
// `animation: scrollX 40s linear infinite`. The keyframes went with the
// decorative layer in D2, which stopped the motion but left four static copies
// of the same six logos sitting in a row. They render ONCE now.
//
// No content is lost: the extra three passes were the same imagesArray
// repeated so the marquee had something to scroll into.
//
// Phase F. "Trusted by" sat on the light page above an abruptly-starting black
// slab carrying "Leading Brands", so one thought read as two disconnected
// pieces with a hard seam between them. The whole component is one .band-dark
// now — no DOM was moved to achieve it, the band class went on the wrapper the
// two halves already shared.
//
// Anatomy: "Trusted by" is the eyebrow, "Leading Brands" is the h2.
//
// The dark ground is NOT a style preference here. Every logo in imagesArray is
// knockout white: fusio carries a white fill attribute and the other four are
// baked raster patterns. This row cannot sit on a light ground without new
// assets. Two of the page's three dark bands are forced by their own content.
//
// The ArrowRed mark went with the heading change. It was a second mannerism
// competing with the sanctioned signal-capped rule, and .rule-cap is the only
// one this design gets.
//
// --- 8 Sep 2026 brief -------------------------------------------------------
// THE STACKED LAYOUT IS NOT COSMETIC. The brief replaces the two-word label
// with a full sentence — "Selected brands and ventures we have supported." —
// and the inline layout physically cannot hold it: the label column sits in
// container_mainLeft, the deliberately asymmetric bleed container, under a
// `white-space: nowrap` that exists so "Leading Brands" stops breaking
// mid-phrase. A sentence on one unwrappable line blows the band open.
//
// So the heading and the new standfirst move OUT of the bleed container and
// onto the symmetric measure, and only the logo strip keeps bleeding right.
// The nowrap rule then simply stops matching, because there is no longer a
// heading inside that container for it to select.
//
// It is an explicit prop rather than being inferred from `standfirst` being
// present, so a reader of the call site can see which mode it is in.
//
// The label itself is the brief's safer claim. "Trusted by brands" is to be
// used ONLY where every displayed logo is a genuine client relationship; this
// set includes portfolio ventures, so the wording above is the one that is
// literally true.

const TrustedBrands: FC<TrustedBrandsProps> = ({
  topHeading,
  heading,
  eyebrow,
  layout = "inline",
  standfirst,
  cta,
  items,
  className
}) => {
  const stacked = layout === "stacked";

  const imagesArray = [
    "/common/blockGold.svg",
    "/common/fusio.svg",
    "/common/digitalAssests.svg",
    "/common/bigInvonation.svg",
    "/common/fantacyFusio.svg",
    "/common/webBooking.svg"
  ];

  // The marquee needs the row twice: the track slides left by exactly one
  // group, at which point the duplicate is sitting where the original began and
  // the loop restarts invisibly. The duplicate is aria-hidden, so the
  // accessibility tree still sees six logos rather than twelve.
  //
  // This is the same duplication D2 removed, and removing it was right AT THE
  // TIME — the motion had already gone, so the copies were just six logos
  // rendered as twenty-four. The two belong together. If the animation ever
  // goes again, this second call goes with it.
  //
  // 25 Sep 2026. `items` puts a different set of marks on the same device —
  // the tool band on /services, which was asked for to look exactly like this
  // one. Those marks are inline SVG components whose own svgs are
  // aria-hidden, so the name goes on the wrapper as role="img". The duplicate
  // group stays silent either way.
  const renderGroup = (duplicate: boolean) => (
    <div className='marquee__group' aria-hidden={duplicate || undefined}>
      {items
        ? items.map(item => (
            <div
              key={item.name}
              className='icon-wrapper'
              role={duplicate ? undefined : "img"}
              aria-label={duplicate ? undefined : item.name}
            >
              {item.mark}
            </div>
          ))
        : imagesArray.map((icon, index) => (
            <div key={index} className='icon-wrapper'>
              <Image
                src={icon}
                alt={duplicate ? "" : `Brand Logo ${index}`}
                width={200}
                height={50}
              />
            </div>
          ))}
    </div>
  );

  return (
    <div
      className={[
        "trustedBrands",
        stacked && "trustedBrands--stacked",
        "band-dark",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container className='main'>
        {topHeading ? (
          ""
        ) : (
          <Heading className='eyebrow'>{eyebrow ?? "Trusted by"}</Heading>
        )}

        {stacked && (
          <>
            <Heading className='h2'>{heading ?? "Leading Brands"}</Heading>
            {standfirst && <Text className='lead'>{standfirst}</Text>}
          </>
        )}
      </Container>

      <section className='trustedBrandsBand'>
        <Container className='mainLeft'>
          {!stacked &&
            (heading ? (
              <Heading className='h2'>{heading}</Heading>
            ) : (
              <Heading className='h2'>Leading Brands</Heading>
            ))}

          <section className='marquee'>
            <div className='marquee__track'>
              {renderGroup(false)}
              {renderGroup(true)}
            </div>
          </section>
        </Container>
      </section>

      {cta && (
        <Container className='main'>
          <div className='trustedBrands__actions'>
            <Link href={cta.to} className='btn2'>
              {cta.label}
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default TrustedBrands;
