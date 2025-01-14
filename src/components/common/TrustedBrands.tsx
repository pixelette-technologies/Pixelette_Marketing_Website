import { FC } from "react";
import Container from "./Container";
import { Heading, Marquee } from "../feature";
import {
  Buffer,
  Apollo,
  Jira,
  LinkedIn,
  PyTorch,
  Sprout
} from "@/assets/common";

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
              <div style={{ marginRight: "5rem" }}>
                <Jira />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <LinkedIn />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <PyTorch />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Apollo />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Sprout />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Buffer />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Jira />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <LinkedIn />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <PyTorch />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Apollo />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Sprout />
              </div>
              <div style={{ marginRight: "5rem" }}>
                <Buffer />
              </div>
            </Marquee>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default TrustedBrands;
