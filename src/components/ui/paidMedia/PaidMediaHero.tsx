"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent
} from "react";
import { paidMediaContent } from "@/data/services/paidMedia";

const { hero } = paidMediaContent;

type CreativeId = "a" | "b";

const creatives: { id: CreativeId; label: string; index: string | null }[] = [
  { id: "a", label: "Creative A", index: "01 / 02" },
  { id: "b", label: "Creative B", index: null }
];

const narrowQuery = "(max-width: 900px)";

const PaidMediaHero = () => {
  const [featured, setFeatured] = useState<CreativeId>("a");
  const [narrow, setNarrow] = useState(false);
  const pendingFocus = useRef<CreativeId | null>(null);
  const cards = useRef<Record<CreativeId, HTMLButtonElement | null>>({
    a: null,
    b: null
  });
  const switches = useRef<Record<CreativeId, HTMLButtonElement | null>>({
    a: null,
    b: null
  });

  useLayoutEffect(() => {
    const query = window.matchMedia(narrowQuery);
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const next = pendingFocus.current;
    if (!next) return;
    pendingFocus.current = null;
    const target = narrow ? switches.current[next] : cards.current[next];
    target?.focus();
  }, [featured, narrow]);

  const select = (id: CreativeId, moveFocus: boolean) => {
    if (moveFocus) pendingFocus.current = id;
    setFeatured(id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const order: CreativeId[] = ["a", "b"];
    const index = order.indexOf(featured);
    let next: CreativeId | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = order[(index + 1) % order.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = order[(index - 1 + order.length) % order.length];
    } else if (event.key === "Home") {
      next = "a";
    } else if (event.key === "End") {
      next = "b";
    }

    if (!next) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <section className='ppcHero' aria-labelledby='ppc-hero-heading'>
      <div className='container_main ppcHero__inner'>
        <div className='ppcHero__copy'>
          <p className='ppcHero__eyebrow'>{hero.eyebrow}</p>
          <h1 id='ppc-hero-heading' className='ppcHero__heading'>
            {hero.headingLead} <em>{hero.headingEmphasis}</em>
          </h1>
          <p className='ppcHero__lead'>{hero.lead}</p>
          <Link href={hero.cta.href} className='ppcCta'>
            {hero.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>

        <div className='ppcStage'>
          <p className='ppcStage__label'>{hero.campaignLabel}</p>
          <div
            className='ppcSwitch'
            role={narrow ? "radiogroup" : undefined}
            aria-label={narrow ? "Campaign creative treatments" : undefined}
            aria-hidden={narrow ? undefined : true}
            onKeyDown={narrow ? onKeyDown : undefined}
          >
            {creatives.map(creative => {
              const selected = featured === creative.id;
              return (
                <button
                  key={creative.id}
                  type='button'
                  className={`ppcSwitch__btn${selected ? " is-selected" : ""}`}
                  role={narrow ? "radio" : undefined}
                  aria-checked={narrow ? selected : undefined}
                  aria-label={`${creative.label}. ${hero.lineOne}. ${hero.lineTwo}.`}
                  tabIndex={narrow ? (selected ? 0 : -1) : -1}
                  ref={node => {
                    switches.current[creative.id] = node;
                  }}
                  onClick={() => select(creative.id, false)}
                >
                  {creative.label}
                </button>
              );
            })}
          </div>
          <div
            className='ppcFrame'
            role={narrow ? undefined : "radiogroup"}
            aria-label={narrow ? undefined : "Campaign creative treatments"}
            data-featured={featured}
            onKeyDown={narrow ? undefined : onKeyDown}
          >
            {creatives.map(creative => (
              <button
                key={creative.id}
                type='button'
                role={narrow ? undefined : "radio"}
                className={`ppcCard ppcCard--${creative.id}`}
                aria-checked={narrow ? undefined : featured === creative.id}
                aria-hidden={narrow ? true : undefined}
                aria-label={`${creative.label}. ${hero.lineOne}. ${hero.lineTwo}.`}
                tabIndex={
                  narrow ? -1 : featured === creative.id ? 0 : -1
                }
                ref={node => {
                  cards.current[creative.id] = node;
                }}
                onClick={() => select(creative.id, false)}
              >
                <span className='ppcCard__top'>
                  <span>{creative.label}</span>
                  {creative.index ? <span>{creative.index}</span> : null}
                </span>
                <span className='ppcCard__headline'>
                  {hero.lineOne}
                  <strong>{hero.lineTwo}</strong>
                </span>
                <span className='ppcCard__bottom'>
                  {creative.id === "a" ? (
                    <span className='ppcCard__support'>{hero.support}</span>
                  ) : null}
                  <span className='ppcCard__sample'>
                    {hero.sampleCta}
                    <span aria-hidden='true'> →</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          <p className='ppcStage__note'>{hero.campaignNote}</p>
        </div>
      </div>
    </section>
  );
};

export default PaidMediaHero;
