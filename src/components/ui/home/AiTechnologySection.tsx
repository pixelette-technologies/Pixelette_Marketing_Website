import { Container, ScrollMarquee } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aiTechnologyData } from "@/data/home";

// Section 06, "AI-accelerated. Human-led." — lifted out of the ItemsSection
// shell on 21 Sep 2026.
//
// WHY IT LEFT THE SHELL. The section used to be four PointItems in the --auto
// grid: a name and a sentence each, plus a closing line. The user removed the
// four sentences and the closing line, which leaves four bare headings — and
// four bare headings in a four-track grid is not a grid, it is a row of
// orphaned labels with two thirds of each cell empty. ItemsSection renders
// PointItem, PointItem requires a body, and the shell's whole justification is
// that six sections are genuinely the same shape. This one stopped being that
// shape the moment the bodies went, so it gets its own component rather than a
// fifth prop on a shell that already carries four.
//
// The header anatomy is unchanged and deliberately identical to the shell's —
// eyebrow, h2, .lead, the 34rem measure, the 20px and 24px gaps. A reader
// should not be able to tell that the top half of this section is rendered by
// different code, because nothing about the top half changed.
//
// The names are the body now. They run the full width as a strip that moves
// with the page scroll: see ScrollMarquee for the mechanism and the fallback,
// and _aiTechnologySection.scss for why the strip sits outside the container.
const AiTechnologySection = () => {
  const { eyebrow, heading, lead, marks } = aiTechnologyData;

  return (
    <section className='aiTechnologySection'>
      <Container className='main'>
        <header>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='lead'>{lead}</Text>
        </header>
      </Container>

      {/* Deliberately NOT inside the Container. The strip is full-bleed, and
          container_main is a 1160px wrap carrying `overflow: hidden` — inside
          it the words would be clipped to the text measure and the effect
          would read as a box rather than as the page moving. */}
      <ScrollMarquee items={marks} label={heading} />
    </section>
  );
};

export default AiTechnologySection;
