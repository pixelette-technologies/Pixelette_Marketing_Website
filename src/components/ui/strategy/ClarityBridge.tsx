import { Container } from "@/components/common";
import { ASSESS_ANCHOR, clarityBridge, dimensions } from "@/data/strategy";

// "Clarity before activity", as a bridge rather than a band (30 Sep 2026).
//
// It replaced a full-viewport dark band that held the phrase, a paragraph and
// the six-dimension wave. The final brief kept the phrase, removed the band
// and removed the wave ("no abstract visual requiring explanation"): about a
// third of a screen, the phrase, one line and the six names in plain text.
//
// It folds away once the diagnostic starts, so Question 1 sits directly under
// the compact hero. It is an explanation for before the visitor begins.

const ClarityBridge = ({ collapsed }: { collapsed: boolean }) => (
  <div className='clarityBridge' inert={collapsed}>
    <div className='clarityBridge__inner'>
      <Container className='main'>
        <section className='clarityBridge__body' id={ASSESS_ANCHOR}>
          <h2 className='clarityBridge__heading'>{clarityBridge.heading}</h2>
          <p className='clarityBridge__line'>{clarityBridge.line}</p>
          <ol className='clarityBridge__dimensions'>
            {dimensions.map(dimension => (
              <li key={dimension.id}>{dimension.name}</li>
            ))}
          </ol>
        </section>
      </Container>
    </div>
  </div>
);

export default ClarityBridge;
