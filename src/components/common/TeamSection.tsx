import { FC } from "react";
import { Heading, TeamCard } from "../feature";
import Container from "./Container";
import { teamData } from "@/data";

interface TeamSectionProps {
  mainHeading?: string;
  subHeading?: string;
  details?: string[];
}

const TeamSection: FC<TeamSectionProps> = ({
  mainHeading,
  subHeading,
  details
}) => {
  return (
    <div className='bg_tertiary--dark '>
      <Container className='main'>
        <section className='teamSection'>
          <header>
            <Heading className='secondry--boldLight color_primary'>
              {mainHeading}
            </Heading>
            <Heading className='secondry--boldLight'>{subHeading}</Heading>
          </header>
          {details && (
            <ul>
              {details.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          )}

          <section>
            {teamData.map((el, index) => (
              <TeamCard
                key={index}
                image={el.image}
                name={el.name}
                role={el.role}
                detail={el.detail}
              />
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default TeamSection;
