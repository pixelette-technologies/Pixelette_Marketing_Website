import { FC } from "react";
import Container from "./Container";
import { Heading } from "../feature";
import {
  Apollo,
  Jira,
  LinkedIn,
  PyTorch,
  Sprout,
  Buffer,
  MailChimp
} from "@/assets/common";
import ArrowRed from "@/assets/common/ArrowLeft";

type IconComponent = FC;

type RenderIconsProps = {
  icons: IconComponent[];
};

const TrustedBrands = () => {
  const iconsGroup: IconComponent[] = [
    Jira,
    LinkedIn,
    PyTorch,
    Apollo,
    Sprout,
    Buffer,
    MailChimp
  ];

  const renderIcons = ({ icons }: RenderIconsProps) => {
    return icons.map((Icon, index) => (
      <div key={index} className='icon-wrapper'>
        <Icon />
      </div>
    ));
  };

  return (
    <div className='trustedBrands' data-aos='fade-up' data-aos-duration='1800'>
      <Container className='main'>
        <Heading className='primary color_secondry font_family_glory uppercase'>
          Trusted by
          <ArrowRed />
        </Heading>
      </Container>
      <section className='bg_primary'>
        <Container className='mainLeft'>
          <Heading className='primary color_white font_family_glory uppercase'>
            Leading Brands
          </Heading>
          <section>
            <div>
              {renderIcons({
                icons: [
                  ...iconsGroup,
                  ...iconsGroup,
                  ...iconsGroup,
                  ...iconsGroup
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
