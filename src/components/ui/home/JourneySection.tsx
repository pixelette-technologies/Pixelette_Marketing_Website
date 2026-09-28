import { Container } from "@/components/common";
import { journeyCopy } from "@/data/home";
import CommercialJourney from "./CommercialJourney";

// The frame around the commercial journey. The headline is set at statement
// size: it is one of the page's three pieces of punctuation (see
// EditorialStatement), made this section's title because the four stages
// beneath it are its answer.

export default function JourneySection() {
  const { eyebrow, statement, support } = journeyCopy;

  return (
    <section className='journey sec'>
      <Container className='main'>
        <header className='journey__head'>
          <h2 className='eyebrow'>{eyebrow}</h2>
          <h3 className='statement__text journey__statement'>
            <span className='statement__lead'>{statement.lead}</span>{" "}
            <span className='statement__turn'>{statement.turn}</span>
          </h3>
          <p className='lead journey__support'>{support}</p>
        </header>

        <CommercialJourney />
      </Container>
    </section>
  );
}
