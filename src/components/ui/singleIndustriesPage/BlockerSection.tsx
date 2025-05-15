import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC } from "react";

interface BlockerSectionProps {
  heading: string;
  description: string;
}

const BlockerSection: FC<BlockerSectionProps> = ({ heading, description }) => {
  return (
    <Container className='main'>
      <div className='blockerSection'>
        <Heading className='primary--light font_family_glory'>
          {heading}
        </Heading>
        <Text className='primary'>{description}</Text>
      </div>
    </Container>
  );
};

export default BlockerSection;
