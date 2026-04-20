import { useEffect, useRef, useState } from 'react';
import type { RunningCycleMode } from './running-cycle-variants';

export const WASH_MIN = 45;
export const DRY_MIN = 105;
export const WASHER_ONLY_TOTAL_MIN = 90;

export type RunningCycleTimer = {
  mode: RunningCycleMode;
  totalMin: number;
  elapsedMin: number;
  /** Bumps on reset and mode change so progress UI can remount and avoid stuck width transitions. */
  resetVersion: number;
  speed: number;
  paused: boolean;
  setSpeed: (v: number) => void;
  setPaused: (v: boolean) => void;
  reset: () => void;
  jump: (deltaMin: number) => void;
};

/** Single source for bar widths vs elapsed time (matches dev panel % and main “time left” model). */
export function getRunningCycleProgressFractions(
  mode: RunningCycleMode,
  elapsedMin: number,
  totalMin: number,
): { washFrac: number; dryFrac: number; unifiedFrac: number } {
  const elapsed = Math.max(0, Math.min(totalMin, elapsedMin));
  if (mode === 'washerOnly') {
    const u = totalMin <= 0 ? 0 : Math.min(1, elapsed / totalMin);
    return { washFrac: u, dryFrac: 0, unifiedFrac: u };
  }
  const washDur = WASH_MIN;
  const dryDur = Math.max(0, totalMin - washDur);
  const washFrac = washDur <= 0 ? 0 : Math.min(1, elapsed / washDur);
  const dryFrac =
    dryDur <= 0 ? 0 : Math.min(1, Math.max(0, elapsed - washDur) / dryDur);
  const unifiedFrac = totalMin <= 0 ? 0 : Math.min(1, elapsed / totalMin);
  return { washFrac, dryFrac, unifiedFrac };
}

export function useRunningCycleTimer(mode: RunningCycleMode): RunningCycleTimer {
  const totalMin = mode === 'combo' ? WASH_MIN + DRY_MIN : WASHER_ONLY_TOTAL_MIN;

  const [elapsedMin, setElapsedMin] = useState(0);
  const [resetVersion, setResetVersion] = useState(0);
  const [speed, setSpeed] = useState<number>(60);
  const [paused, setPaused] = useState(false);
  const lastTs = useRef<number | null>(null);
  /** RAF id for the active tick loop — cancel synchronously on reset so no tick overwrites setElapsed(0). */
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    setElapsedMin(0);
    lastTs.current = null;
    setResetVersion(v => v + 1);
  }, [mode]);

  useEffect(() => {
    if (paused) {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTs.current = null;
      return;
    }
    const tick = (now: number) => {
      if (lastTs.current == null) lastTs.current = now;
      const deltaSec = (now - lastTs.current) / 1000;
      lastTs.current = now;
      setElapsedMin(prev => {
        const next = prev + (deltaSec * speed) / 60;
        return next >= totalMin ? totalMin : next;
      });
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTs.current = null;
    };
  }, [paused, speed, totalMin, resetVersion]);

  const reset = () => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    lastTs.current = null;
    setElapsedMin(0);
    setResetVersion(v => v + 1);
  };

  const jump = (deltaMin: number) => {
    setElapsedMin(prev => Math.max(0, Math.min(totalMin, prev + deltaMin)));
    lastTs.current = null;
  };

  return {
    mode,
    totalMin,
    elapsedMin,
    resetVersion,
    speed,
    paused,
    setSpeed,
    setPaused,
    reset,
    jump,
  };
}
