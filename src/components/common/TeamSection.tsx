import { FC } from "react";
import { Heading, TeamCard, Text } from "../feature";
import Container from "./Container";
import Link from "next/link";
import { teamData } from "@/data";

interface TeamSectionProps {
  mainHeading?: string;
  subHeading?: string;
  details?: string[];
  /** Standfirst under the heading pair. */
  lead?: string;
  cta?: { label: string; to: string };
}

const TeamSection: FC<TeamSectionProps> = ({
  mainHeading,
  subHeading,
  details,
  lead,
  cta
}) => {
  return (
    <div
      className='band-alt'
    >
      <Container className='main'>
        <section className='teamSection'>
          <header>
            <Heading className='eyebrow'>{mainHeading}</Heading>
            <Heading className='h2'>{subHeading}</Heading>
            {lead && <Text className='lead'>{lead}</Text>}
          </header>
          {details && (
            <ul>
              {details.map((el, index) => (
                <li
                  key={index}
                >
                  {el}
                </li>
              ))}
            </ul>
          )}

          <section data-reveal='stagger'>
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

          {cta && (
            <Link href={cta.to} className='btn2 teamSection__cta'>
              {cta.label}
            </Link>
          )}
        </section>
      </Container>
    </div>
  );
};

export default TeamSection;
