import Link from "next/link";
import type { EditorialSectionCopy } from "@/data/home";

// The copy column shared by home sections 02, 03 and 05.
// Left text matches the locked-service hero: brand eyebrow, display heading
// with italic brand accent, body lead, one text link. Index + hairline removed
// 26 Nov 2026 for consistency with the approved Paid Media left copy.

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
      <p className='editorialCopy__eyebrow'>{copy.eyebrow}</p>

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
