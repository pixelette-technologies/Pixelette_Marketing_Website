import Reveal from "./Reveal";

/**
 * EdThesis - the belief-shift statement (RULES-012). Why retained, why a system.
 * Claims-safe: positioning argument only.
 */
export default function EdThesis() {
  return (
    <section className="edSection edSection--deep edThesis">
      <div className="edWrap edThesis__grid">
        <Reveal>
          <p className="edEyebrow">Why retained</p>
          <p className="edThesis__statement" style={{ marginTop: "2.2rem" }}>
            Most marketing stays busy. Almost none of it <em>compounds.</em>
          </p>
        </Reveal>
        <Reveal className="edThesis__body">
          <p>
            Agencies ship campaigns. Freelancers ship tasks. Both reset close to
            zero the moment the work stops, and the next quarter starts again
            from a standstill.
          </p>
          <p>
            We run growth as one connected system, on retainer, so every month
            builds on the last. Strategy sharpens demand, demand creates proof,
            and proof compounds into durable growth you can plan around.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
