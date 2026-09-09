import { motion } from "framer-motion";
import ShaderBackground from "@/components/ui/shader-background";
import { useParallax } from "@/components/ui/parallax";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

/**
 * Recolored Nokia-blue WebGL plasma shader behind the heading + CTA, contained
 * to this panel. Reduced-motion falls back to the canvas's static blue fill.
 * The shader layer gets a gentle scroll parallax (oversized wrapper so the drift
 * never exposes an edge).
 */
export function BellLabsBand() {
  const { ref, y } = useParallax<HTMLDivElement>(28);

  return (
    <>
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 -inset-y-12 z-0"
      >
        <ShaderBackground />
      </motion.div>

      <Container className="relative z-10 flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
          Nokia Bell Labs
        </p>
        <AnimatedHeading
          as="h2"
          text="Transforming the future of connectivity and beyond"
          className="max-w-3xl text-3xl text-white md:text-4xl lg:text-5xl"
        />
        <div className="mt-8">
          <Button variant="outline-light" size="lg">
            Find more about Nokia Bell Labs
          </Button>
        </div>
      </Container>
    </>
  );
}
