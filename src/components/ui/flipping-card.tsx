import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  frontContent?: ReactNode;
  backContent?: ReactNode;
}

/**
 * A 3D flip card. Flips on hover AND keyboard focus-within, so the back face and
 * its controls are reachable without a pointer.
 *
 * Reduced-motion: the 3D rotation is gated behind `motion-safe`. When the user
 * opts out, the faces cross-fade in place instead (no flip, back still reachable
 * on hover/focus).
 *
 * Recolored to the site's dark theme (navy-raised surface, light text).
 */
export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 400,
}: FlippingCardProps) {
  return (
    <div
      className="group/flip h-full [perspective:1200px] motion-reduce:[perspective:none]"
      style={{ "--flip-h": `${height}px` } as CSSProperties}
    >
      <div
        className={cn(
          "relative h-[var(--flip-h)] w-full rounded-xl border border-white/10 bg-nokia-navy-raised shadow-lg transition-transform duration-700 [transform-style:preserve-3d]",
          "motion-safe:group-hover/flip:[transform:rotateY(180deg)] motion-safe:group-focus-within/flip:[transform:rotateY(180deg)]",
          "motion-reduce:transition-none motion-reduce:[transform-style:flat]",
          className,
        )}
      >
        {/* Front face */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-[inherit] bg-nokia-navy-raised text-nokia-ink [backface-visibility:hidden] [transform:rotateY(0deg)]",
            "motion-reduce:transition-opacity motion-reduce:[backface-visibility:visible]",
            "motion-reduce:group-hover/flip:opacity-0 motion-reduce:group-focus-within/flip:opacity-0",
          )}
        >
          {frontContent}
        </div>

        {/* Back face */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-[inherit] bg-nokia-navy-raised text-nokia-ink [backface-visibility:hidden] [transform:rotateY(180deg)]",
            "motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:[backface-visibility:visible] motion-reduce:[transform:rotateY(0deg)]",
            "motion-reduce:group-hover/flip:opacity-100 motion-reduce:group-focus-within/flip:opacity-100",
          )}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
