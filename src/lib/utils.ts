import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Spread onto every outbound <a> so it opens the real site in a new tab. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
