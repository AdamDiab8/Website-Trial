"use client";

import { useRef, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll parallax with framer-motion only (no scroll library).
 *
 * Attach `ref` to the element whose passage through the viewport drives the
 * effect, and bind the returned `y` MotionValue to the layer you want to drift
 * (`<motion.div style={{ y }} />`). Total travel is `2 * amplitude` px.
 * Respects prefers-reduced-motion — `y` stays at 0 when the user opts out.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(amplitude = 24) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [amplitude, -amplitude],
  );

  return { ref, y };
}

/**
 * Image that drifts gently within its frame as its section scrolls past.
 * The frame clips (`overflow-hidden`) and the image is scaled up slightly so
 * the drift never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amplitude = 24,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amplitude?: number;
}) {
  const { ref, y } = useParallax<HTMLDivElement>(amplitude);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className={cn(
          "h-full w-full scale-[1.15] object-cover will-change-transform",
          imgClassName,
        )}
      />
    </div>
  );
}
