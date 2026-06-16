import type { ElementType, ReactNode } from "react";

/**
 * Reveal - scroll-linked reveal used across the redesign.
 *
 * Pure CSS scroll-driven motion (animation-timeline: view()): each element
 * rises and fades in as it scrolls into view, so the whole page moves as you
 * travel down it - not a one-time fade. Content is VISIBLE BY DEFAULT (server
 * rendered, no JS); the motion is progressive enhancement, disabled under
 * prefers-reduced-motion or where scroll-timeline is unsupported. Replaces the
 * earlier framer-motion version (JS-dependent visibility, one-shot fade).
 *
 * `delay` is accepted for call-site compatibility (scroll reveals stagger
 * naturally by position, so it is not otherwise used).
 */
export default function Reveal({
  children,
  as = "div",
  className
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const Comp = as as ElementType;
  const cls = `pmReveal ${className ?? ""}`.trim();
  return <Comp className={cls}>{children}</Comp>;
}
