import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-content px-6 md:px-10 lg:px-32",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
