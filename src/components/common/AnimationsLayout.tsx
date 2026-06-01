"use client";

import { FC, ReactNode, useEffect } from "react";
import AOS from "aos";

interface AnimationsLayoutProps {
  children: ReactNode;
}

const AnimationsLayout: FC<AnimationsLayoutProps> = ({ children }) => {
  useEffect(() => {
    // AOS is a progressive enhancement only: initialise after mount, never gate
    // rendering on it. The CSS is now bundled locally (imported in app/layout.tsx)
    // instead of being fetched from unpkg at runtime.
    if (window.innerWidth > 650) {
      AOS.init({
        duration: 2000,
        offset: 120,
        easing: "ease-in-out",
        delay: 100
      });
    }
  }, []);

  return <div>{children}</div>;
};

export default AnimationsLayout;
