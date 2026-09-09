"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * One full-viewport panel of the scroll experience.
 *
 * - `scroll-snap-align: start` + `min-height: 100vh` (via CSS on [data-snap-section]
 *   and the class here). News / footer are allowed to grow past 100vh.
 * - Fades in + rises ~40px as it enters view (framer-motion, once).
 * - Reduced-motion: no enter animation; the CSS snap is disabled globally by
 *   ScrollExperience.
 */
export function SnapSection({
  id,
  children,
  className,
  center = false,
  overflowHidden = false,
  as = "section",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  center?: boolean;
  overflowHidden?: boolean;
  as?: "section" | "div";
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "div" ? motion.div : motion.section;

  return (
    <MotionTag
      id={id}
      data-snap-section
      className={cn(
        "relative isolate flex min-h-screen w-full flex-col",
        center && "justify-center",
        overflowHidden && "overflow-hidden",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
