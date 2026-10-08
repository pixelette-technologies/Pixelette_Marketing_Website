import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutPrinciples } from "@/data/aboutus";

// What guides the work. Four editorial rows on hairlines, not cards: a pink
// numeral, the name in burgundy, and the line that qualifies it in near-black.
// No icons, by instruction.
//
// The numerals are text, so the order does not rest on colour. They sit in
// the name column rather than a column of their own, so on a phone each row
// still reads numeral, name, sentence from the top down.

const Principles = () => {
  const { eyebrow, heading, items } = aboutPrinciples;

  return (
    <Container className='main'>
      <section className='principles'>
        <header>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
        </header>

        <ol className='principles__list' data-reveal='stagger'>
          {items.map(({ title, body }, i) => (
            <li key={title} className='principles__row'>
              <div className='principles__name'>
                <span className='principles__index'>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Heading className='h3' level={4}>
                  {title}
                </Heading>
              </div>
              <Text className='body'>{body}</Text>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
};

export default Principles;
