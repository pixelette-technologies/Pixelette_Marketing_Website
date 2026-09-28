import type { SectorTone } from "@/data/industries/whoWeHelp";

// AN ABSTRACT IDENTIFIER PER SECTOR — 28 Sep 2026, the creative
// transformation brief, section 15: "if suitable bespoke imagery does not yet
// exist, create a strong graphic/typographic treatment rather than inserting
// poor stock imagery".
//
// One grammar, eight marks. Every sector gets the same six-by-six field of
// points; a different handful of them is picked out and joined, so the eight
// read as one family that differs in shape. Nothing is pictured — no doctor,
// no skyscraper, no robot, which are the clichés the brief names — and
// nothing is claimed: the shape says "a distinct market", not what the market
// looks like.
//
// Deterministic by index, so a sector's mark is the same on every page and
// every visit. Colour is the sector's tone pair from _tokens.scss, which the
// 23 Sep note there reserves for the sector list; this is still that list.

const GRID = 6;
const STEP = 20;
const OFFSET = 10;

function seeded(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shapeFor(index: number) {
  const r = seeded(index + 3);
  const picked = new Set<number>();
  // Five to seven points, kept off the outermost ring more often than not so
  // the shape sits inside the field rather than on its edge.
  const count = 5 + (index % 3);
  while (picked.size < count) {
    const cell = Math.floor(r() * GRID * GRID);
    const x = cell % GRID;
    const y = Math.floor(cell / GRID);
    const edge = x === 0 || y === 0 || x === GRID - 1 || y === GRID - 1;
    if (edge && r() < 0.6) continue;
    picked.add(cell);
  }
  const points = [...picked].map(cell => ({
    cell,
    x: OFFSET + (cell % GRID) * STEP,
    y: OFFSET + Math.floor(cell / GRID) * STEP
  }));
  // Joined in angular order round their own centre, so the outline never
  // crosses itself.
  const cx = points.reduce((a, p) => a + p.x, 0) / points.length;
  const cy = points.reduce((a, p) => a + p.y, 0) / points.length;
  points.sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)
  );
  return { points, picked };
}

export default function SectorMark({
  index,
  tone,
  className = ""
}: {
  index: number;
  tone: SectorTone;
  className?: string;
}) {
  const { points, picked } = shapeFor(index);
  const d = points.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join("") + "Z";

  return (
    <svg
      className={`sectorMark sectorMark--${tone} ${className}`}
      viewBox='0 0 120 120'
      aria-hidden='true'
      focusable='false'
    >
      {Array.from({ length: GRID * GRID }, (_, cell) =>
        picked.has(cell) ? null : (
          <circle
            key={cell}
            className='sectorMark__dot'
            cx={OFFSET + (cell % GRID) * STEP}
            cy={OFFSET + Math.floor(cell / GRID) * STEP}
            r={1.4}
          />
        )
      )}
      <path className='sectorMark__shape' d={d} pathLength={1} />
      {points.map(p => (
        <circle
          key={p.cell}
          className='sectorMark__node'
          cx={p.x}
          cy={p.y}
          r={3.2}
        />
      ))}
    </svg>
  );
}
