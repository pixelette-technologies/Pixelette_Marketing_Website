import { Heading, Text } from "@/components/feature";
import { FC } from "react";

interface GoalAndProposedSectionProps {
  goalHeading: string;
  goalDescription: string;
  proposedHeading: string;
  proposedDescription: string;
}

const GoalAndProposedSection: FC<GoalAndProposedSectionProps> = ({
  goalHeading,
  goalDescription,
  proposedHeading,
  proposedDescription
}) => {
  return (
    <div className='goalAndProposedSection'>
      <section>
        <Heading>{goalHeading}</Heading>
        <Text>{goalDescription}</Text>
      </section>
      <section>
        <Heading>{proposedHeading}</Heading>
        <Text>{proposedDescription}</Text>
      </section>
    </div>
  );
};

export default GoalAndProposedSection;
