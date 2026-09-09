"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import DottedMap from "dotted-map";

export interface WorldMapCity {
  lat: number;
  lng: number;
  label: string;
}

export interface WorldMapArc {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

interface MapProps {
  dots?: WorldMapArc[];
  cities?: WorldMapCity[];
  lineColor?: string;
}

const projectPoint = (lat: number, lng: number) => ({
  x: (lng + 180) * (800 / 360),
  y: (90 - lat) * (400 / 180),
});

const curvedPath = (
  a: { x: number; y: number },
  b: { x: number; y: number },
) => {
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - 50;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
};

export function WorldMap({
  dots = [],
  cities = [],
  lineColor = "#5b8dd9", // light Nokia blue — reads on the near-black map
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState<string | null>(null);

  // Arcs draw progressively as the section scrolls into view.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Force a fixed dark map to match the site (was theme-dependent via next-themes).
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#FFFFFF40",
      shape: "circle",
      backgroundColor: "#0a0f1a",
    });
  }, []);

  const activeCity = cities.find((c) => c.label === active) ?? null;

  return (
    <div
      ref={containerRef}
      className="relative aspect-[2/1] w-full rounded-lg bg-nokia-navy font-sans"
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="World map"
        draggable={false}
      />

      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="wm-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="wm-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {dots.map((dot, i) => (
          <Arc
            key={`arc-${i}`}
            d={curvedPath(
              projectPoint(dot.start.lat, dot.start.lng),
              projectPoint(dot.end.lat, dot.end.lng),
            )}
            index={i}
            count={dots.length}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}

        {cities.map((city) => (
          <CityDot
            key={city.label}
            city={city}
            color={lineColor}
            active={active === city.label}
            reduce={reduce}
            onEnter={() => setActive(city.label)}
            onLeave={() => setActive(null)}
          />
        ))}
      </svg>

      {activeCity && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-nokia-navy-raised px-2.5 py-1 text-xs font-semibold text-nokia-ink shadow-lg ring-1 ring-white/15"
          style={{
            left: `${(projectPoint(activeCity.lat, activeCity.lng).x / 800) * 100}%`,
            top: `${(projectPoint(activeCity.lat, activeCity.lng).y / 400) * 100}%`,
            marginTop: -10,
          }}
        >
          {activeCity.label}
        </div>
      )}
    </div>
  );
}

function Arc({
  d,
  index,
  count,
  progress,
  reduce,
}: {
  d: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const span = 0.3;
  const start = count > 1 ? (index / count) * 0.35 : 0;
  const pathLength = useTransform(progress, [start, start + span], [0, 1]);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#wm-arc)"
      strokeWidth={1}
      strokeLinecap="round"
      style={{ pathLength: reduce ? 1 : pathLength }}
    />
  );
}

function CityDot({
  city,
  color,
  active,
  reduce,
  onEnter,
  onLeave,
}: {
  city: WorldMapCity;
  color: string;
  active: boolean;
  reduce: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { x, y } = projectPoint(city.lat, city.lng);
  const transition = { duration: reduce ? 0 : 0.18 };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={city.label}
      className="cursor-pointer [pointer-events:auto] focus:outline-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* generous invisible hit target */}
      <circle cx={x} cy={y} r={12} fill="transparent" />

      {/* glow halo on hover / focus */}
      <motion.circle
        cx={x}
        cy={y}
        fill={color}
        filter="url(#wm-glow)"
        initial={false}
        animate={{ r: active ? 10 : 0, opacity: active ? 0.45 : 0 }}
        transition={transition}
      />

      {/* ambient pulse — skipped under reduced motion and while active */}
      {!reduce && !active && (
        <circle cx={x} cy={y} r={2.4} fill={color} opacity={0.5}>
          <animate
            attributeName="r"
            from="2.4"
            to="9"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* core dot — scales up on hover / focus */}
      <motion.circle
        cx={x}
        cy={y}
        fill={color}
        initial={false}
        animate={{ r: active ? 4.8 : 2.4 }}
        transition={transition}
      />
    </g>
  );
}
