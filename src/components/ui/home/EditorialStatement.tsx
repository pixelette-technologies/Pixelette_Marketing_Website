import type { ReactNode } from "react";
import { Container } from "@/components/common";

// VISUAL PUNCTUATION — 28 Sep 2026, the creative transformation brief,
// sections 8 and 22.
//
// A statement set large, with whitespace and at most one supporting line. No
// cards, no eyebrow, no CTA: its job is to reset the rhythm between two
// chapters, and anything added to it turns it back into a section.
//
// The home page carries three, and the brief's warning — "do not
// automatically use all of these" — is why it is three and not four:
//
//   1. "More marketing activity isn't a growth strategy." after the proof, the
//      interruption the brief asks for by name.
//   2. "Marketing should have somewhere to go." heads the commercial journey,
//      which is the answer to it, so it is that section's title rather than a
//      fourth free-standing slab.
//   3. "If it doesn't move the business, why are we measuring it?" before the
//      intelligence chapter, which is about measurement.
//
// The statement is an <h2>. It is the only heading its section has, and it is
// what a reader skimming the outline should see.
//
// `turn` is the half of the statement set in the brand tone and italic. The
// motion is the site's scroll reveal and nothing else: a statement that
// animates word by word makes the reader wait for it.

export default function EditorialStatement({
  lead,
  turn,
  support,
  align = "start"
}: {
  lead: string;
  turn: string;
  support?: ReactNode;
  align?: "start" | "end";
}) {
  return (
    <section className={`statement statement--${align}`}>
      <Container className='main'>
        <h2 className='statement__text'>
          <span className='statement__lead'>{lead}</span>{" "}
          <span className='statement__turn'>{turn}</span>
        </h2>
        {support && <p className='statement__support'>{support}</p>}
      </Container>
    </section>
  );
}
