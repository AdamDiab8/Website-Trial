import { cn } from "@/lib/utils";

export function SectionMenu({
  sections,
  activeIndex,
  onSelect,
}: {
  sections: readonly { id: string; label: string }[];
  activeIndex: number;
  onSelect: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
    >
      {sections.map((section, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "group flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.11em] transition-all duration-300",
              active
                ? "translate-x-2.5 text-nokia-blue-light opacity-100"
                : "text-nokia-ink opacity-35 hover:opacity-70",
            )}
          >
            <span
              className={cn(
                "h-1 w-1 shrink-0 rounded-full bg-current transition-opacity duration-300",
                active ? "opacity-100" : "opacity-0",
              )}
            />
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
