"use client";

import { FC, ReactNode, useEffect } from "react";
import AOS from "aos";

interface AnimationsLayoutProps {
  children: ReactNode;
}

const AnimationsLayout: FC<AnimationsLayoutProps> = ({ children }) => {
  useEffect(() => {
    // AOS is a progressive enhancement only. Initialise it after mount,
    // but NEVER gate rendering on it. Gating (the old `if (!isReady) return null`)
    // returned null during SSR and disabled server-side rendering for the
    // whole site, leaving crawlers and AI assistants an empty page.
    if (window.innerWidth > 650) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
      document.head.appendChild(link);

      link.onload = () => {
        AOS.init({
          duration: 2000,
          offset: 120,
          easing: "ease-in-out",
          delay: 100
        });
      };
    }
  }, []);

  return <div>{children}</div>;
};

export default AnimationsLayout;
