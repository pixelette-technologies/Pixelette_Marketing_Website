import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutPrinciples } from "@/data/aboutus";

// What guides the work. It replaces OurValues, which was four tinted cards on
// a tinted ground — two of them the same colour as the band behind them — and
// four sentences of collaboration-and-integrity copy.
//
// THE TREATMENT IS AN INDEX, NOT A CARD GRID. Each principle is a row on a
// hairline: the name on the left, the single line that qualifies it on the
// right. It is the one editorial device on the page that is neither a card nor
// a column, which is exactly why it sits between two sections that are.
//
// The rows wrap to two lines on a narrow screen without a media query — the
// name column has a flex basis it cannot hold below roughly 40rem, so the
// qualifier drops beneath it and the hairlines carry on doing their job.

const Principles = () => {
  const { eyebrow, heading, items } = aboutPrinciples;

  // NO GROUND WRAPPER, and this was checked by eye rather than assumed.
  // .band-alt paints --color-band, and _base.scss already gives the BODY
  // --color-band, so an .band-alt wrapper here would declare a ground change
  // that does not happen — the section renders identically either way. The
  // page's light sections all sit on the site's own warm cream and the two
  // dark bands are what the rhythm is made of.
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

        <div className='principles__list' data-reveal='stagger'>
          {items.map(({ title, body }) => (
            <div key={title} className='principles__row'>
              <Heading className='h3' level={4}>
                {title}
              </Heading>
              <Text className='body'>{body}</Text>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Principles;
