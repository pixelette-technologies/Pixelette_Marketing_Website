import { FC } from "react";
import Container from "./Container";
import { Heading } from "../feature";
import Image from "next/image";

interface TrustedBrandsProps {
  topHeading?: boolean;
  heading?: string;
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

const TrustedBrands: FC<TrustedBrandsProps> = ({ topHeading, heading }) => {
  const imagesArray = [
    "/common/blockGold.svg",
    "/common/fusio.svg",
    "/common/digitalAssests.svg",
    "/common/bigInvonation.svg",
    "/common/fantacyFusio.svg",
    "/common/webBooking.svg"
  ];

  return (
    <div className='trustedBrands band-dark'>
      <Container className='main'>
        {topHeading ? (
          ""
        ) : (
          <Heading className='eyebrow'>Trusted by</Heading>
        )}
      </Container>
      <section className='trustedBrandsBand'>
        <Container className='mainLeft'>
          {heading ? (
            <Heading className='h2'>{heading}</Heading>
          ) : (
            <Heading className='h2'>Leading Brands</Heading>
          )}

          <section>
            <div>
              {imagesArray.map((icon, index) => (
                <div key={index} className='icon-wrapper'>
                  <Image
                    src={icon}
                    alt={`Brand Logo ${index}`}
                    width={200}
                    height={50}
                  />
                </div>
              ))}
            </div>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default TrustedBrands;
