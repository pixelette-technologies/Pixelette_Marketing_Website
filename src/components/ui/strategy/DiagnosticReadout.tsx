import { Text } from "@/components/feature";
import { diagnosticLenses, diagnosticSection } from "@/data/strategy";
import { FC } from "react";

const LEVELS = 4;

export interface DiagnosticReadoutProps {
  /** One entry per lens, in lens order. null until that lens is answered. */
  answers: (number | null)[];
  /** The lens being asked, or null once the reading is showing. */
  current: number | null;
  /** Rows become buttons once every lens has an answer. Until then there is
   *  exactly one way forward and the readout is an instrument, not a control. */
  canRevisit: boolean;
  onJump: (index: number) => void;
}

// The readout. Six measures that fill as the questions are answered.
//
// WHAT THE TICKS ARE. Four segments per lens, filled to the position of the
// chosen statement — option 1 of 4 fills one, option 4 of 4 fills all four.
// That is the whole calculation on this page. It is not a model, not a
// benchmark and not research; it is the visitor's own click, drawn.
//
// WHICH IS EXACTLY WHY THE FRACTION IS VISIBLE TEXT. The ticks are decoration
// and carry aria-hidden; "3/4" beside them is the accessible value, and it is
// rendered rather than hidden because a bar chart nobody can read the numbers
// off is the shape that invites people to assume a score they cannot check.
// The caption under the list says in words what the number is. There is no
// visually-hidden utility in this codebase and this component is not the place
// to introduce one.
//
// NO CHART LIBRARY. Six rows of four spans. The site already refuses a fourth
// layout idiom without asking, and it would certainly refuse a dependency for
// this.
const DiagnosticReadout: FC<DiagnosticReadoutProps> = ({
  answers,
  current,
  canRevisit,
  onJump
}) => {
  const { readoutLabel, readoutNote, revisitHint } = diagnosticSection;

  return (
    <div className='diagnosticReadout'>
      <Text className='label'>{readoutLabel}</Text>

      <ul className='diagnosticReadout__list'>
        {diagnosticLenses.map((lens, index) => {
          const answer = answers[index];
          const level = answer === null ? 0 : answer + 1;

          const row = (
            <>
              <span className='diagnosticReadout__name'>{lens.short}</span>
              <span className='diagnosticReadout__ticks' aria-hidden='true'>
                {Array.from({ length: LEVELS }, (_, tick) => (
                  <span
                    key={tick}
                    className={
                      tick < level
                        ? "diagnosticReadout__tick diagnosticReadout__tick--on"
                        : "diagnosticReadout__tick"
                    }
                  />
                ))}
              </span>
              <span className='diagnosticReadout__value'>
                {level === 0 ? "—" : `${level}/${LEVELS}`}
              </span>
            </>
          );

          return (
            <li
              key={lens.id}
              className={[
                "diagnosticReadout__row",
                level > 0 && "diagnosticReadout__row--on",
                index === current && "diagnosticReadout__row--current"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {canRevisit ? (
                <button
                  type='button'
                  className='diagnosticReadout__jump'
                  onClick={() => onJump(index)}
                  // The row reads "Market 3/4" on its own; this says what
                  // pressing it does, which the row cannot.
                  title={revisitHint}
                >
                  {row}
                </button>
              ) : (
                row
              )}
            </li>
          );
        })}
      </ul>

      <Text className='small diagnosticReadout__note'>{readoutNote}</Text>
    </div>
  );
};

export default DiagnosticReadout;
