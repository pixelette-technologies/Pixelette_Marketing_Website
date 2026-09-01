import { FC } from "react";
import Container from "./Container";
import { Heading } from "../feature";
import ArrowRed from "@/assets/common/ArrowLeft";
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
    <div className='trustedBrands'>
      <Container className='main'>
        {topHeading ? (
          ""
        ) : (
          <Heading className='primary font_family_glory uppercase'>
            Trusted by
            <ArrowRed />
          </Heading>
        )}
      </Container>
      <section className='trustedBrandsBand'>
        <Container className='mainLeft'>
          {heading ? (
            <Heading className='primary font_family_glory uppercase'>
              {heading}
            </Heading>
          ) : (
            <Heading className='primary font_family_glory uppercase'>
              Leading Brands
            </Heading>
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
