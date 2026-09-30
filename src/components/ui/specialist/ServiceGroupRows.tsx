"use client";

import type { SpecialistItem } from "@/data/services/specialist";
import { useId, useState } from "react";

// 03 What we actually do. FOUR GROUPS, NOT A CATALOGUE: the legacy pages ran
// fifteen to twenty-five service cards each. Editorial rows on hairlines,
// all closed on load, any number open at once.
//
// Each row is a real button with aria-expanded and aria-controls. The panel
// stays in the DOM and folds on a 0fr grid row (about 300ms, no measured
// height); while closed it is `inert`, so its text is out of the tab order
// and the accessibility tree without being unmounted. The + turns 45deg to
// read as ×. Under reduced motion it snaps.

const ServiceGroupRows = ({ items }: { items: SpecialistItem[] }) => {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen(state => state.map((value, i) => (i === index ? !value : value)));

  return (
    <ol className='spRows'>
      {items.map((item, index) => {
        const isOpen = open[index];
        const buttonId = `${baseId}-row-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li className={isOpen ? "spRows__row is-open" : "spRows__row"} key={item.title}>
            <h3 className='spRows__heading'>
              <button
                type='button'
                id={buttonId}
                className='spRows__toggle'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className='spRows__index' aria-hidden='true'>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className='spRows__title'>{item.title}</span>
                <span className='spRows__mark' aria-hidden='true' />
              </button>
            </h3>
            <div
              id={panelId}
              role='region'
              aria-labelledby={buttonId}
              className='spRows__panel'
              inert={!isOpen}
            >
              <div className='spRows__panelInner'>
                <p className='spRows__body'>{item.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default ServiceGroupRows;
