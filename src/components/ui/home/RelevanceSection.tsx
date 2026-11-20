import { Container } from "@/components/common";
import { relevanceCopy } from "@/data/home";
import DuckPond from "./DuckPond";
import EditorialCopy from "./EditorialCopy";
import HomeSceneReveal from "./HomeSceneReveal";

// 04 — "Attention is easy to buy / Relevance isn't".
// Original duck pond + copy, as a rectangular band (copy left, art right).

export default function RelevanceSection() {
  return (
    <HomeSceneReveal
      className='homeScene homeScene--relevance'
      labelledBy='relevance-title'
    >
      <div className='homeScene__art'>
        <DuckPond annotation={relevanceCopy.annotation} />
      </div>
      <div className='homeScene__body'>
        <Container className='main'>
          <div className='homeScene__inner'>
            <EditorialCopy copy={relevanceCopy} titleId='relevance-title' />
          </div>
        </Container>
      </div>
    </HomeSceneReveal>
  );
}
