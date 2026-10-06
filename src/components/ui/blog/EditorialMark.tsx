import type { InsightFormat } from "@/data/insights/insights";

// The Insights page's one image language. 30 Sep 2026, to the final brief's
// "different content types should feel related".
//
// No photographs and no generated thumbnails on the cards: each format has a
// drawn mark on one ground, in one ink and one accent, so the grid reads as a
// designed set however few pieces are in it.
//
//   Point of view — a typographic mark: the display serif's opening quote
//   Playbook      — a structure: one step per section of the article, rising
//   Guide         — an outline: one row per section of the article
//   Signal        — a small, sharp cue: one spike on a flat line
//
// `seed` is the article's own section count (or, for a signal, any stable
// number), so the Playbook and Guide marks are drawn from the piece they
// stand for rather than repeated.
//
// Decorative throughout: the card's text carries every meaning, and the svg
// is aria-hidden. Colours are classes, read from tokens in the SCSS.

type Props = {
  format: InsightFormat;
  seed: number;
  small?: boolean;
  /** The article id. Two pieces with the same section count still draw
   *  differently: it moves the accent and reshapes the rows. */
  variant?: number;
};

export default function EditorialMark({ format, seed, small, variant = 0 }: Props) {
  if (format === "Signal") {
    const spike = 10 + (seed % 5) * 3;
    return (
      <svg
        className={`ixMark ixMark--signal${small ? " ixMark--small" : ""}`}
        viewBox='0 0 40 16'
        aria-hidden='true'
        focusable='false'
      >
        <polyline
          className='ixMark__stroke'
          points={`0,11 ${spike - 4},11 ${spike},2 ${spike + 4},14 ${spike + 7},11 40,11`}
        />
        <circle className='ixMark__accent' cx={spike} cy='2' r='1.6' />
      </svg>
    );
  }

  const n = Math.max(3, Math.min(seed, 6));

  return (
    <svg
      className={`ixMark ixMark--${format === "Point of view" ? "pov" : format.toLowerCase()}`}
      viewBox='0 0 240 132'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
    >
      <rect className='ixMark__ground' width='240' height='132' />

      {format === "Point of view" && (
        <>
          <text className='ixMark__glyph' x='26' y='168'>
            “
          </text>
          <line className='ixMark__rule' x1='132' y1='92' x2='212' y2='92' />
          <line className='ixMark__hair' x1='132' y1='102' x2='188' y2='102' />
        </>
      )}

      {format === "Playbook" &&
        Array.from({ length: n }, (_, i) => {
          const w = 180 / n;
          const x = 30 + i * w;
          // Odd ids rise step by step; even ids step unevenly, the accent moved.
          const rising = variant % 2 === 1;
          const h = rising ? 18 + (i * 64) / (n - 1) : 22 + ((i * 29 + variant * 11) % 60);
          const peak = rising ? n - 1 : (variant + 2) % n;
          const last = i === peak;
          return (
            <g key={i}>
              <rect
                className={last ? "ixMark__accentFill" : "ixMark__block"}
                x={x}
                y={110 - h}
                width={w - 8}
                height={h}
              />
              <text className='ixMark__num' x={x + 4} y={124}>
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}

      {format === "Guide" &&
        Array.from({ length: n }, (_, i) => {
          const y = 24 + i * (88 / (n - 1));
          const len = 150 - ((i * 37 + variant * 23) % 70);
          return (
            <g key={i}>
              <circle
                className={i === variant % n ? "ixMark__accent" : "ixMark__dot"}
                cx='34'
                cy={y}
                r='4'
              />
              <line className='ixMark__stroke' x1='50' y1={y} x2={50 + len} y2={y} />
            </g>
          );
        })}
    </svg>
  );
}
