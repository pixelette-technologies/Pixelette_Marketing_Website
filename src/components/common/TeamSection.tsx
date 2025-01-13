import { FC } from "react";
import { Heading, TeamCard } from "../feature";
import Container from "./Container";
import { teamData } from "@/data";

interface TeamSectionProps {
  mainHeading: string;
  subHeading: string;
}

const TeamSection: FC<TeamSectionProps> = ({ mainHeading, subHeading }) => {
  return (
    <div className='bg_tertiary--dark '>
      <Container>
        <header>
          <Heading>{mainHeading}</Heading>
          <Heading>{subHeading}</Heading>
        </header>
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
      </Container>
    </div>
  );
};

export default TeamSection;
