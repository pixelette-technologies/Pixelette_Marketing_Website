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
    <div className='bg_primary'>
      <Container className='main'>
        <div className='goalAndProposedSection'>
          <section>
            <Heading className='primary--light font_family_glory color_white'>
              {goalHeading}
            </Heading>
            <Text className='primary color_white'>{goalDescription}</Text>
          </section>
          <section>
            <Heading className='primary--light font_family_glory color_white'>
              {proposedHeading}
            </Heading>
            <Text className='primary color_white'>{proposedDescription}</Text>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default GoalAndProposedSection;
