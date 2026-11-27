export const MOTION_PAUSE_KEY = "pmw-motion-paused";
export const MOTION_PAUSE_EVENT = "pmw:motion-pause";

export function readMotionPaused(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(MOTION_PAUSE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeMotionPaused(paused: boolean): void {
  try {
    sessionStorage.setItem(MOTION_PAUSE_KEY, paused ? "1" : "0");
  } catch {
    // sessionStorage can throw in private modes; preference is best-effort.
  }
  document.documentElement.dataset.motionPaused = paused ? "true" : "false";
  window.dispatchEvent(
    new CustomEvent(MOTION_PAUSE_EVENT, { detail: { paused } })
  );
}

export function applyStoredMotionPause(): boolean {
  const paused = readMotionPaused();
  document.documentElement.dataset.motionPaused = paused ? "true" : "false";
  return paused;
}
