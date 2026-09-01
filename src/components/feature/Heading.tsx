interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Optional, defaults to 2 (h1 reserved for the page hero title)
}

const tagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

// Phase F. This used to emit `heading_${className}`, and Text emitted
// `text_${className}`.
//
// That single template literal is why the design system never reached the
// page. The Appendix E primitives are named .h1, .h2, .h3, .h4, .eyebrow,
// .lead, .body and .small, and this component renamed every one of them on the
// way out — className='h2' arrived in the DOM as `heading_h2`, which is
// defined nowhere. Between them Heading and Text render almost every heading
// and paragraph on the site, so the entire type layer of the conversion was
// unreachable through the two components that needed it most. It compiled, it
// linted, and it did nothing.
//
// It also only prefixed the FIRST token, because the value is interpolated as
// one string: className='primary uppercase' became `heading_primary uppercase`.
// The legacy vocabulary was built around that quirk, which is why the old
// classes worked and the new ones did not.
//
// The class is emitted verbatim now. The legacy call sites carry their own
// `heading_` and `text_` prefixes explicitly, which is where the prefix always
// belonged — a component should not be inventing class names its callers
// cannot see.
const Heading = ({
  className = "",
  children,
  level = 2
}: HeadingProps) => {
  const Tag = tagMap[level];

  return <Tag className={className}>{children}</Tag>;
};

export default Heading;
