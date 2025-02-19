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
    <div
      className='bg_tertiary--dark '
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <Container className='main'>
        <section className='teamSection'>
          <header>
            <Heading
              className='secondry--boldLight color_primary font_family_glory uppercase'
              animation='fade-down'
              duration='1200'
            >
              {mainHeading}
            </Heading>
            <Heading
              className='secondry--boldLight font_family_glory uppercase'
              animation='fade-up'
              duration='1400'
            >
              {subHeading}
            </Heading>
          </header>
          {details && (
            <ul>
              {details.map((el, index) => (
                <li
                  key={index}
                  data-aos='fade-up'
                  data-aos-duration={`${1000 + index * 200}`}
                >
                  {el}
                </li>
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
                animation='fade-up'
                duration={`${1000 + index * 200}`}
              />
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default TeamSection;
