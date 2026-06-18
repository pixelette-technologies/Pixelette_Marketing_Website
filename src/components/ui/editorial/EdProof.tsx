import Reveal from "./Reveal";

/**
 * EdProof - addresses "show me it works" HONESTLY, without fabrication.
 * Claims-safe by construction: no invented metrics, clients, logos or
 * testimonials. Real case studies / logos plug in here once consented
 * (Proof-Vault-Requirements). This is the proof discipline, stated.
 */

const POINTS = [
  "A measurement model agreed before any spend",
  "Transparent, regular reporting you actually read",
  "Real engagement results, walked through in the call",
  "No vanity metrics, no invented case studies"
];

export default function EdProof() {
  return (
    <section className="edSection edProof" id="proof">
      <div className="edWrap edProof__grid">
        <Reveal>
          <p className="edEyebrow">Proof</p>
          <p className="edProof__statement" style={{ marginTop: "2.2rem" }}>
            Proof, not <em>promises.</em>
          </p>
        </Reveal>
        <Reveal>
          <div className="edProof__body">
            <p>
              We do not lead with logos we cannot stand behind or numbers we
              cannot show you. What we can show you is the discipline: a clear
              measurement model, transparent reporting, and the real results of
              real engagements, shared directly in the conversation.
            </p>
            <p>Ask on the call, and we will walk you through the work.</p>
          </div>
          <ul className="edProof__list">
            {POINTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
