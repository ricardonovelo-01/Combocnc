import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Heart, Settings, Pause, Play, Droplet, Wind, RotateCcw } from 'lucide-react';
import washerImage from '../../imports/ComboCC/158356eed04099aa3d6c70763cd639a6f7aa97e9.png';
import type { RunningCycleVariant, RunningCycleMode } from '../running-cycle-variants';

const WASH_MIN = 45;
const DRY_MIN = 105;
const WASHER_ONLY_TOTAL_MIN = 90;

function formatLeft(minLeft: number): string {
  const m = Math.max(0, Math.ceil(minLeft));
  const h = Math.floor(m / 60);
  const mm = m - h * 60;
  if (h > 0 && mm > 0) return `${h}h ${mm}m left`;
  if (h > 0) return `${h}h left`;
  return `${mm}m left`;
}

function formatPhaseLeft(minLeft: number): string {
  const m = Math.max(0, Math.ceil(minLeft));
  return `${m}m left`;
}

type Props = {
  variant: RunningCycleVariant;
  mode: RunningCycleMode;
};

export function RunningCyclePrototype({ variant, mode }: Props) {
  const totalMin = mode === 'combo' ? WASH_MIN + DRY_MIN : WASHER_ONLY_TOTAL_MIN;

  const [elapsedMin, setElapsedMin] = useState(0);
  const [speed, setSpeed] = useState<number>(60); // 60x = 1 real sec per demo min
  const [paused, setPaused] = useState(false);
  const [wrinkleShield, setWrinkleShield] = useState(true);
  const lastTs = useRef<number | null>(null);

  // Reset when mode changes so phase math stays sane.
  useEffect(() => {
    setElapsedMin(0);
    lastTs.current = null;
  }, [mode]);

  useEffect(() => {
    if (paused) {
      lastTs.current = null;
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      if (lastTs.current == null) lastTs.current = now;
      const deltaSec = (now - lastTs.current) / 1000;
      lastTs.current = now;
      setElapsedMin(prev => {
        const next = prev + (deltaSec * speed) / 60;
        return next >= totalMin ? totalMin : next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lastTs.current = null;
    };
  }, [paused, speed, totalMin]);

  const minLeft = Math.max(0, totalMin - elapsedMin);
  const washFrac =
    mode === 'combo'
      ? Math.min(1, elapsedMin / WASH_MIN)
      : 0;
  const dryFrac =
    mode === 'combo'
      ? Math.min(1, Math.max(0, elapsedMin - WASH_MIN) / DRY_MIN)
      : 0;
  const unifiedFrac = Math.min(1, elapsedMin / totalMin);
  const inDry = mode === 'combo' && elapsedMin >= WASH_MIN;
  const washMinLeft = mode === 'combo' ? Math.max(0, WASH_MIN - elapsedMin) : 0;
  const dryMinLeft = mode === 'combo' ? Math.max(0, totalMin - Math.max(elapsedMin, WASH_MIN)) : 0;

  const headerTitle = mode === 'combo' ? 'Combo' : 'Washer';

  const reset = () => {
    setElapsedMin(0);
    lastTs.current = null;
  };

  const jump = (deltaMin: number) => {
    setElapsedMin(prev => {
      const n = prev + deltaMin;
      return Math.max(0, Math.min(totalMin, n));
    });
    lastTs.current = null;
  };

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <MetaControls
        speed={speed}
        onSpeed={setSpeed}
        paused={paused}
        onPaused={setPaused}
        onReset={reset}
        onJump={jump}
        elapsedMin={elapsedMin}
        totalMin={totalMin}
      />

      <div className="relative flex-1 min-h-0 overflow-hidden rounded-[20px] border border-[#d4d4d4] bg-white">
        {/* Status Bar */}
        <div className="h-[44px] px-6 flex items-center justify-between">
          <p className="font-['SF_Pro_Text',sans-serif] text-[15px] font-semibold text-[#1a1a1a]">9:41</p>
          <div className="flex items-center gap-[6px]">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect x="0" y="8" width="3" height="4" rx="0.8" fill="#1a1a1a" />
              <rect x="5" y="5" width="3" height="7" rx="0.8" fill="#1a1a1a" />
              <rect x="10" y="2" width="3" height="10" rx="0.8" fill="#1a1a1a" />
              <rect x="15" y="0" width="3" height="12" rx="0.8" fill="#1a1a1a" />
            </svg>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M8.5 11C9.05 11 9.5 10.55 9.5 10C9.5 9.45 9.05 9 8.5 9C7.95 9 7.5 9.45 7.5 10C7.5 10.55 7.95 11 8.5 11Z" fill="#1a1a1a" />
              <path d="M8.5 7C10.16 7 11.65 7.69 12.71 8.79L14.13 7.37C12.68 5.88 10.69 5 8.5 5C6.31 5 4.32 5.88 2.87 7.37L4.29 8.79C5.35 7.69 6.84 7 8.5 7Z" fill="#1a1a1a" />
              <path d="M8.5 1C11.76 1 14.78 2.31 17 4.43L15.58 5.85C13.73 4.04 11.23 3 8.5 3C5.77 3 3.27 4.04 1.42 5.85L0 4.43C2.22 2.31 5.24 1 8.5 1Z" fill="#1a1a1a" />
            </svg>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#1a1a1a" strokeOpacity="0.35" />
              <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#1a1a1a" />
              <path d="M24 4.5C24 4.22386 24.2239 4 24.5 4H25C25.8284 4 26.5 4.67157 26.5 5.5V7.5C26.5 8.32843 25.8284 9 25 9H24.5C24.2239 9 24 8.77614 24 8.5V4.5Z" fill="#1a1a1a" fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between px-2 pt-2">
          <button className="size-[44px] flex items-center justify-center"><ArrowLeft size={22} /></button>
          <p className="font-['Avenir:Heavy',sans-serif] text-[#1a1a1a] text-[14px] tracking-wider">Whirlpool</p>
          <div className="flex items-center">
            <button className="size-[44px] flex items-center justify-center"><Heart size={18} /></button>
            <button className="size-[44px] flex items-center justify-center"><Settings size={18} /></button>
          </div>
        </div>

        {/* Title */}
        <div className="px-4">
          <p className="font-['Avenir:Heavy',sans-serif] text-[22px] text-[#1a1a1a]">{headerTitle}</p>
        </div>

        {/* Image */}
        <div className="w-full h-[220px] flex items-center justify-center">
          <img src={washerImage} alt="Appliance" className="h-full object-contain" />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 px-4">
          {/* Cycle name */}
          <p className="font-['Avenir:Medium',sans-serif] text-[14px] text-[#525252]">Delicates - Sense</p>

          {/* Time + Pause row */}
          <div className="flex items-start justify-between gap-3">
            <p className="font-['Avenir:Heavy',sans-serif] text-[32px] leading-none text-[#1a1a1a]">
              {formatLeft(minLeft)}
            </p>
            <button
              type="button"
              className="flex h-[40px] items-center gap-2 rounded-full border border-[#d4d4d4] bg-white px-4 font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a]"
            >
              <Pause size={14} />
              Pause
            </button>
          </div>

          {/* Variant-specific progress */}
          <div className="mt-1">
            {variant === 'segmentedSimple' && (
              <SegmentedBar washFrac={washFrac} dryFrac={dryFrac} mode={mode}>
                <div className="mt-2 flex">
                  <div className="flex-1">
                    <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#1a1a1a]">Washing</p>
                  </div>
                  {mode === 'combo' && (
                    <div className="flex-1">
                      <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#1a1a1a]">Dry</p>
                    </div>
                  )}
                </div>
              </SegmentedBar>
            )}

            {variant === 'segmentedDetailed' && (
              <SegmentedBar washFrac={washFrac} dryFrac={dryFrac} mode={mode}>
                <div className="mt-2 flex">
                  <div className="flex-1">
                    <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#1a1a1a]">
                      {mode === 'combo' && !inDry
                        ? `Washing - ${formatPhaseLeft(washMinLeft)}`
                        : 'Washing'}
                    </p>
                  </div>
                  {mode === 'combo' && (
                    <div className="flex-1">
                      <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#525252]">
                        {inDry ? `Dry - ${formatPhaseLeft(dryMinLeft)}` : 'Dry next'}
                      </p>
                    </div>
                  )}
                </div>
              </SegmentedBar>
            )}

            {variant === 'segmentedIcons' && (
              <SegmentedBar washFrac={washFrac} dryFrac={dryFrac} mode={mode}>
                <div className="mt-2 flex">
                  <div className="flex-1 flex items-center gap-1.5">
                    <Droplet size={13} className="text-[#737373]" />
                    <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#737373]">Washing</p>
                  </div>
                  {mode === 'combo' && (
                    <div className="flex-1 flex items-center gap-1.5">
                      <Wind size={13} className="text-[#737373]" />
                      <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#737373]">Dry</p>
                    </div>
                  )}
                </div>
              </SegmentedBar>
            )}

            {variant === 'unifiedBar' && (
              <div>
                <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#ebebeb]">
                  <div
                    className="h-full bg-[#1a1a1a] transition-[width] duration-150"
                    style={{ width: `${unifiedFrac * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Wrinkle Shield */}
          <div className="mt-2 rounded-[8px] border border-[#d4d4d4] bg-white p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Avenir:Medium',sans-serif] text-[15px] text-[#1a1a1a]">Wrinkle Shield</p>
                <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[12px] text-[#737373]">
                  Keep your clothes fresh after a cycle.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWrinkleShield(v => !v)}
                className={`relative h-[24px] w-[41px] rounded-full p-[2px] transition-colors ${
                  wrinkleShield ? 'bg-[#262626]' : 'bg-[#d4d4d4]'
                }`}
              >
                <div
                  className={`size-[20px] rounded-full border border-[#d4d4d4] bg-white transition-transform ${
                    wrinkleShield ? 'translate-x-[17px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-4 pb-4 pt-3">
          <div className="flex flex-col items-center gap-1">
            <button className="h-[48px] w-full rounded-full bg-[#1a1a1a] font-['Avenir:Heavy',sans-serif] text-[14px] text-white">
              Edit Cycle
            </button>
            <button className="h-[40px] w-full font-['Avenir:Heavy',sans-serif] text-[14px] text-[#1a1a1a]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentedBar({
  washFrac,
  dryFrac,
  mode,
  children,
}: {
  washFrac: number;
  dryFrac: number;
  mode: RunningCycleMode;
  children?: React.ReactNode;
}) {
  if (mode === 'washerOnly') {
    return (
      <div>
        <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#ebebeb]">
          <div
            className="h-full bg-[#1a1a1a] transition-[width] duration-150"
            style={{ width: `${washFrac * 100}%` }}
          />
        </div>
        {children}
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-[6px]">
        <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-[#ebebeb]">
          <div
            className="h-full bg-[#1a1a1a] transition-[width] duration-150"
            style={{ width: `${washFrac * 100}%` }}
          />
        </div>
        <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-[#ebebeb]">
          <div
            className="h-full bg-[#1a1a1a] transition-[width] duration-150"
            style={{ width: `${dryFrac * 100}%` }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

function MetaControls({
  speed,
  onSpeed,
  paused,
  onPaused,
  onReset,
  onJump,
  elapsedMin,
  totalMin,
}: {
  speed: number;
  onSpeed: (v: number) => void;
  paused: boolean;
  onPaused: (v: boolean) => void;
  onReset: () => void;
  onJump: (deltaMin: number) => void;
  elapsedMin: number;
  totalMin: number;
}) {
  const speeds = useMemo(() => [1, 60, 600, 3600], []);
  const pct = Math.min(100, Math.round((elapsedMin / totalMin) * 100));
  return (
    <div className="flex flex-col gap-1.5 rounded-[10px] border border-dashed border-[#d4d4d4] bg-[#fafafa] p-2">
      <div className="flex items-center justify-between">
        <p className="font-['Avenir:Heavy',sans-serif] text-[10px] uppercase tracking-wide text-[#737373]">
          Dev · time controls
        </p>
        <p className="font-mono text-[10px] text-[#737373]">
          {Math.floor(elapsedMin)}m / {totalMin}m ({pct}%)
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => onPaused(!paused)}
          className="flex h-[26px] items-center gap-1 rounded-full border border-[#d4d4d4] bg-white px-2.5 font-['Avenir:Heavy',sans-serif] text-[10px] text-[#1a1a1a]"
          aria-label={paused ? 'Resume' : 'Pause'}
        >
          {paused ? <Play size={11} /> : <Pause size={11} />}
          {paused ? 'Play' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex h-[26px] items-center gap-1 rounded-full border border-[#d4d4d4] bg-white px-2.5 font-['Avenir:Heavy',sans-serif] text-[10px] text-[#1a1a1a]"
        >
          <RotateCcw size={11} />
          Reset
        </button>
        <div className="flex h-[26px] items-center rounded-full border border-[#d4d4d4] bg-white p-[2px]">
          {speeds.map(s => {
            const active = speed === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onSpeed(s)}
                className={`h-[22px] rounded-full px-2 font-['Avenir:Heavy',sans-serif] text-[10px] transition-colors ${
                  active ? 'bg-[#1a1a1a] text-white' : 'text-[#525252]'
                }`}
              >
                {s}×
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => onJump(15)}
          className="h-[26px] rounded-full border border-[#d4d4d4] bg-white px-2.5 font-['Avenir:Heavy',sans-serif] text-[10px] text-[#1a1a1a]"
        >
          +15m
        </button>
        <button
          type="button"
          onClick={() => onJump(60)}
          className="h-[26px] rounded-full border border-[#d4d4d4] bg-white px-2.5 font-['Avenir:Heavy',sans-serif] text-[10px] text-[#1a1a1a]"
        >
          +1h
        </button>
      </div>
    </div>
  );
}
