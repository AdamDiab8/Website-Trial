"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { SectionMenu } from "./SectionMenu";
import { ProgressIndicator } from "./ProgressIndicator";

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "solutions", label: "Solutions" },
  { id: "transform", label: "Transform" },
  { id: "belllabs", label: "Bell Labs" },
  { id: "global", label: "Global" },
  { id: "insights", label: "Insights" },
  { id: "news", label: "News" },
] as const;

/**
 * Wires the "full-page scroll FX" feel onto the existing sections:
 *  - toggles CSS scroll-snap on <html> (skipped entirely for reduced motion)
 *  - tracks the active section with one IntersectionObserver
 *  - renders the left section menu + bottom-left progress indicator
 */
export function ScrollExperience({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  // CSS scroll-snap lives on the document scroller. Off for reduced motion.
  useEffect(() => {
    const root = document.documentElement;
    if (reduce) {
      root.removeAttribute("data-snap");
      return;
    }
    root.setAttribute("data-snap", "on");
    return () => root.removeAttribute("data-snap");
  }, [reduce]);

  // Active-section tracking. A thin band across the viewport middle decides
  // which section is "current".
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el != null,
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeId),
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      {children}
      <SectionMenu
        sections={SECTIONS}
        activeIndex={activeIndex}
        onSelect={scrollTo}
      />
      <ProgressIndicator current={activeIndex + 1} total={SECTIONS.length} />
    </>
  );
}
