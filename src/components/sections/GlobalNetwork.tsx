"use client";

import { motion } from "framer-motion";
import { WorldMap, type WorldMapCity } from "@/components/ui/world-map";
import { Container } from "@/components/layout/Container";

/**
 * Animated arcs from Nokia HQ (Espoo) to cities from real Nokia news stories —
 * Riyadh, Jakarta, Nairobi, New Delhi, Dallas — plus one region-to-region link.
 *
 * Phase 5 Step 5: city dots are interactive (hover/focus → highlight + tooltip)
 * and the arcs draw progressively as the section scrolls into view.
 */
const CITIES = {
  espoo: { lat: 60.1699, lng: 24.9384, label: "Espoo — HQ" },
  riyadh: { lat: 24.7136, lng: 46.6753, label: "Riyadh — R&D center" },
  jakarta: { lat: -6.2088, lng: 106.8456, label: "Jakarta — Indosat" },
  nairobi: { lat: -1.2921, lng: 36.8219, label: "Nairobi — emerging markets" },
  delhi: { lat: 28.6139, lng: 77.209, label: "New Delhi — India operations" },
  dallas: { lat: 32.7767, lng: -96.797, label: "Dallas — North America" },
} satisfies Record<string, WorldMapCity>;

const ROUTES: [keyof typeof CITIES, keyof typeof CITIES][] = [
  ["espoo", "riyadh"],
  ["espoo", "jakarta"],
  ["espoo", "nairobi"],
  ["espoo", "delhi"],
  ["espoo", "dallas"],
  ["riyadh", "jakarta"],
];

export function GlobalNetwork() {
  return (
    <Container className="w-full py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xl font-bold text-nokia-ink md:text-4xl">
            A global{" "}
            <span className="text-nokia-ink-muted">
              {"network".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="mx-auto max-w-2xl py-4 text-sm text-nokia-ink-muted md:text-lg">
            From our headquarters in Espoo to networks on every continent — Nokia
            is advancing connectivity for the AI era, worldwide. Hover a city to
            see what's there.
          </p>
        </div>

        <div className="mt-8">
          <WorldMap
            lineColor="#5b8dd9"
            cities={Object.values(CITIES)}
            dots={ROUTES.map(([a, b]) => ({
              start: CITIES[a],
              end: CITIES[b],
            }))}
          />
        </div>
    </Container>
  );
}
