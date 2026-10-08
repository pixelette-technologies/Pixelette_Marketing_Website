"use client";

import type { SpecialistConnection } from "@/data/services/specialist";
import { useId, useState } from "react";

// 05 How this connects. The page's one interactive figure: this specialist
// capability in the centre, three adjacent Pixelette capabilities around it,
// and beside it the explanation for whichever is selected — "if this is the
// real constraint, the work may need to move here".
//
// DELIBERATELY NOT A NETWORK DIAGRAM. One centre, three spokes, drawn once.
//
// The nodes are native buttons with aria-pressed, so the state is announced
// and is not carried by colour alone: the selected node is FILLED and its
// spoke turns SOLID; the others are outlined with dashed spokes. Selection
// follows click, tap and keyboard focus, as the brief asks; the explanation
// is a polite live region, so it is read out when it changes.
//
// The svg carries only the three spokes and sits under HTML positioned in
// percentages of the same box, so the two agree at every width. Below 768px
// the spokes go and the nodes stack as a list under the centre.

// Node positions as percentages of the figure: top, lower left, lower right.
const POSITIONS = [
  { x: 50, y: 13 },
  { x: 21, y: 84 },
  { x: 79, y: 84 }
] as const;

interface CapabilityConnectionsProps {
  centre: string;
  items: SpecialistConnection[];
  defaultIndex?: number;
}

const CapabilityConnections = ({
  centre,
  items,
  defaultIndex = 0
}: CapabilityConnectionsProps) => {
  const [active, setActive] = useState(defaultIndex);
  const panelId = useId();
  const current = items[active];

  return (
    <div className='spConnect'>
      <div className='spConnect__figure'>
        <svg
          className='spConnect__spokes'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
          aria-hidden='true'
          focusable='false'
        >
          {items.map((item, index) => (
            <line
              key={item.capability}
              x1='50'
              y1='50'
              x2={POSITIONS[index].x}
              y2={POSITIONS[index].y}
              className={
                index === active
                  ? "spConnect__spoke is-active"
                  : "spConnect__spoke"
              }
              vectorEffect='non-scaling-stroke'
            />
          ))}
        </svg>

        <p className='spConnect__centre'>{centre}</p>

        <ul className='spConnect__nodes'>
          {items.map((item, index) => (
            <li
              key={item.capability}
              className={`spConnect__node spConnect__node--${index}`}
            >
              <button
                type='button'
                className='spConnect__button'
                aria-pressed={index === active}
                aria-controls={panelId}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                {item.capability}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='spConnect__panel' id={panelId} aria-live='polite'>
        <p className='spConnect__capability'>{current.capability}</p>
        <h3 className='spConnect__title'>{current.title}</h3>
        <p className='spConnect__body'>{current.body}</p>
      </div>
    </div>
  );
};

export default CapabilityConnections;
