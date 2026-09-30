import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutBuilt } from "@/data/aboutus";
import BuiltFlow from "./BuiltFlow";

// How we're built. 30 Sep 2026.
//
// The page's only notable interaction, and it replaces the capability model:
// the point this section makes is that the team is assembled around the brief,
// which is a sequence, not a list of departments. The sequence is BuiltFlow.
//
// data-reveal='off' because the flow has its own one-time entrance, and the
// site-wide fade arriving on top of it would be two motions for one section.

const AboutBuilt = () => {
  const { eyebrow, heading, lead, stages } = aboutBuilt;

  return (
    <div data-reveal='off'>
      <Container className='main'>
        <section className='aboutBuilt'>
          <header>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
          </header>

          <BuiltFlow stages={stages} />
        </section>
      </Container>
    </div>
  );
};

export default AboutBuilt;
