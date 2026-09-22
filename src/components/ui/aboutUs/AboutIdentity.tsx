import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutIdentity } from "@/data/aboutus";

// Who we are / How we work, as one section.
//
// It replaces WhoWeAre, which was two full-bleed dark halves carrying five
// paragraphs, a three-item list and a founding story — roughly a screen and a
// half of copy saying what these six sentences say.
//
// THE TWO STATEMENTS ARE PEERS. Neither is the section heading, so this
// section has no header of its own: the house anatomy is eyebrow, heading,
// standfirst, and here it runs twice, once per column. Both headings are .h2
// as h3 elements, the same visual-level / semantic-level split the rest of the
// site uses.
//
// THIS SECTION HOLDS THE PAGE'S ONE .rule-cap, and it sits on the FIRST
// STATEMENT'S hairline rather than on a rule of the section's own. That was
// decided by looking at it: the section carried a full-width capped rule as
// well, and at 1440px the two treatments landed 90px apart — three hairlines
// in a hundred pixels, with the signature segment on the faintest of them and
// reading as a red dash floating above the content. One rule, capped, at the
// point the content starts.
//
// It cannot go on the capability model instead. The device caps a hairline
// drawn in --color-line, a light tone, and that section is a dark band.
// One per route: route-walk fails the build on a second.

const AboutIdentity = () => {
  return (
    <Container className='main'>
      <section className='aboutIdentity' data-reveal='stagger'>
        {aboutIdentity.map(({ eyebrow, heading, body }, index) => (
          <div
            key={eyebrow}
            className={
              index === 0
                ? "aboutIdentity__statement rule-cap"
                : "aboutIdentity__statement"
            }
          >
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='body'>{body}</Text>
          </div>
        ))}
      </section>
    </Container>
  );
};

export default AboutIdentity;
