import { FC } from "react";
import Container from "./Container";
import { Heading } from "../feature";
import ArrowRed from "@/assets/common/ArrowLeft";
import Image from "next/image";

interface TrustedBrandsProps {
  topHeading?: boolean;
  heading?: string;
}

type RenderIconsProps = {
  icons: string[]; // Change type to string[]
};

const TrustedBrands: FC<TrustedBrandsProps> = ({ topHeading, heading }) => {
  const imagesArray = [
    "/common/blockGold.svg",
    "/common/fusio.svg",
    "/common/digitalAssests.svg",
    "/common/bigInvonation.svg",
    "/common/fantacyFusio.svg",
    "/common/webBooking.svg"
  ];

  const renderIcons = ({ icons }: RenderIconsProps) => {
    return icons.map((icon, index) => (
      <div key={index} className='icon-wrapper'>
        <Image src={icon} alt={`Brand Logo ${index}`} width={200} height={50} />
      </div>
    ));
  };

  return (
    <div className='trustedBrands' data-aos='fade-up' data-aos-duration='1800'>
      <Container className='main'>
        {topHeading ? (
          ""
        ) : (
          <Heading className='primary color_secondry font_family_glory uppercase'>
            Trusted by
            <ArrowRed />
          </Heading>
        )}
      </Container>
      <section className='bg_primary'>
        <Container className='mainLeft'>
          {heading ? (
            <Heading className='primary color_white font_family_glory uppercase'>
              {heading}
            </Heading>
          ) : (
            <Heading className='primary color_white font_family_glory uppercase'>
              Leading Brands
            </Heading>
          )}

          <section>
            <div>
              {renderIcons({
                icons: [
                  ...imagesArray,
                  ...imagesArray,
                  ...imagesArray,
                  ...imagesArray
                ]
              })}
            </div>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default TrustedBrands;
