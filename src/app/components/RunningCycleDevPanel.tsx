import { RotateCcw, PanelRight } from 'lucide-react';
import type { RunningCycleTimer } from '../use-running-cycle-timer';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timer: RunningCycleTimer;
};

const SPEEDS = [1, 60, 600, 3600];

export function RunningCycleDevPanel({ open, onOpenChange, timer }: Props) {
  const { elapsedMin, totalMin, resetVersion, speed, paused, setSpeed, setPaused, reset, jump } = timer;
  const pct =
    totalMin <= 0 ? 0 : Math.min(100, Math.round((elapsedMin / totalMin) * 100));
  const minFloor = Math.floor(elapsedMin);
  const elapsedHours = Math.floor(minFloor / 60);
  const elapsedMm = minFloor - elapsedHours * 60;
  const elapsedLabel = elapsedHours > 0 ? `${elapsedHours}h ${elapsedMm}m` : `${elapsedMm}m`;
  const totalHours = Math.floor(totalMin / 60);
  const totalMm = totalMin - totalHours * 60;
  const totalLabel = totalHours > 0 ? `${totalHours}h ${totalMm}m` : `${totalMm}m`;

  if (!open) {
    return (
      <div className="flex h-full w-12 shrink-0 flex-col items-center border-l border-[#e5e5e5] bg-white py-3">
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="flex size-10 items-center justify-center rounded-[10px] text-[#404040] hover:bg-[#f5f5f5]"
          aria-label="Open dev time controls"
        >
          <PanelRight size={22} strokeWidth={2} />
        </button>
        <div className="mt-4 flex flex-1 flex-col items-center gap-3">
          <span className="text-[10px] font-['Avenir:Heavy',sans-serif] uppercase tracking-wider text-[#a3a3a3] [writing-mode:vertical-rl]">
            Dev · Time
          </span>
        </div>
      </div>
    );
  }

  return (
    <aside className="flex h-full w-[min(100vw,260px)] shrink-0 flex-col border-l border-[#e5e5e5] bg-white">
      <div className="flex items-center justify-between border-b border-[#f0f0f0] px-3 py-2.5">
        <p className="font-['Avenir:Heavy',sans-serif] text-[14px] text-[#1a1a1a]">Dev · Time</p>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] text-[#525252] hover:bg-[#f5f5f5]"
          aria-label="Collapse panel"
        >
          <PanelRight size={20} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {/* Progress readout */}
        <div className="mb-4 rounded-[8px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5">
          <div className="flex items-baseline justify-between">
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Cycle progress
            </p>
            <p className="font-mono text-[10px] text-[#737373]">{pct}%</p>
          </div>
          <p className="mt-1 font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]">
            {elapsedLabel}
            <span className="font-['Avenir:Roman',sans-serif] text-[12px] text-[#737373]"> of {totalLabel}</span>
          </p>
          <div
            key={resetVersion}
            className="mt-2 h-[4px] w-full overflow-hidden rounded-full bg-[#ebebeb]"
          >
            <div className="h-full bg-[#1a1a1a] transition-[width] duration-150" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Transport */}
        <div className="mb-4">
          <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
            Playback
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              className={`flex h-[34px] flex-1 items-center justify-center gap-1.5 rounded-[8px] border font-['Avenir:Heavy',sans-serif] text-[12px] transition-colors ${
                paused
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                  : 'border-[#d4d4d4] bg-white text-[#1a1a1a]'
              }`}
              aria-label={paused ? 'Play' : 'Pause'}
            >
              {paused ? <FilledPlayIcon /> : <FilledPauseIcon />}
              {paused ? 'Play' : 'Pause'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="flex h-[34px] flex-1 items-center justify-center gap-1.5 rounded-[8px] border border-[#d4d4d4] bg-white font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a] hover:bg-[#fafafa]"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>

        {/* Speed */}
        <div className="mb-4">
          <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
            Speed
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {SPEEDS.map(s => {
              const active = speed === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`h-[30px] rounded-[8px] border font-['Avenir:Heavy',sans-serif] text-[11px] transition-colors ${
                    active
                      ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                      : 'border-[#d4d4d4] bg-white text-[#525252]'
                  }`}
                >
                  {s}×
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#8e8e8e]">
            1× real-time · 60× 1s per demo minute · 3600× 1s per demo hour.
          </p>
        </div>

        {/* Jump */}
        <div className="mb-4">
          <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
            Jump time
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => jump(-15)}
              className="h-[30px] rounded-[8px] border border-[#d4d4d4] bg-white font-['Avenir:Heavy',sans-serif] text-[11px] text-[#1a1a1a]"
            >
              −15m
            </button>
            <button
              type="button"
              onClick={() => jump(15)}
              className="h-[30px] rounded-[8px] border border-[#d4d4d4] bg-white font-['Avenir:Heavy',sans-serif] text-[11px] text-[#1a1a1a]"
            >
              +15m
            </button>
            <button
              type="button"
              onClick={() => jump(60)}
              className="h-[30px] rounded-[8px] border border-[#d4d4d4] bg-white font-['Avenir:Heavy',sans-serif] text-[11px] text-[#1a1a1a]"
            >
              +1h
            </button>
          </div>
        </div>

        <p className="font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#a3a3a3]">
          Dev-only controls — not shipped. Simulates elapsed time so you can preview any point in the cycle.
        </p>
      </div>
    </aside>
  );
}

function FilledPauseIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden>
      <rect x="2" y="1.5" width="3" height="9" rx="0.5" fill="currentColor" />
      <rect x="7" y="1.5" width="3" height="9" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function FilledPlayIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden>
      <path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" />
    </svg>
  );
}
