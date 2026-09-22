"use client";

import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import {
  diagnosticLenses,
  diagnosticResult,
  diagnosticSection
} from "@/data/strategy";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DiagnosticReadout from "./DiagnosticReadout";

// The instrument. The one client component on this page, and the only one on
// the site that holds state a visitor can see change.
//
// WHAT IT ACTUALLY DOES, stated plainly because the copy has to be able to
// stand behind it: it keeps six answers in React state, draws them as six
// four-step measures, and takes the MINIMUM — ties going to the earliest lens,
// because the lenses are a dependency chain and the earliest unresolved one is
// the one the others are waiting on. That is the whole algorithm. There is no
// model, no request, no storage and no analytics event, which is what lets the
// hero say "nothing is submitted and nothing is stored". If that ever stops
// being true, the hero copy changes in the same commit.
//
// NO PERSISTENCE, DELIBERATELY. localStorage would survive a refresh and would
// also mean this page stores something about a visitor, which is a sentence
// the cookie policy would then have to carry. A diagnostic that takes ninety
// seconds does not need to be resumable at that price.
//
// THE CONTROLS ARE REAL RADIOS. appearance: none restyles the dot, which means
// the focus ring lands on the input the browser already focuses and the arrow
// keys already work within the group — none of which is true of a div with an
// onClick, and all of which this codebase has had to retrofit once already
// (see Accordion.tsx, where the toggle was a div with a cursor style).
//
// THE SELECTED ROW IS MARKED BY A CLASS FROM REACT, not by :has(:checked).
// React knows which option is selected, and a state class cannot be defeated
// by a browser that has not shipped :has.
//
// FOCUS MOVES WITH THE STEP. Without it, pressing Next leaves focus on the
// button and a screen-reader user is never told the question changed. It is
// skipped on the first render — the page must not yank focus on load — and it
// passes preventScroll, so the browser does not scroll the panel around under
// a sighted reader who is already looking at it.
//
// NO data-reveal INSIDE THE PANEL. ScrollReveal hides what it observes at
// opacity 0 until it is scrolled to, and interactive controls are the last
// thing that should depend on an IntersectionObserver having run. The section
// is a block of .page-flow, so it fades in as one object and the controls
// inside it are never individually hidden.

const LENS_COUNT = diagnosticLenses.length;
const TOP_LEVEL = 4;

/** "1" -> "01". The mono numerals everywhere on this site are two digits. */
const pad = (n: number) => String(n).padStart(2, "0");

const StrategyDiagnostic = () => {
  const { eyebrow, heading, lead, stepSeparator, next, back, finish } =
    diagnosticSection;

  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    diagnosticLenses.map(() => null)
  );
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const legendRef = useRef<HTMLLegendElement | null>(null);
  const resultRef = useRef<HTMLHeadingElement | null>(null);
  // Nothing is focused until the visitor has actually done something.
  const interacted = useRef(false);

  useEffect(() => {
    if (!interacted.current) return;
    const target = done ? resultRef.current : legendRef.current;
    target?.focus({ preventScroll: true });
  }, [step, done]);

  const allAnswered = answers.every(answer => answer !== null);
  const lens = diagnosticLenses[step];

  const select = (option: number) => {
    interacted.current = true;
    setAnswers(current =>
      current.map((answer, index) => (index === step ? option : answer))
    );
  };

  // One primary control, and its meaning follows the state rather than the
  // position: once all six are answered it always offers the reading, so a
  // visitor who has come back to change one answer is one press from the
  // updated result instead of clicking Next through the rest.
  const advance = () => {
    interacted.current = true;
    if (allAnswered) setDone(true);
    else setStep(current => Math.min(current + 1, LENS_COUNT - 1));
  };

  const goBack = () => {
    interacted.current = true;
    setStep(current => Math.max(current - 1, 0));
  };

  const revisit = (index: number) => {
    interacted.current = true;
    setDone(false);
    setStep(index);
  };

  const restart = () => {
    interacted.current = true;
    setAnswers(diagnosticLenses.map(() => null));
    setStep(0);
    setDone(false);
  };

  // The reading. Levels are 1-4 and read straight off the option position, so
  // there is no scoring table anywhere to drift out of step with the copy.
  const levels = answers.map(answer => (answer === null ? 0 : answer + 1));
  const lowest = Math.min(...levels);
  const resolved = done && lowest === TOP_LEVEL;
  const primaryIndex = levels.indexOf(lowest);
  const alsoLowest = diagnosticLenses.filter(
    (_, index) => levels[index] === lowest && index !== primaryIndex
  );

  return (
    <Container className='main'>
      <section className='diagnostic' id='diagnostic'>
        <header>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='lead'>{lead}</Text>
        </header>

        {/* THE PAGE'S ONE SIGNATURE MARK, and it is the card form of it rather
            than .rule-cap. That was settled by looking at the page: the section
            carried .rule-cap on its own top hairline, and because it opens
            directly beneath the dark band there was no light rule for the
            segment to cap — it rendered as a loose crimson dash sitting under
            a black band, which is the same fault the About page's cap had and
            was moved for. A section following a dark band does not need a
            hairline in any case; the band edge is the separation.

            .card-feature is the device's second and last sanctioned
            appearance, already in use on the services template, so this is
            house vocabulary and not a third mannerism. It marks the object the
            page exists for. */}
        <div className='diagnostic__panel card-feature'>
          <div className='diagnostic__question'>
            {done ? (
              <div className='diagnosticResult'>
                <Text className='eyebrow'>{diagnosticResult.eyebrow}</Text>

                {/* A raw h4 rather than <Heading>: it takes a ref, which the
                    shared component does not forward. The .h3 SCALE on an h4
                    ELEMENT is the house split — the section eyebrow is the h2
                    and the visual .h2 above is the h3. */}
                <h4 className='h3 diagnosticResult__heading' ref={resultRef} tabIndex={-1}>
                  {resolved ? (
                    diagnosticResult.resolved.heading
                  ) : (
                    <>
                      {diagnosticResult.headingPrefix}{" "}
                      <span>{diagnosticLenses[primaryIndex].name}</span>
                    </>
                  )}
                </h4>

                <Text className='body'>
                  {resolved
                    ? diagnosticResult.resolved.body
                    : diagnosticLenses[primaryIndex].reading}
                </Text>

                {!resolved && alsoLowest.length > 0 && (
                  <Text className='small diagnosticResult__tie'>
                    {diagnosticResult.tiePrefix}{" "}
                    {alsoLowest.map(other => other.name).join(", ")}
                  </Text>
                )}

                {!resolved && (
                  <Text className='small diagnosticResult__order'>
                    {diagnosticResult.orderNote}
                  </Text>
                )}

                <div className='diagnostic__actions'>
                  <Link
                    href={
                      resolved
                        ? diagnosticResult.resolved.cta.to
                        : diagnosticResult.cta.to
                    }
                    className='btn'
                  >
                    {resolved
                      ? diagnosticResult.resolved.cta.label
                      : diagnosticResult.cta.label}
                  </Link>
                  <button type='button' className='btn2' onClick={restart}>
                    {diagnosticResult.restart}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className='diagnostic__meta'>
                  <Text className='eyebrow'>{lens.name}</Text>
                  <Text className='diagnostic__step'>
                    {pad(step + 1)} {stepSeparator} {pad(LENS_COUNT)}
                  </Text>
                </div>

                {/* min-width: 0 on the fieldset in the stylesheet — a fieldset
                    defaults to min-width: min-content and would otherwise
                    refuse to let the two-column panel fold. */}
                <fieldset className='diagnostic__field'>
                  <legend
                    className='h3 diagnostic__legend'
                    ref={legendRef}
                    tabIndex={-1}
                  >
                    {lens.question}
                  </legend>

                  <div className='diagnostic__options'>
                    {lens.options.map((option, index) => (
                      <label
                        key={option}
                        className={
                          answers[step] === index
                            ? "dqOption dqOption--on"
                            : "dqOption"
                        }
                      >
                        <input
                          type='radio'
                          className='dqOption__input'
                          name={lens.id}
                          value={index}
                          checked={answers[step] === index}
                          onChange={() => select(index)}
                        />
                        <span className='dqOption__text'>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className='diagnostic__actions'>
                  <button
                    type='button'
                    className='btn'
                    onClick={advance}
                    disabled={answers[step] === null}
                  >
                    {allAnswered ? finish : next}
                  </button>
                  {step > 0 && (
                    <button type='button' className='btn2' onClick={goBack}>
                      {back}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <DiagnosticReadout
            answers={answers}
            current={done ? null : step}
            canRevisit={allAnswered}
            onJump={revisit}
          />
        </div>
      </section>
    </Container>
  );
};

export default StrategyDiagnostic;
