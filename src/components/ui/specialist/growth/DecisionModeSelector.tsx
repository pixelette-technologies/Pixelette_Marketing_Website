"use client";

import { KeyboardEvent, useRef } from "react";

// The three business questions as a real tablist: native buttons with
// role="tab", roving tabindex, arrow keys / Home / End moving AND selecting
// (automatic activation — the panel is cheap to swap). The active tab is
// FILLED and the others outlined, so the state is shape as well as colour,
// and aria-selected carries it to assistive tech.

interface DecisionModeSelectorProps {
  modes: { key: string; label: string }[];
  active: number;
  onSelect: (index: number) => void;
  idFor: (index: number) => string;
  panelId: string;
}

const DecisionModeSelector = ({
  modes,
  active,
  onSelect,
  idFor,
  panelId
}: DecisionModeSelectorProps) => {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (index: number) => {
    const next = (index + modes.length) % modes.length;
    onSelect(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => move(index + 1),
      ArrowDown: () => move(index + 1),
      ArrowLeft: () => move(index - 1),
      ArrowUp: () => move(index - 1),
      Home: () => move(0),
      End: () => move(modes.length - 1)
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div
      className='giModes'
      role='tablist'
      aria-label='Choose a business question'
    >
      {modes.map((mode, index) => (
        <button
          key={mode.key}
          ref={node => {
            refs.current[index] = node;
          }}
          type='button'
          role='tab'
          id={idFor(index)}
          className='giModes__tab'
          aria-selected={index === active}
          aria-controls={panelId}
          tabIndex={index === active ? 0 : -1}
          onClick={() => onSelect(index)}
          onKeyDown={event => onKeyDown(event, index)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

export default DecisionModeSelector;
