import { Container } from "@/components/common";
import { relevanceCopy } from "@/data/home";
import DuckPond from "./DuckPond";
import EditorialCopy from "./EditorialCopy";
import RailLabel from "./RailLabel";

// 04 — "Attention is easy to buy / Relevance isn't". Locked implementation
// specification, 28 Sep 2026. The playful section of the four: the ducks bob.
// Copy and rail are server-rendered; the pond owns its client boundary.

export default function RelevanceSection() {
  return (
    <section
      className='homeScene homeScene--relevance'
      aria-labelledby='relevance-title'
    >
      <div className='homeScene__art'>
        <DuckPond annotation={relevanceCopy.annotation} />
      </div>
      <div className='homeScene__body'>
        <Container className='main'>
          <div className='homeScene__inner'>
            <EditorialCopy copy={relevanceCopy} titleId='relevance-title' />
            <RailLabel lines={relevanceCopy.rail} className='homeScene__rail' />
          </div>
        </Container>
      </div>
    </section>
  );
}
