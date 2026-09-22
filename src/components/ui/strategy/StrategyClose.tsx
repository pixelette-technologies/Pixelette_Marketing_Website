"use client";

import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { DIAGNOSTIC_ANCHOR, strategyClose } from "@/data/strategy";
import {
  parseStoredRaw,
  readServerSnapshot,
  readStoredRaw,
  subscribeToStoredState,
  track
} from "@/lib/strategyDiagnostic";
import Link from "next/link";
import { useSyncExternalStore } from "react";

// The closing section. A client component for ONE REASON: the primary control
// says "Start the diagnostic" or "Review my results" depending on whether the
// visitor has finished, and that is a fact only the browser knows.
//
// IT NEVER RESTARTS ANYTHING. Both labels point at the same anchor; what has
// changed is what is waiting there. A closing button that quietly wiped twelve
// answers would be the worst possible thing on this page.
//
// HOW IT KNOWS, WITHOUT A PROVIDER. It reads the same external store the
// diagnostic writes — the one `subscribeToStoredState` covers, which watches
// both the in-page event and the cross-tab `storage` event. A context would
// mean wrapping the whole route in a provider for one boolean consumed by one
// component, and lifting the state into the page would make the page a client
// component and take the rest of its copy out of the HTML, which is exactly
// what the brief's SEO requirement forbids.
//
// THE SERVER RENDERS THE "START" LABEL, because the server snapshot is null.
// A returning visitor sees the start wording until hydration swaps it.
// Everything else in this section is in the HTML either way, so a crawler and
// a reader with JavaScript off lose nothing but the alternate label.

const StrategyClose = () => {
  const { eyebrow, heading, lead, primary, secondary, aside } = strategyClose;

  const raw = useSyncExternalStore(
    subscribeToStoredState,
    readStoredRaw,
    readServerSnapshot
  );
  const completed = parseStoredRaw(raw)?.completed === true;

  return (
    <div className='band-closing'>
      <Container className='main'>
        <section className='strategyClose'>
          <div className='strategyClose__primary'>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>

            <div className='strategyClose__actions'>
              {/* A fragment link, so the scroll is the browser's and works
                  before hydration. _base.scss carries the smooth behaviour and
                  a scroll-padding-top that tracks the sticky header. */}
              <a href={`#${DIAGNOSTIC_ANCHOR}`} className='btn'>
                {completed ? primary.completedLabel : primary.label}
              </a>
              <Link
                href={secondary.to}
                className='btn2'
                onClick={() => track("strategy_diagnostic_cta_clicked")}
              >
                {secondary.label}
              </Link>
            </div>
          </div>

          <div className='strategyClose__aside'>
            <Text className='small'>{aside.body}</Text>
            <Link href={aside.link.to} className='link strategyClose__link'>
              {aside.link.label}
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default StrategyClose;
