"use client";

import { useEffect } from "react";
import { applyStoredMotionPause } from "@/lib/motionPause";

// Applies the session pause preference on every page so marquees respect a
// choice made on the homepage (A7).
const MotionPauseBootstrap = () => {
  useEffect(() => {
    applyStoredMotionPause();
  }, []);
  return null;
};

export default MotionPauseBootstrap;
