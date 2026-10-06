import type { GrowthMode } from "@/data/services/specialist/growthIntelligenceDemo";

// INTERPRETATION, THEN DECISION. The panel says in words everything the
// charts show, so the conclusion never depends on reading a line or a colour:
// what changed, why it matters, what to look at next — then the one decision
// statement the evidence supports. On a mode change the parent re-keys it and
// the copy fades and rises in (about 250ms).

const InsightPanel = ({ mode }: { mode: GrowthMode }) => {
  const blocks = [
    { label: "What changed", insight: mode.changed },
    { label: "Why it matters", insight: mode.matters },
    { label: "What to look at next", insight: mode.next }
  ];

  return (
    <>
      <div className='giStage'>
        <p className='giStage__label'>
          <span aria-hidden='true'>02</span> Interpretation
        </p>
        <ul className='giInsight'>
          {blocks.map(({ label, insight }) => (
            <li className='giInsight__block' key={label}>
              <p className='giInsight__label'>{label}</p>
              <h3 className='giInsight__heading'>{insight.heading}</h3>
              <p className='giInsight__body'>{insight.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className='giDecision'>
        <p className='giStage__label giStage__label--onDark'>
          <span aria-hidden='true'>03</span> Decision
        </p>
        <p className='giDecision__statement'>{mode.decision}</p>
      </div>
    </>
  );
};

export default InsightPanel;
