"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode
} from "react";
import {
  sectorsIntro,
  sectorsOverview,
  type SectorOverview
} from "@/data/industries/sectorsOverview";

// /industries, 24 Nov 2026. The approved Sectors mosaic replaces the market
// explorer. Hover and keyboard focus preview; a click or the arrows commit.
// Leaving a preview returns to the committed sector. Touch does not use hover.

const ICONS: readonly ReactNode[] = [
  <svg key='target' viewBox='0 0 24 24' aria-hidden='true'>
    <circle cx='12' cy='12' r='8' />
    <circle cx='12' cy='12' r='3' />
    <path d='M12 12l7-7M17 5h3v3' />
  </svg>,
  <svg key='document' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M6 3h9l4 4v14H6zM15 3v5h4M9 12h7M9 16h7' />
  </svg>,
  <svg key='megaphone' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M3 10v5h4l9 5V5l-9 5H3zM19 9q4 3 0 6' />
  </svg>
];

function wrap(index: number) {
  const count = sectorsOverview.length;
  return (index + count) % count;
}

export default function SectorsOverview() {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const finePointer = useRef(false);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = preview ?? selected;
  const sector = sectorsOverview[shown];

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      finePointer.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const commit = (index: number) => {
    setSelected(wrap(index));
    setPreview(null);
  };

  const onTileKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: sectorsOverview.length - 1
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    tiles.current[wrap(moves[event.key])]?.focus();
  };

  const previewFromPointer = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (!finePointer.current || event.pointerType !== "mouse") return;
    setPreview(index);
  };

  const clearPointerPreview = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;
    setPreview(null);
  };

  return (
    <div className='sectors__canvas'>
      <header className='sectorsHero'>
        <p className='sectorsHero__eyebrow'>{sectorsIntro.eyebrow}</p>
        <h1 className='sectorsHero__title' id='sectors-title'>
          <span>{sectorsIntro.title[0]}</span>
          <span>{sectorsIntro.title[1]}</span>
          <em>{sectorsIntro.titleEmphasis}</em>
        </h1>
        <p className='sectorsHero__lead'>{sectorsIntro.lead}</p>
      </header>

      <div className='sectorsMosaic' role='group' aria-label='Select a sector'>
        <svg
          className='sectorsMosaic__links'
          viewBox='0 0 710 775'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <path d='M340 90H300Q285 90 285 110V180H82Q30 180 30 215V400H245Q265 400 265 382V320H505Q535 320 535 348V405H700' />
          <path d='M375 110H305Q285 110 285 140V245H60Q10 245 10 275V485H260Q300 485 300 450V330H665' />
          <path d='M395 130H330Q310 130 310 155V340H60Q20 340 20 370V500H235Q267 500 267 520V675H565' />
          <path d='M390 145H325Q300 145 300 160V278H108Q32 278 32 310V530H530Q565 530 565 545V635H708' />
          <path d='M45 560H300Q325 560 325 580V695H540Q570 695 570 668V590H700' />
          <path d='M55 580H350Q370 580 370 604V725H560Q590 725 590 700V630H706' />
          <path d='M80 720H250Q285 720 285 695V670H558Q600 670 600 640V610H706' />
        </svg>
        <div className='sectorsMosaic__tiles'>
          {sectorsOverview.map((item, index) => (
            <button
              key={item.id}
              ref={node => {
                tiles.current[index] = node;
              }}
              type='button'
              className={`sectorsTile sectorsTile--${index}`}
              aria-pressed={index === selected}
              aria-controls='sector-panel'
              onClick={() => commit(index)}
              onFocus={() => setPreview(index)}
              onBlur={event => {
                const next = event.relatedTarget;
                if (
                  !(next instanceof Element) ||
                  !next.closest(".sectorsMosaic__tiles")
                ) {
                  setPreview(null);
                }
              }}
              onPointerEnter={event => previewFromPointer(event, index)}
              onPointerLeave={clearPointerPreview}
              onKeyDown={event => onTileKeyDown(event, index)}
            >
              <span className='sectorsTile__frame'>
                <Image
                  src={item.image}
                  alt=''
                  width={680}
                  height={384}
                  priority={index === 0}
                  sizes='(max-width: 68rem) 46vw, 220px'
                />
              </span>
              <span className='sectorsTile__label'>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className='sectorsPanel' id='sector-panel' aria-live='polite'>
        <SectorPanelState sector={sector} priority={shown === 0} />
        <div className='sectorsPanel__pager'>
          <button
            type='button'
            className='sectorsPanel__arrow'
            aria-label='Previous sector'
            onClick={() => commit(shown - 1)}
          >
            <span aria-hidden='true'>‹</span>
          </button>
          <span className='sectorsPanel__count'>
            {shown + 1} of {sectorsOverview.length}
          </span>
          <button
            type='button'
            className='sectorsPanel__arrow'
            aria-label='Next sector'
            onClick={() => commit(shown + 1)}
          >
            <span aria-hidden='true'>›</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

function SectorPanelState({
  sector,
  priority
}: {
  sector: SectorOverview;
  priority: boolean;
}) {
  return (
    <div className='sectorsPanel__state'>
      <p className='sectorsPanel__name'>{sector.name}</p>
      <Image
        className='sectorsPanel__image'
        src={sector.image}
        alt=''
        width={680}
        height={384}
        priority={priority}
        sizes='(max-width: 68rem) 100vw, 394px'
      />
      <h2 className='sectorsPanel__title'>
        {sector.headlineLead} <em>{sector.headlineEmphasis}</em>
      </h2>
      <p className='sectorsPanel__desc'>{sector.description}</p>
      <ul className='sectorsPanel__caps'>
        {sector.capabilities.map((label, index) => (
          <li className='sectorsCap' key={label}>
            {ICONS[index]}
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
