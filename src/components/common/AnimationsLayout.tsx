"use client";

import { FC, ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AnimationsLayoutProps {
  children: ReactNode;
}

const AnimationsLayout: FC<AnimationsLayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1600,
      offset: 120,
      easing: "ease-in-out",
      delay: 100
    });
  }, []);

  return <div>{children}</div>;
};

export default AnimationsLayout;
