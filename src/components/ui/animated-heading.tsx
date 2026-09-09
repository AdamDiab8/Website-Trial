"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Heading whose words rise into view from behind a mask, staggered ~0.05s each,
 * ~0.6s ease-out. Animates once. Reduced-motion renders the plain text.
 *
 * The visible parent element drives the in-view detection; the clipped word
 * spans animate via variants (so a word offset out of its mask can't stall the
 * trigger).
 */
export function AnimatedHeading({
  as = "h2",
  text,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag =
    as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={word}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
