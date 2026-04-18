import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CancelCycleFeedbackVariant } from '../cancel-cycle-feedback-variants';

/** Demo only — real firmware would clear when the machine reports idle. */
const DEMO_STOP_MS = 10_000;

type Phase = 'confirm' | 'stopping' | 'done';

type Props = {
  variant: CancelCycleFeedbackVariant;
};

function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-[320px] border border-[#d4d4d4] bg-white px-5 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-feedback-title"
    >
      {children}
    </div>
  );
}

const primaryBtn =
  'flex h-[52px] w-full items-center justify-center font-[\'Avenir:Heavy\',sans-serif] text-[13px] uppercase tracking-wide text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60';
const primaryBlue = 'bg-[#0057d9] hover:enabled:bg-[#004bb8]';
const linkBtn =
  'mt-4 w-full font-[\'Avenir:Heavy\',sans-serif] text-[12px] uppercase tracking-wide text-[#0057d9] disabled:cursor-not-allowed disabled:opacity-40';

function formatElapsedMmSs(elapsedMs: number) {
  const totalSec = Math.floor(elapsedMs / 1000);
  const mm = Math.floor(totalSec / 60);
  const ss = totalSec % 60;
  return `${mm}:${ss.toString().padStart(2, '0')}`;
}

const ROTATING_LINES = [
  'Ending the cycle…',
  'Draining water…',
  'Slowing the drum…',
  'Finishing up…',
] as const;

export function CancelCycleFeedbackPrototype({ variant }: Props) {
  const [phase, setPhase] = useState<Phase>('confirm');
  const [remainingMs, setRemainingMs] = useState(DEMO_STOP_MS);
  const stopping = phase === 'stopping';

  useEffect(() => {
    setPhase('confirm');
  }, [variant]);

  useEffect(() => {
    if (!stopping) {
      setRemainingMs(DEMO_STOP_MS);
      return;
    }
    setRemainingMs(DEMO_STOP_MS);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const left = Math.max(0, DEMO_STOP_MS - elapsed);
      setRemainingMs(left);
      if (left <= 0) {
        setPhase('done');
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stopping]);

  const elapsedMs = DEMO_STOP_MS - remainingMs;

  const rotatingLine = useMemo(() => {
    if (!stopping) return ROTATING_LINES[0];
    const i = Math.floor(elapsedMs / 2200) % ROTATING_LINES.length;
    return ROTATING_LINES[i];
  }, [elapsedMs, stopping]);

  const activityTick = useMemo(() => Math.floor(elapsedMs / 450) % 3, [elapsedMs]);

  const reset = () => setPhase('confirm');

  const confirmView = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Are you sure you want to cancel?
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        Cancelling the cycle will end it permanently and it cannot be resumed.
      </p>
      <button
        type="button"
        className={`${primaryBtn} ${primaryBlue} mt-6`}
        onClick={() => setPhase('stopping')}
      >
        Cancel cycle
      </button>
      <button type="button" className={linkBtn} onClick={reset}>
        Close
      </button>
    </ModalShell>
  );

  const doneView = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Cycle ended
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        The washer is ready for the next load.
      </p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} onClick={reset}>
        Reset demo
      </button>
    </ModalShell>
  );

  const elapsedStopping = (
    <ModalShell>
      <p
        className="font-[\'Avenir:Heavy\',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]"
        aria-live="polite"
      >
        Stopping
      </p>
      <h2 id="cancel-feedback-title" className="mt-2 font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Canceling cycle
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        How long this takes depends on load and water left in the drum—we do not show a countdown.
      </p>
      <p className="mt-4 border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5 text-center font-[\'Avenir:Heavy\',sans-serif] text-[22px] tabular-nums text-[#1a1a1a]">
        {formatElapsedMmSs(elapsedMs)}
      </p>
      <p className="mt-1 text-center font-[\'Avenir:Roman\',sans-serif] text-[11px] text-[#737373]">Time elapsed</p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const indeterminateBarStopping = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Stopping cycle
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        The washer is finishing. Actual time varies—this bar only shows activity, not how close you are to done.
      </p>
      <div className="mt-5 border border-[#d4d4d4] bg-[#f5f5f5]">
        <svg className="block h-2 w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
          <rect x="0" y="0" width="100" height="8" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="0.5" />
          <rect y="0" width="28" height="8" fill="#0057d9">
            <animate attributeName="x" values="-28;100;-28" dur="1.15s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
      <p className="mt-2 font-[\'Avenir:Roman\',sans-serif] text-[12px] text-[#737373]">Please wait — do not open the door.</p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const spinnerStopping = (
    <ModalShell>
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 size-10 shrink-0 rounded-full border-2 border-[#e5e5e5] border-t-[#0057d9] animate-spin"
          aria-hidden
        />
        <div>
          <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
            Stopping cycle
          </h2>
          <p className="mt-2 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
            We cannot predict exactly how long this will take. Stay nearby until the washer is idle.
          </p>
        </div>
      </div>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const rotatingStopping = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Stopping cycle
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        Short status lines rotate for reassurance. They are not a guarantee of real machine phases or timing.
      </p>
      <p
        className="mt-4 min-h-[44px] font-[\'Avenir:Heavy\',sans-serif] text-[13px] leading-snug text-[#1a1a1a]"
        aria-live="polite"
      >
        {rotatingLine}
      </p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-4`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const rangeStopping = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Stopping cycle
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        Sometimes it is a few seconds, sometimes longer—water level and cycle step both matter.
      </p>
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-2 w-9 border border-[#d4d4d4] ${i === activityTick ? 'bg-[#0057d9]' : 'bg-[#f5f5f5]'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-center font-[\'Avenir:Roman\',sans-serif] text-[11px] text-[#737373]">Activity (not progress)</p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  let stoppingBody: ReactNode;
  switch (variant) {
    case 'countdownInModal':
      stoppingBody = elapsedStopping;
      break;
    case 'progressBarModal':
      stoppingBody = indeterminateBarStopping;
      break;
    case 'spinnerModal':
      stoppingBody = spinnerStopping;
      break;
    case 'rotatingMessagesModal':
      stoppingBody = rotatingStopping;
      break;
    case 'rangeReassuranceModal':
      stoppingBody = rangeStopping;
      break;
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center bg-black">
      <div className="flex w-full flex-col items-center px-3">
        {phase === 'confirm' && confirmView}
        {phase === 'stopping' && stoppingBody}
        {phase === 'done' && doneView}
      </div>
      <p className="mt-6 max-w-[280px] text-center font-[\'Avenir:Roman\',sans-serif] text-[10px] leading-snug text-[#737373]">
        Tap “Cancel cycle” to simulate stopping. The demo ends after a short stand-in delay; real duration is unknown.
      </p>
    </div>
  );
}
