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

  return (
    <button
      type='button'
      className='motionPause'
      aria-pressed={paused}
      onClick={() => writeMotionPaused(!paused)}
    >
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );
};

export default MotionPauseControl;
