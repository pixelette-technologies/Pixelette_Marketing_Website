import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import React from "react";

const Web3Questions = () => {
  return (
    <div className='bg_tertiary'>
      <Container className='main'>
        <header>
          <Heading className=''>
            We solve web3 <span>marketing’s toughest questions</span>
          </Heading>
          <Text>
            Crypto brands often face hurdles like low visibility, user adoption
            gaps, and community engagement. Here’s how companies availing our
            web3 marketing services have transformed their pain points into
            measurable growth.
          </Text>
        </header>
      </Container>
    </div>
  );
};

export default Web3Questions;
