"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/common";
import SectorMark from "@/components/ui/industries/SectorMark";
import {
  industriesPreview,
  sectors,
  sectorSlug
} from "@/data/industries/whoWeHelp";

// THE HOME PAGE'S INDUSTRIES PREVIEW — 28 Sep 2026, the creative
// transformation brief, section 19: concise, the eight approved sectors,
// visually engaging, "substantially different from the current repeated-card
// presentation", and "Explore industries →".
//
// The eight cards became a typographic index. The names are set large, one
// to a line, and each is a link to that sector's row on /industries. Beside
// them a single specimen shows the sector under the pointer or the keyboard
// focus — its mark, its name and its scope — so the section reads as breadth
// at a glance and rewards a closer look without asking for one.
//
// TOUCH GETS THE SAME CONTENT, NOT THE SAME MECHANISM (brief, section 27).
// Below the width at which the specimen fits, it is not rendered and each
// name carries its scope underneath instead. The choice is a container query
// in _industriesPreview.scss.
//
// The specimen is aria-hidden: it only ever repeats the name and scope of a
// link that already has both, the scope as its description.

export default function IndustriesPreview() {
  const { eyebrow, heading, lead, cta } = industriesPreview;
  const [active, setActive] = useState(0);
  const uid = useId();
  const current = sectors[active];
  const Icon = current.icon;

  return (
    <section className='industriesPreview sec'>
      <Container className='main'>
        <div className='industriesPreview__inner'>
          <div className='industriesPreview__main'>
            <header className='industriesPreview__head'>
              <h2 className='eyebrow'>{eyebrow}</h2>
              <h3 className='h2'>
                {heading.lead}{" "}
                <em className='industriesPreview__accent'>
                  {heading.tail} {heading.accent}
                </em>
              </h3>
              <p className='lead'>{lead}</p>
            </header>

            <ol className='industriesPreview__list'>
              {sectors.map((sector, i) => (
                <li
                  key={sector.title}
                  className={i === active ? "is-active" : undefined}
                >
                  <Link
                    href={`/industries#${sectorSlug(sector.title)}`}
                    className='industriesPreview__link'
                    aria-describedby={`${uid}-${i}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className='industriesPreview__num' aria-hidden='true'>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className='industriesPreview__name'>{sector.title}</span>
                  </Link>
                  <p className='industriesPreview__scope' id={`${uid}-${i}`}>
                    {sector.body}
                  </p>
                </li>
              ))}
            </ol>

            <Link href={cta.to} className='arrowLink industriesPreview__cta'>
              {cta.label}
              <span aria-hidden='true'>→</span>
            </Link>
          </div>

          <div className='industriesPreview__specimen' aria-hidden='true'>
            <div className='industriesPreview__plate' key={active}>
              <SectorMark index={active} tone={current.tone} />
              <p className='industriesPreview__plateNum'>
                {String(active + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
              </p>
              <p className='industriesPreview__plateTitle'>
                <span className={`industriesPreview__chip sectorTone--${current.tone}`}>
                  <Icon />
                </span>
                {current.title}
              </p>
              <p className='industriesPreview__plateBody'>{current.body}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
