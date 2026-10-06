import Link from "next/link";
import type { EditorialSectionCopy } from "@/data/home";

// The copy column shared by home sections 02, 03 and 04 (28 Sep 2026): the
// section mark (number, hairline, eyebrow), the headline with its optional
// brand-tone last line, the lead and one text link.
//
// A SERVER COMPONENT, deliberately. Each section's picture is the only part
// that moves, and it owns its own client boundary, so the words are rendered
// on the server no matter what the illustration beside them does.
//
// Every headline line is its own block so the breaks fall exactly where the
// reference puts them at desktop widths, and the lines are joined by real
// spaces so a screen reader hears one sentence, not run-together words.

export default function EditorialCopy({
  copy,
  titleId,
  className = ""
}: {
  copy: EditorialSectionCopy;
  /** Lets the section name itself by its headline (aria-labelledby). */
  titleId?: string;
  className?: string;
}) {
  return (
    <div className={`editorialCopy ${className}`}>
      <p className='editorialCopy__mark'>
        <span className='editorialCopy__number'>{copy.number}</span>
        <span className='editorialCopy__rule' aria-hidden='true' />
        <span className='editorialCopy__eyebrow'>{copy.eyebrow}</span>
      </p>

      <h2 className='editorialCopy__title' id={titleId}>
        {copy.headline.map((line, i) => (
          <span key={line} className='editorialCopy__line'>
            {i > 0 && " "}
            {line}
          </span>
        ))}
        {copy.accent && (
          <span className='editorialCopy__line editorialCopy__line--accent'>
            {" "}
            {copy.accent}
          </span>
        )}
      </h2>

      <p className='editorialCopy__lead'>{copy.lead}</p>

      <Link href={copy.cta.to} className='textLink'>
        {copy.cta.label}
        <span aria-hidden='true'>→</span>
      </Link>
    </div>
  );
}
