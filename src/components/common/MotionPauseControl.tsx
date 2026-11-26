"use client";

import { useEffect, useState } from "react";
import {
  applyStoredMotionPause,
  MOTION_PAUSE_EVENT,
  writeMotionPaused
} from "@/lib/motionPause";

// A7 — visible, keyboard-reachable pause for continuous homepage motion
// (Post-it field and marquees). Preference lasts for the session only.
const MotionPauseControl = () => {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(applyStoredMotionPause());
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<{ paused: boolean }>).detail;
      setPaused(Boolean(detail?.paused));
    };
    window.addEventListener(MOTION_PAUSE_EVENT, onChange);
    return () => window.removeEventListener(MOTION_PAUSE_EVENT, onChange);
  }, []);

  const label = paused ? "Play animations" : "Pause animations";

  return (
    <button
      type='button'
      className='motionPause'
      aria-pressed={paused}
      aria-label={label}
      title={label}
      onClick={() => writeMotionPaused(!paused)}
    >
      {paused ? (
        <svg
          className='motionPause__icon'
          viewBox='0 0 24 24'
          width='18'
          height='18'
          aria-hidden='true'
          focusable='false'
        >
          <path d='M8 5.5v13l11-6.5L8 5.5z' fill='currentColor' />
        </svg>
      ) : (
        <svg
          className='motionPause__icon'
          viewBox='0 0 24 24'
          width='18'
          height='18'
          aria-hidden='true'
          focusable='false'
        >
          <path d='M7 5h3.5v14H7V5zm6.5 0H17v14h-3.5V5z' fill='currentColor' />
        </svg>
      )}
    </button>
  );
};

export default MotionPauseControl;
