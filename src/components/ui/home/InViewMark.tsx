"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useMounted, useReducedMotion } from "@/lib/motion";

// A div that says whether it is on screen, as data attributes, and nothing
// else. The stylesheet decides what that means.
//
//   data-armed   set on a client that allows motion, once mounted. A draw-in
//                may hide what it is about to draw ONLY under this attribute.
//   data-seen    set the first time it enters, and never removed — for
//                draw-in effects that play once.
//   data-inview  follows the element — for ambient motion that should stop
//                spending frames while nobody can see it.
//
// None of the three is present on the server, so a stylesheet written against
// them treats their ABSENCE as the finished state, never as "hidden".

export default function InViewMark({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true });
  const inView = useInView(ref, { margin: "0px" });
  const mounted = useMounted();


  return (
    <div
      ref={ref}
      className={className}
      data-armed={(mounted && !reduce) || undefined}
      data-seen={seen || undefined}
      data-inview={inView || undefined}
    >
      {children}
    </div>
  );
}
