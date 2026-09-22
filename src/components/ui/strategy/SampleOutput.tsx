import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { sampleOutput } from "@/data/strategy";

// The sample strategic output. The page's second and last dark band.
//
// EVERY SLOT DESCRIBES WHAT BELONGS IN IT. Nothing is filled in with a
// plausible-looking answer, and that is the whole design of this section
// rather than a shortcut. A sample with convincing content in it is
// indistinguishable from a real client's work — and this site has already had
// to delete fifteen unsourced performance figures for precisely that reason,
// on pages where nobody could later say where the numbers came from. A
// framework with its slots named is also more useful to a prospect: it shows
// the shape of the thinking instead of showing somebody else's answers.
//
// The bracketed tokens in the position line are the point of it. "For
// [priority customer], [brand] is the [category] that [primary value], because
// [proof]" is a SENTENCE STRUCTURE, and filling the brackets in is the
// engagement. Left as brackets it cannot be mistaken for a claim.
//
// THE DISCLAIMER IS ON THE ARTEFACT, not only in the section header. The
// document is the thing somebody would screenshot, so the stamp travels with
// it.
//
// THE DARK BAND. Two of three on this route; the methodology has the other and
// the diagnostic deliberately has none. Here it does a job nothing else can:
// the document sits on the dark ground as a light panel, which is what makes
// it read as an artefact being shown rather than as more page. That is the
// same light-card-on-dark treatment the Growth System's cards settled on.

const SampleOutput = () => {
  const { eyebrow, heading, lead, stamp, position, blocks } = sampleOutput;

  return (
    <div className='band-dark'>
      <Container className='main'>
        <section className='sample'>
          <header>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
          </header>

          <div className='sampleDoc'>
            <p className='sampleDoc__stamp'>{stamp}</p>

            <div className='sampleDoc__position'>
              <p className='sampleDoc__label'>{position.label}</p>
              {/* The display face at a large size, because this sentence is
                  the output everything else supports. */}
              <p className='sampleDoc__statement'>{position.template}</p>
            </div>

            <div className='sampleDoc__blocks'>
              {blocks.map(block => (
                <section key={block.label} className='sampleDoc__block'>
                  <p className='sampleDoc__label'>{block.label}</p>
                  <dl className='sampleDoc__rows'>
                    {block.rows.map(row => (
                      <div key={row.term} className='sampleDoc__row'>
                        <dt>{row.term}</dt>
                        {/* The slot, set in italic so it reads as an
                            instruction to be replaced rather than as content.
                            No invented answer anywhere in this block. */}
                        <dd>{row.slot}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default SampleOutput;
