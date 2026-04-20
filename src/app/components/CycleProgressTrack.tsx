/**
 * Progress fill uses scaleX on a full-width layer (GPU-friendly) instead of animating
 * CSS width — matches RAF-driven elapsed time without transition fighting each frame.
 */
export function CycleProgressTrack({
  fraction,
}: {
  /** 0–1 elapsed within this segment (or full cycle for a single track). */
  fraction: number;
}) {
  const f = Number.isFinite(fraction) ? Math.max(0, Math.min(1, fraction)) : 0;
  return (
    <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-[#ebebeb]">
      <div
        className="absolute inset-y-0 left-0 w-full origin-left bg-[#1a1a1a]"
        style={{ transform: `scaleX(${f})`, willChange: 'transform' }}
      />
    </div>
  );
}
