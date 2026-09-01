import { Container } from "@/components/common";
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
    <div className='goalAndProposedBand'>
      <Container className='main'>
        <div className='goalAndProposedSection'>
          <section>
            <Heading className='heading_primary--light font_family_glory'>
              {goalHeading}
            </Heading>
            <Text className='text_primary'>{goalDescription}</Text>
          </section>
          <section>
            <Heading className='heading_primary--light font_family_glory'>
              {proposedHeading}
            </Heading>
            <Text className='text_primary'>{proposedDescription}</Text>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default GoalAndProposedSection;
