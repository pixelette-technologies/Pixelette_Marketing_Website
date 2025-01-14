import { Container } from "@/components/common";
import { Heading, Text, Web3MarketingCard } from "@/components/feature";
import { web3MarketingData } from "@/data";
import React from "react";

const Web3Questions = () => {
  return (
    <div className='bg_tertiary'>
      <Container className='main'>
        <section className='web3Question'>
          <header>
            <Heading className='secondry--light'>
              We solve web3{" "}
              <span className='color_primary'>
                marketing’s <br /> toughest questions
              </span>
            </Heading>
            <Text className='secondry'>
              Crypto brands often face hurdles like low visibility, user
              adoption gaps, and community engagement. Here’s how companies
              availing our web3 marketing services have transformed their pain
              points into measurable growth.
            </Text>
          </header>

          <section>
            {web3MarketingData.map((el, index) => (
              <Web3MarketingCard
                key={index}
                image={el.image}
                heading={el.heading}
                summary={el.text}
              />
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default Web3Questions;
