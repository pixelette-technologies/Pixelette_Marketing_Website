import React from "react";

/**
 * Reveal - server component. A pure CSS scroll-driven reveal (animation-timeline:
 * view()). Content is VISIBLE BY DEFAULT and never depends on JS to appear;
 * the motion is a progressive enhancement, disabled under reduced motion.
 */
export default function Reveal({
  as: Comp = "div",
  className = "",
  children
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return <Comp className={`edReveal ${className}`.trim()}>{children}</Comp>;
}
