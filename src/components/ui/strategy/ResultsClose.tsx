"use client";

import { resultsCta } from "@/data/strategy";
import { track } from "@/lib/strategyDiagnostic";
import Link from "next/link";
import type { CSSProperties } from "react";

// "A score is only the starting point" — the ask, only after the result, on
// a full-bleed burgundy band for the separation the brief asks for.
//
// It is NOT .band-dark. That class is the panel gradient and route-walk
// counts it against the three-per-route budget; this is the diagnostic's own
// burgundy, scoped to its own class. The destination is unchanged:
// CONTACT_HREF, the enquiry form. No email gate.

const ResultsClose = ({
  reveal,
  onRetake
}: {
  reveal: boolean;
  onRetake: () => void;
}) => (
  <div
    className={reveal ? "dxClose is-revealing" : "dxClose"}
    style={{ "--d": "2900ms" } as CSSProperties}
  >
    <div className='container_main'>
      <section className='dxClose__body dxR'>
        <h2 className='dxClose__heading'>{resultsCta.heading}</h2>
        <p className='dxClose__text'>{resultsCta.body}</p>
        <div className='dxClose__actions'>
          <Link
            href={resultsCta.cta.to}
            className='dxClose__primary'
            onClick={() => track("strategy_diagnostic_cta_clicked")}
          >
            {resultsCta.cta.label}
          </Link>
          <button type='button' className='dxClose__secondary' onClick={onRetake}>
            {resultsCta.retake}
          </button>
        </div>
      </section>
    </div>
  </div>
);

export default ResultsClose;
