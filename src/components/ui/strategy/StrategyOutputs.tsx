import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { outputs } from "@/data/strategy";

// What a full engagement produces. Six outputs, each an input to the next.
//
// THE AUTO GRID, WHICH SEATS THREE HERE RATHER THAN THE USUAL FOUR. The
// sanctioned 'auto' idiom is repeat(auto-fit, minmax(min(17rem, 100%), 1fr))
// and it seats four against the 1160px wrap — which would give six items a row
// of four and an orphaned pair. A 21rem track seats three, so six land as a
// clean 3 + 3 and fall to 2 + 2 + 2 and then a single column on their own.
// That is a THIRD track minimum and it is declared here rather than in
// _surfaces.scss on purpose: it is one section's arithmetic, not a new
// site-wide idiom, and [[08 Design system constraints]] asks that a fourth
// idiom be questioned before it is added.
//
// THIS IS THE ONE PLACE ON THE PAGE WHERE A GRID IS RIGHT. The six dimensions
// are ordered and dependent, which is why the hero draws them as a line and
// the methodology as a spine. These six are DELIVERABLES — they are peers, the
// set is complete, and a buyer reads them to find out what they get. That is
// exactly the test [[08 Design system constraints]] states for reaching for a
// grid rather than rows.

const StrategyOutputs = () => {
  const { eyebrow, heading, lead, items, closing } = outputs;

  return (
    <Container className='main'>
      <section className='outputs'>
        <header>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='lead'>{lead}</Text>
        </header>

        <div className='outputs__grid' data-reveal='stagger'>
          {items.map(({ index, label, body }) => (
            <div key={index} className='outputs__item'>
              <Text className='outputs__index'>{index}</Text>
              <Heading className='h4 outputs__label' level={4}>
                {label}
              </Heading>
              <Text className='small'>{body}</Text>
            </div>
          ))}
        </div>

        {/* The closing line is the section's argument rather than a caption,
            so it takes .lead on its own rule rather than .small under the
            grid. It is the sentence a sceptical buyer is waiting for. */}
        <Text className='lead outputs__closing'>{closing}</Text>
      </section>
    </Container>
  );
};

export default StrategyOutputs;
