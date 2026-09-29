"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { industries, industryLabels } from "@/data/industries/industries";

// /industries, chapter 02: the interactive industry experience. 29 Sep 2026.
//
// THE SPECIFICATION'S SHAPE: industry names as a selector, and ONE changing
// stage. Only one industry is dominant at a time. Not eight cards, and no
// stock photography — the stage carries the market's mark and its words.
//
// STRUCTURE ONLY. The final visual treatment of this chapter is to be supplied
// separately; what is here is the interaction and the content model, on the
// site's existing tokens, so the art can change without the behaviour or the
// copy moving.
//
// A WAI-ARIA TABLIST. Click, tap and keyboard select (arrows, Home, End); a
// mouse selects on hover as well, which is what "hover" in the specification
// asks for. Hover is mouse-only — on touch, pointerenter fires with the tap
// and would select twice.
//
// ALL EIGHT PANELS ARE IN THE HTML. The inactive seven are `hidden`, so a
// crawler, a reader without JavaScript and a find-in-page all get the whole
// of the page's content, and the first industry is showing before hydration.

export default function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    const next = (index + industries.length) % industries.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: industries.length - 1
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], true);
    }
  };

  return (
    <div className='industryExplorer'>
      <div
        className='industryExplorer__list'
        role='tablist'
        aria-label='Industries'
        aria-orientation='vertical'
      >
        {industries.map((industry, index) => {
          const selected = index === active;
          return (
            <button
              key={industry.id}
              ref={node => {
                tabs.current[index] = node;
              }}
              type='button'
              role='tab'
              id={`industry-tab-${industry.id}`}
              aria-selected={selected}
              aria-controls={`industry-panel-${industry.id}`}
              tabIndex={selected ? 0 : -1}
              className='industryExplorer__tab'
              onClick={() => select(index)}
              onPointerEnter={event => {
                if (event.pointerType === "mouse") select(index);
              }}
              onKeyDown={onKeyDown}
            >
              <span className='industryExplorer__index' aria-hidden='true'>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className='industryExplorer__name'>{industry.name}</span>
            </button>
          );
        })}
      </div>

      <div className='industryExplorer__stage'>
        {industries.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <section
              key={industry.id}
              role='tabpanel'
              id={`industry-panel-${industry.id}`}
              aria-labelledby={`industry-tab-${industry.id}`}
              hidden={index !== active}
              className={`industryStage industryStage--${industry.tone}`}
            >
              <div className='industryStage__head'>
                <span className='industryStage__mark' aria-hidden='true'>
                  <Icon />
                </span>
                <div>
                  <h3 className='industryStage__name'>{industry.name}</h3>
                  <p className='industryStage__scope'>{industry.scope}</p>
                </div>
              </div>

              <dl className='industryStage__points'>
                {(["market", "challenge", "approach"] as const).map(key => (
                  <div className='industryStage__point' key={key}>
                    <dt className='industryStage__label'>
                      {industryLabels[key]}
                    </dt>
                    <dd className='industryStage__text'>{industry[key]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
    </div>
  );
}
