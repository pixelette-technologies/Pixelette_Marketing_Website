// The small stacked label on the right-hand edge of the home page's first four
// sections, with a vertical hairline beside it (28 Sep 2026). The words come
// verbatim from the approved reference image.
//
// It is real text, not aria-hidden. The lines are separate blocks for the
// stacked look and joined by real spaces, so it reads as a phrase.

export default function RailLabel({
  lines,
  className = ""
}: {
  lines: readonly string[];
  className?: string;
}) {
  return (
    <p className={`railLabel ${className}`}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className='railLabel__line'>
          {i > 0 && " "}
          {line}
        </span>
      ))}
    </p>
  );
}
