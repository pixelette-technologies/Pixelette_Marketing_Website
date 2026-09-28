import { sectors, sectorSlug } from "@/data/industries/whoWeHelp";
import SectorMark from "./SectorMark";

// THE EIGHT, ON /industries — 28 Sep 2026, the creative transformation brief,
// section 15: "do not simply present eight identical cards".
//
// A numbered editorial index. Each sector is a row with a large numeral, its
// own abstract mark (SectorMark) and its one-line scope, and the rows
// alternate which side the mark sits on so the eye travels down the page
// rather than down a column. Hairlines between them, no boxes: a grid of
// equal boxes claims its contents are a complete, interchangeable set, and
// these eight are the brief's taxonomy of markets the company is built to
// support — examples of range, not a boundary (the "Don't see your sector?"
// block directly beneath says so).
//
// Every description is always on the page. The brief allows them to reveal
// on hover or tap, but nothing is gained by hiding one line of scope, and a
// reader on a phone would have to tap eight times to read what a desktop
// reader sees by looking. Hover and focus draw the row's mark instead.
//
// Each row carries an id, so the home page's preview can link to it; the row
// that is the link target is marked briefly on arrival.
//
// Rows are NOT links. They have nowhere to go: there are no per-sector pages
// for the eight, and the five that do exist are the deeper-experience band,
// kept separate by the brief. A row that looked clickable would promise one.

export default function SectorIndex({ level = 2 }: { level?: 2 | 3 }) {
  const Title = level === 2 ? "h2" : "h3";

  return (
    <ol className='sectorIndex'>
      {sectors.map((sector, i) => (
        <li
          key={sector.title}
          id={sectorSlug(sector.title)}
          className={`sectorRow${i % 2 ? " sectorRow--flip" : ""}`}
        >
          <span className='sectorRow__num' aria-hidden='true'>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className='sectorRow__text'>
            <Title className='sectorRow__title'>{sector.title}</Title>
            <p className='sectorRow__body'>{sector.body}</p>
          </div>
          <SectorMark index={i} tone={sector.tone} className='sectorRow__mark' />
        </li>
      ))}
    </ol>
  );
}
