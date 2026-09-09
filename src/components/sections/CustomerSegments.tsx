import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { FlippingCard } from "@/components/ui/flipping-card";
import { useParallax } from "@/components/ui/parallax";
import { segments } from "@/lib/content";
import { cn, externalLinkProps } from "@/lib/utils";

/**
 * Phase 5 Step 4: the 3 alternating image/text rows become a 3-up row of flip
 * cards (stacking to 1 column on mobile).
 *   Front = image + title + short line
 *   Back  = full description + "Discover solutions" button
 * The front image keeps a gentle shared scroll parallax.
 */
export function CustomerSegments() {
  const { ref, y } = useParallax<HTMLDivElement>(16);

  return (
    <Container className="pb-24 pt-4 md:pb-28">
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {segments.map((seg) => (
            <FlippingCard
              key={seg.title}
              height={420}
              frontContent={
                <>
                  <div className="h-44 w-full shrink-0 overflow-hidden">
                    <motion.img
                      src={seg.image}
                      alt=""
                      loading="lazy"
                      style={{ y }}
                      className="h-full w-full scale-[1.12] object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl">{seg.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-nokia-ink-muted">
                        {seg.frontLine}
                      </p>
                    </div>
                    {/* Real link so touch users (no hover / focus-within) can act
                        without reaching the back face. Kept out of the tab order —
                        keyboard users get the identical button on the back face. */}
                    <a
                      href={seg.href}
                      {...externalLinkProps}
                      tabIndex={-1}
                      className="pointer-events-auto mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-nokia-blue-light hover:text-white"
                    >
                      {seg.cta}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </>
              }
              backContent={
                <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
                  <h3 className="text-lg">{seg.title}</h3>
                  <p className="text-sm leading-relaxed text-nokia-ink-muted">
                    {seg.back}
                  </p>
                  <a
                    href={seg.href}
                    {...externalLinkProps}
                    className={cn(
                      buttonVariants({ variant: "primary", size: "sm" }),
                      "pointer-events-auto",
                    )}
                  >
                    {seg.cta}
                  </a>
                </div>
              }
            />
          ))}
        </div>
    </Container>
  );
}
