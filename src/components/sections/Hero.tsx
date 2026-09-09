import { useState } from "react";
import { motion } from "framer-motion";
import ParticlesComponent from "@/components/ui/particles-bg";
import { useParallax } from "@/components/ui/parallax";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { heroSlides } from "@/lib/content";
import { cn, externalLinkProps } from "@/lib/utils";

/**
 * Hero content (the outer <section>, snap + min-h-screen come from SnapSection).
 *
 * Layer stack: video/image (z-0, parallax) → dark overlay (z-0) → particles
 * (z-10, receives pointer events) → headline + CTA + tabs (z-20, pointer-events
 * only on the actual controls so hover/click still reach the particle canvas).
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];
  const { ref, y } = useParallax<HTMLDivElement>(28);

  return (
    <>
      {/* invisible scroll sensor spanning the panel — drives the parallax */}
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* z-0: background media, drifts slower than the foreground. Oversized so
          the parallax offset never exposes an edge. Keyed so the video restarts
          per slide. */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 -inset-y-12 z-0"
      >
        {slide.media.type === "video" ? (
          <video
            key={slide.id}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            src={slide.media.src}
          />
        ) : (
          <img
            key={slide.id}
            src={slide.media.src}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-black/45" />

      {/* z-10: particle network overlay — the top-most interactive layer */}
      <ParticlesComponent />

      {/* z-20: headline + CTA — container ignores the mouse, only the button takes it */}
      <Container className="pointer-events-none relative z-20 flex flex-1 flex-col justify-center pb-24 pt-32 md:pt-40">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
          {slide.tabLabel}
        </p>
        <AnimatedHeading
          key={slide.headline}
          as="h1"
          text={slide.headline}
          className="max-w-3xl text-4xl leading-tight text-white md:text-5xl lg:text-[3.5rem]"
        />
        <div className="mt-8">
          <a
            href={slide.ctaHref}
            {...externalLinkProps}
            className={cn(
              buttonVariants({ variant: "outline-light", size: "lg" }),
              "pointer-events-auto",
            )}
          >
            {slide.cta}
          </a>
        </div>
      </Container>

      {/* Slide tabs — wrapper ignores the mouse, only the tab buttons take it */}
      <div className="pointer-events-none relative z-20 border-t border-white/20 bg-black/30">
        <Container className="flex flex-wrap gap-x-8 gap-y-2 py-4">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={cn(
                "pointer-events-auto border-b-2 pb-1 text-sm transition-colors",
                i === active
                  ? "border-white font-semibold text-white"
                  : "border-transparent text-white/70 hover:text-white",
              )}
            >
              {s.tabLabel}
            </button>
          ))}
        </Container>
      </div>
    </>
  );
}
