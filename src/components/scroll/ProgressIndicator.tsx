const pad = (n: number) => String(n).padStart(2, "0");

export function ProgressIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="fixed bottom-6 left-2 z-40 hidden select-none flex-col gap-1.5 lg:flex">
      <div className="flex items-baseline gap-1 text-[10px] font-semibold tracking-[0.14em]">
        <span className="tabular-nums text-nokia-ink">{pad(current)}</span>
        <span className="tabular-nums text-nokia-ink-muted">/ {pad(total)}</span>
      </div>
      <div className="h-0.5 w-12 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-nokia-blue-light transition-[width] duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
