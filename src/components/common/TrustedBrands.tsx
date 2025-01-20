import { FC } from "react";
import Container from "./Container";
import { Heading, Marquee } from "../feature";
import { brandsData } from "@/data";
import Image from "next/image";

interface TrustedBrandsProps {
  header?: string;
  heading?: string;
}

const TrustedBrands: FC<TrustedBrandsProps> = ({ header, heading }) => {
  return (
    <div className='trustedBrands'>
      <Container className='main'>
        {header && (
          <Heading className='primary color_secondry font_family_glory'>
            {header}
          </Heading>
        )}
      </Container>
      <section className='bg_primary'>
        <Container className='mainLeft'>
          <Heading className='primary color_white font_family_glory'>
            {heading}
          </Heading>
          <section>
            <Marquee>
              {brandsData.map((el, index) => (
                <div key={index} style={{ marginRight: "5rem" }}>
                  <Image
                    src={el.icon}
                    height={el.height}
                    width={el.width}
                    alt='icons'
                  />
                </div>
              ))}
            </Marquee>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default TrustedBrands;
