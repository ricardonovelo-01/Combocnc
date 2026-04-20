import { useEffect, useRef, useState } from 'react';
import type { RunningCycleMode } from './running-cycle-variants';

export const WASH_MIN = 45;
export const DRY_MIN = 105;
export const WASHER_ONLY_TOTAL_MIN = 90;

export type RunningCycleTimer = {
  mode: RunningCycleMode;
  totalMin: number;
  elapsedMin: number;
  speed: number;
  paused: boolean;
  setSpeed: (v: number) => void;
  setPaused: (v: boolean) => void;
  reset: () => void;
  jump: (deltaMin: number) => void;
};

export function useRunningCycleTimer(mode: RunningCycleMode): RunningCycleTimer {
  const totalMin = mode === 'combo' ? WASH_MIN + DRY_MIN : WASHER_ONLY_TOTAL_MIN;

  const [elapsedMin, setElapsedMin] = useState(0);
  const [speed, setSpeed] = useState<number>(60);
  const [paused, setPaused] = useState(false);
  const lastTs = useRef<number | null>(null);

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

  const reset = () => {
    setElapsedMin(0);
    lastTs.current = null;
  };

  const jump = (deltaMin: number) => {
    setElapsedMin(prev => Math.max(0, Math.min(totalMin, prev + deltaMin)));
    lastTs.current = null;
  };

  return { mode, totalMin, elapsedMin, speed, paused, setSpeed, setPaused, reset, jump };
}
