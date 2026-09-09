import type { AnchorHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Text link with a trailing arrow — Nokia's standard CTA-link treatment.
 * The arrow nudges right on hover.
 */
export function ArrowLink({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-semibold text-nokia-blue-light hover:text-white",
        className,
      )}
      {...props}
    >
      <span className="underline-offset-4 group-hover:underline">
        {children}
      </span>
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}
