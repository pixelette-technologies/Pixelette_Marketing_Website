import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { ourServicesData } from "@/data/aboutus";
import React from "react";

const OurServices = () => {
  return (
    <div
      className='band-alt'
    >
      <Container className='main'>
        <div className='ourServices'>
          <header>
            <Text
              className='text_primary'
            >
              Industries we service
            </Text>
            <Heading
              className='heading_secondry--light'
            >
              We succeed where it matters most today
            </Heading>
            <Text
              className='text_secondry'
            >
              Navigating the complexities of fast-evolving industries requires a
              deep understanding and agility. We specialise in marketing for
              web3, SaaS, fintech, technology, startups and AI products.
              Partnering with us means getting marketing strategies fit to your
              industry and business that actually work.
            </Text>
          </header>
          <section data-reveal='stagger'>
            {ourServicesData.map((el, index) => (
              <ArrowCard
                key={index}
                mainHeading={el.mainHeading}
                subHeading={el.subHeading}
                summary={el.text}
                to={`/industries/${el.route}`}
                theme={false}
                textfloat={false}
              />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
