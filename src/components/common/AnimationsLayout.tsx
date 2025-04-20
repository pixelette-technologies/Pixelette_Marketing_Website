"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import AOS from "aos";

interface AnimationsLayoutProps {
  children: ReactNode;
}

const AnimationsLayout: FC<AnimationsLayoutProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;

    if (width > 650) {
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
        setIsReady(true);
      };
    } else {
      // Skip AOS entirely for small screens
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return null; // or you can return a loader/spinner
  }

  return <div>{children}</div>;
};

export default AnimationsLayout;
