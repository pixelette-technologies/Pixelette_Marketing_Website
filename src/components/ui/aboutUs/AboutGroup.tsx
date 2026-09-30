import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutGroup } from "@/data/aboutus";

// Part of the wider Pixelette Group. 30 Sep 2026.
//
// It replaces the ecosystem logo strip. Text only: the group's companies are
// not client proof, and the copy says the connection happens where the brief
// requires it, not on every engagement. No link — see the note on aboutGroup.

const AboutGroup = () => {
  const { eyebrow, heading, body } = aboutGroup;

  return (
    <Container className='main'>
      <section className='aboutGroup'>
        <Heading className='eyebrow' level={2}>
          {eyebrow}
        </Heading>
        <div className='aboutGroup__grid'>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='body'>{body}</Text>
        </div>
      </section>
    </Container>
  );
};

export default AboutGroup;
