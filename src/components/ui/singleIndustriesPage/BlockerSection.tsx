import { Heading, Text } from "@/components/feature";
import { FC } from "react";

interface BlockerSectionProps {
  heading: string;
  description: string;
}

const BlockerSection: FC<BlockerSectionProps> = ({ heading, description }) => {
  return (
    <div className='blockerSection'>
      <Heading>{heading}</Heading>
      <Text>{description}</Text>
    </div>
  );
};

export default BlockerSection;
