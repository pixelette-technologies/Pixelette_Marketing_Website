"use client";

import { useEffect } from "react";

const UseSlowScroll = (factor: number = 9) => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY / factor,
        behavior: "smooth"
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [factor]);

  return null; // No UI, just applying scroll behavior
};

export default UseSlowScroll;
