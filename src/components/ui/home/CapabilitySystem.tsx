"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { growthSystemData } from "@/data/home";
import { capabilityGroups } from "@/data/services/capabilityGroups";
import { useReducedMotion } from "@/lib/motion";

// THE CONNECTED GROWTH SYSTEM — 28 Sep 2026, the creative transformation
// brief, section 9. It replaces the five capability cards on the dark band.
//
// THE ARCHITECTURE IS UNCHANGED AND IS NOT RESTATED HERE. The five titles,
// their one-line descriptions and the sub-capabilities under each come from
// growthSystemData — the copy /services and the What We Do menu already read —
// and the service pages under each capability come from capabilityGroups. So
// this is the same five-part offer drawn as a system instead of listed as five
// boxes, and a capability cannot appear here that the rest of the site does
// not also sell. The brief's example sub-lists were examples; the approved
// lists are what render.
//
// TWO RENDERINGS, ONE STATE, CHOSEN BY THE SPACE AVAILABLE (brief, section 27:
// "mobile is not a shrunk desktop"):
//
//   WIDE     A ring. GROWTH at the centre, the five capabilities around it,
//            and a panel beside the ring for whichever is selected. Hover,
//            focus or click selects; the selected wire carries a single
//            signal to the centre, and the other four nodes recede.
//   NARROW   An accordion. Tap a capability and its detail opens in place.
//
// A container query picks between them (see _capabilitySystem.scss), because
// what decides whether the ring fits is the width of this block, not of the
// viewport. Both are in the DOM; the one not in use is display:none, which
// also removes it from the accessibility tree, so nothing is read twice.
//
// NOTHING IS ONLY IN THE MOTION. Every word the panel shows is text, the ring
// is aria-hidden decoration around real buttons, and under a reduce
// preference the signal simply does not travel.

const items = growthSystemData.items;

// Pentagon, starting at twelve o'clock. Positions are percentages of the ring
// box and the wires are drawn in a 0–100 viewBox, so the two share one
// coordinate system at every size.
const RADIUS = 38;
const nodeAt = (i: number) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a) };
};

function Detail({ index, idPrefix }: { index: number; idPrefix: string }) {
  const item = items[index];
  const group = capabilityGroups[index];
  return (
    <>
      <p className='capDetail__index' aria-hidden='true'>
        {item.index}
      </p>
      <h4 className='capDetail__title' id={`${idPrefix}-title`}>
        {item.title}
      </h4>
      <p className='capDetail__body'>{item.body}</p>
      {item.capabilities && (
        <ul className='capDetail__subs'>
          {item.capabilities.map(sub => (
            <li key={sub}>{sub}</li>
          ))}
        </ul>
      )}
      {(group?.featured || group?.services.length) && (
        <ul className='capDetail__links'>
          {group.featured && (
            <li>
              <Link href={group.featured.route} className='arrowLink'>
                {group.featured.label.replace(/\s*→$/, "")}
                <span aria-hidden='true'>→</span>
              </Link>
            </li>
          )}
          {group.services.map(service => (
            <li key={service.route}>
              <Link href={`/services/${service.route}`} className='arrowLink'>
                {service.title}
                <span aria-hidden='true'>→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function CapabilitySystem() {
  const [active, setActive] = useState(0);
  // The accordion may be fully closed; the ring always shows one.
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  const select = (i: number) => setActive(i);
  const centre = { x: 50, y: 50 };

  return (
    <div className='capSystem__body'>
      {/* --- WIDE: the ring and its panel --------------------------------- */}
      <div className='capSystem__wide'>
        <div className='capRing' data-active={active}>
          <svg
            className='capRing__wires'
            viewBox='0 0 100 100'
            aria-hidden='true'
            focusable='false'
          >
            <circle className='capRing__orbit' cx='50' cy='50' r={RADIUS} />
            {items.map((_, i) => {
              const p = nodeAt(i);
              return (
                <line
                  key={i}
                  className={`capRing__wire${i === active ? " is-active" : ""}`}
                  x1={p.x}
                  y1={p.y}
                  x2={centre.x}
                  y2={centre.y}
                />
              );
            })}
            {!reduce && (
              // Re-keyed on every selection, so the signal plays once per
              // change and then rests at the centre. SMIL, because it is one
              // element travelling one straight line and needs no library.
              <circle key={active} className='capRing__pulse' r='1.3'>
                <animateMotion
                  dur='0.7s'
                  fill='freeze'
                  path={`M${nodeAt(active).x},${nodeAt(active).y} L50,50`}
                  calcMode='spline'
                  keyTimes='0;1'
                  keySplines='0.4 0 0.2 1'
                />
              </circle>
            )}
          </svg>

          <div className='capRing__core' aria-hidden='true'>
            <span>Growth</span>
          </div>

          <ul className='capRing__nodes'>
            {items.map((item, i) => {
              const p = nodeAt(i);
              return (
                <li
                  key={item.title}
                  className={`capRing__node${i === active ? " is-active" : ""}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <button
                    type='button'
                    aria-pressed={i === active}
                    aria-controls={`${uid}-panel`}
                    onPointerEnter={e => {
                      if (e.pointerType === "mouse") select(i);
                    }}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                  >
                    <span className='capRing__num'>{item.index}</span>
                    <span className='capRing__name'>{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className='capDetail capDetail--panel'
          id={`${uid}-panel`}
          role='region'
          aria-live='polite'
          aria-labelledby={`${uid}-wide-title`}
        >
          <Detail index={active} idPrefix={`${uid}-wide`} />
        </div>
      </div>

      {/* --- NARROW: the accordion ---------------------------------------- */}
      <ol className='capAccordion'>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.title} className={isOpen ? "is-open" : undefined}>
              <button
                type='button'
                className='capAccordion__trigger'
                aria-expanded={isOpen}
                aria-controls={`${uid}-acc-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className='capRing__num'>{item.index}</span>
                <span className='capAccordion__name'>{item.title}</span>
                <span className='capAccordion__sign' aria-hidden='true' />
              </button>
              <div
                className='capDetail capDetail--inline'
                id={`${uid}-acc-${i}`}
                role='region'
                aria-labelledby={`${uid}-acc-${i}-title`}
                hidden={!isOpen}
              >
                <Detail index={i} idPrefix={`${uid}-acc-${i}`} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
