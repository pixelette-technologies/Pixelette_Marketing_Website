"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useInView, useMotionAllowed } from "@/lib/useInView";

// One-shot fade-and-slide for the homepage illustrated bands. Content stays
// visible until JS opts into motion (ScrollReveal rule). Reduced motion and
// no-JS keep the resting rectangular layout.

export default function HomeSceneReveal({
  children,
  className,
  labelledBy
}: {
  children: ReactNode;
  className: string;
  labelledBy: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const visible = useInView(rootRef, "0px 0px -12% 0px");
  const motion = useMotionAllowed();
  const [motionReady, setMotionReady] = useState(false);
  const [entered, setEntered] = useState(true);

  useLayoutEffect(() => {
    if (!motion) {
      setMotionReady(false);
      setEntered(true);
      return;
    }
    const el = rootRef.current;
    const onScreen =
      !!el &&
      el.getBoundingClientRect().top < window.innerHeight * 0.88 &&
      el.getBoundingClientRect().bottom > 0;
    setEntered(onScreen);
    setMotionReady(true);
  }, [motion]);

  useEffect(() => {
    if (visible && motionReady) setEntered(true);
  }, [visible, motionReady]);

  return (
    <section
      ref={rootRef}
      className={className}
      aria-labelledby={labelledBy}
      data-motion={motionReady ? "ready" : "off"}
      data-entered={entered ? "true" : "false"}
      data-reveal='off'
    >
      {children}
    </section>
  );
}
