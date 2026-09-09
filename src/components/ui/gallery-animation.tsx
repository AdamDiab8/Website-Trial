"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  image: string;
  label: string;
  headline: string;
  href?: string;
  isVideo?: boolean;
}

function PlayBadge() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
        <Play
          className="h-6 w-6 translate-x-0.5 fill-nokia-blue text-nokia-blue"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

function Overlay({
  item,
  clamp,
  size,
}: {
  item: GalleryItem;
  clamp: string;
  size: string;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-5">
      <span className="text-xs font-semibold uppercase tracking-widest text-nokia-ink-muted">
        {item.label}
      </span>
      <h3
        className={cn(
          "mt-2 font-semibold leading-snug text-white [text-wrap:pretty]",
          size,
          clamp,
        )}
      >
        {item.headline}
      </h3>
    </div>
  );
}

/**
 * Hover-to-expand gallery. On hover/focus the active panel grows and the others
 * shrink. Each panel is a link with a category label + headline over a gradient
 * scrim; the video item gets a play badge.
 *
 * Mobile: falls back to 3 equal stacked panels so every item + its text is
 * visible. Reduced-motion: panels stay equal width (no flex-grow), hover still
 * changes the accent.
 */
export function ExpandableGallery({
  items,
  className,
}: {
  items: GalleryItem[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;

  const flexFor = (i: number) => {
    if (reduce || hovered === null) return 1;
    return hovered === i ? 2.4 : 0.6;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: horizontal expandable row */}
      <div className="hidden gap-3 md:flex md:h-[420px]">
        {items.map((item, i) => {
          const active = hovered === i;
          const clamp =
            hovered === null
              ? "line-clamp-3"
              : active
                ? "line-clamp-none"
                : "line-clamp-2";
          return (
            <motion.a
              key={i}
              href={item.href ?? "#"}
              aria-label={`${item.label}: ${item.headline}`}
              className="group/panel relative block cursor-pointer overflow-hidden rounded-md ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nokia-blue-light"
              style={{ flex: 1 }}
              animate={{ flex: flexFor(i) }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeInOut" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/panel:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 h-1 origin-left bg-nokia-blue transition-transform duration-500",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
              {item.isVideo && <PlayBadge />}
              <Overlay
                item={item}
                clamp={clamp}
                size={active ? "text-xl" : "text-base"}
              />
            </motion.a>
          );
        })}
      </div>

      {/* Mobile: 3 equal stacked panels */}
      <div className="flex flex-col gap-4 md:hidden">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href ?? "#"}
            aria-label={`${item.label}: ${item.headline}`}
            className="relative block h-60 overflow-hidden rounded-md ring-1 ring-white/10"
          >
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
            {item.isVideo && <PlayBadge />}
            <Overlay item={item} clamp="line-clamp-none" size="text-base" />
          </a>
        ))}
      </div>
    </div>
  );
}
