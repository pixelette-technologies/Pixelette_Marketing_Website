import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading } from "@/components/feature";

// 12 Nov 2026 brief §4.2 — five-part structure shared by the service pages.
// The brief does not name the five parts, so they are untitled slots.

type Props = {
  title: string;
  gated?: boolean;
};

export default function PublicSectorServiceTemplate({
  title,
  gated = true
}: Props) {
  return (
    <>
      {gated ? <MockupBanner /> : null}
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              {title}
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        {[1, 2, 3, 4, 5].map(part => (
          <section
            key={part}
            className='sec'
            aria-label={`Part ${part}`}
          />
        ))}
      </Container>
    </>
  );
}
