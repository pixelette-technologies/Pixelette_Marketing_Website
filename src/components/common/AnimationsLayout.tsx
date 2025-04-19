"use client";

import { FC, ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AnimationsLayoutProps {
  children: ReactNode;
}

const AnimationsLayout: FC<AnimationsLayoutProps> = ({ children }) => {
  useEffect(() => {
    const handleAOS = () => {
      if (window.innerWidth > 550) {
        AOS.init({
          duration: 2000,
          offset: 120,
          easing: "ease-in-out",
          delay: 100,
          once: true
        });
      } else {
        AOS.refreshHard(); // remove previously applied styles
        const elements = document.querySelectorAll("[data-aos]");
        elements.forEach(el => {
          el.removeAttribute("data-aos");
        });
      }
    };

    handleAOS(); // run on mount
    window.addEventListener("resize", handleAOS); // re-evaluate on resize

    return () => {
      window.removeEventListener("resize", handleAOS);
    };
  }, []);

  return <div>{children}</div>;
};

export default AnimationsLayout;
