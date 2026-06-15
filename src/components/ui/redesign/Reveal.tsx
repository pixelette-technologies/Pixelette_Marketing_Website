"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Reveal - restrained scroll reveal used across the redesign.
 * Slow expo-out ease (premium, not flashy). Respects reduced-motion by
 * rendering the content statically. Used in place of AOS for finer control.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 }
};

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
