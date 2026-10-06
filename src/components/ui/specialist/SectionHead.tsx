import type { SpecialistSectionHead } from "@/data/services/specialist";

// A section's opening: pink mono eyebrow, burgundy display heading, plum-ink
// intro. With no heading the eyebrow's words ARE the heading, set at display
// size, so no section ships a heading written only to fill the slot.
//
// The heading is always the <h2>; the eyebrow above it is a label, not a
// second heading, so the outline reads one entry per section.

const SectionHead = ({
  eyebrow,
  heading,
  intro,
  id,
  className = ""
}: SpecialistSectionHead & { id?: string; className?: string }) => (
  <header className={`spHead ${className}`.trim()}>
    {heading && eyebrow && <p className='spHead__eyebrow'>{eyebrow}</p>}
    <h2 className='spHead__heading' id={id}>
      {heading ?? eyebrow}
    </h2>
    {intro && <p className='spHead__intro'>{intro}</p>}
  </header>
);

export default SectionHead;
