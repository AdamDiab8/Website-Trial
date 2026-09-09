import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import { buttonVariants } from "@/components/ui/button";
import { cn, externalLinkProps } from "@/lib/utils";

/**
 * Phase 3: the static 5-card grid is replaced by the 3D coverflow carousel.
 * Tradeoff (accepted per the component brief): one card is shown at a time.
 * The section CTA sits on a matching dark strip below the carousel.
 */
export function TransformBusiness() {
  return (
    <div className="w-full">
      <CoverFlowCarousel />
      <div className="flex justify-center px-6 pb-20 pt-2">
        <a
          href="https://www.nokia.com/networks/"
          {...externalLinkProps}
          className={cn(buttonVariants({ variant: "outline-light" }))}
        >
          See our network solutions
        </a>
      </div>
    </div>
  );
}
