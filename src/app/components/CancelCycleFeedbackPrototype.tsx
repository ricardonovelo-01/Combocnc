import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CancelCycleFeedbackVariant } from '../cancel-cycle-feedback-variants';

const STOP_DURATION_MS = 10_000;

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

export function CancelCycleFeedbackPrototype({ variant }: Props) {
  const [phase, setPhase] = useState<Phase>('confirm');
  const [remainingMs, setRemainingMs] = useState(STOP_DURATION_MS);
  const stopping = phase === 'stopping';

  useEffect(() => {
    setPhase('confirm');
  }, [variant]);

  useEffect(() => {
    if (!stopping) {
      setRemainingMs(STOP_DURATION_MS);
      return;
    }
    setRemainingMs(STOP_DURATION_MS);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const left = Math.max(0, STOP_DURATION_MS - elapsed);
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

  const secondsLeft = Math.ceil(remainingMs / 1000);
  const progress = 1 - remainingMs / STOP_DURATION_MS;

  const phaseIndex = useMemo(() => {
    if (!stopping) return 0;
    const t = STOP_DURATION_MS - remainingMs;
    if (t < STOP_DURATION_MS / 3) return 0;
    if (t < (2 * STOP_DURATION_MS) / 3) return 1;
    return 2;
  }, [remainingMs, stopping]);

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

  const countdownStopping = (
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
        Stopping in {secondsLeft} second{secondsLeft === 1 ? '' : 's'}. Please wait.
      </p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const progressStopping = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Stopping cycle
      </h2>
      <p className="mt-3 font-[\'Avenir:Roman\',sans-serif] text-[14px] leading-snug text-[#525252]">
        The machine is finishing safely. This takes about ten seconds.
      </p>
      <div className="mt-5 border border-[#d4d4d4] bg-[#f5f5f5] p-1">
        <div
          className="h-2 bg-[#0057d9] transition-[width] duration-75 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
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

  const ringSize = 132;
  const stroke = 8;
  const r = (ringSize - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - progress);

  const ringStopping = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="text-center font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Stopping cycle
      </h2>
      <div className="relative mx-auto mt-5 flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
        <svg width={ringSize} height={ringSize} className="-rotate-90" aria-hidden>
          <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="#e5e5e5" strokeWidth={stroke} />
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={r}
            fill="none"
            stroke="#0057d9"
            strokeWidth={stroke}
            strokeLinecap="butt"
            strokeDasharray={c}
            strokeDashoffset={dash}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-[\'Avenir:Heavy\',sans-serif] text-[34px] leading-none text-[#1a1a1a]">{secondsLeft}</span>
          <span className="mt-1 font-[\'Avenir:Roman\',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">sec left</span>
        </div>
      </div>
      <p className="mt-4 text-center font-[\'Avenir:Roman\',sans-serif] text-[13px] leading-snug text-[#525252]">
        Hold on while the drum slows and drains.
      </p>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-6`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const steps = [
    { label: 'End cycle', detail: 'Signaling the motor to stop' },
    { label: 'Drain', detail: 'Clearing water from the drum' },
    { label: 'Ready', detail: 'Safe to open soon' },
  ] as const;

  const stepsStopping = (
    <ModalShell>
      <h2 id="cancel-feedback-title" className="font-[\'Avenir:Heavy\',sans-serif] text-[15px] uppercase leading-tight text-[#1a1a1a]">
        Stopping cycle
      </h2>
      <ol className="mt-4 flex flex-col gap-2">
        {steps.map((s, i) => {
          const active = i === phaseIndex;
          const done = i < phaseIndex;
          return (
            <li
              key={s.label}
              className={`border px-3 py-2.5 transition-colors ${
                active ? 'border-[#1a1a1a] bg-[#fafafa]' : 'border-[#e5e5e5] bg-white'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-[\'Avenir:Heavy\',sans-serif] text-[12px] text-[#1a1a1a]">
                  {done ? '✓ ' : ''}
                  {i + 1}. {s.label}
                </p>
                {active ? (
                  <span className="shrink-0 font-[\'Avenir:Roman\',sans-serif] text-[10px] uppercase tracking-wide text-[#737373]">
                    In progress
                  </span>
                ) : null}
              </div>
              <p className="mt-1 font-[\'Avenir:Roman\',sans-serif] text-[11px] leading-snug text-[#737373]">{s.detail}</p>
            </li>
          );
        })}
      </ol>
      <button type="button" className={`${primaryBtn} ${primaryBlue} mt-5`} disabled>
        Stopping…
      </button>
      <button type="button" className={linkBtn} disabled>
        Close
      </button>
    </ModalShell>
  );

  const sheetStopping = (
    <>
      <div className="pointer-events-none flex min-h-[120px] w-full max-w-[320px] items-end justify-center border border-[#2a2a2a] bg-[#1a1a1a] px-4 pb-6 pt-10">
        <p className="text-center font-[\'Avenir:Roman\',sans-serif] text-[12px] text-[#a3a3a3]">Background screen (dimmed)</p>
      </div>
      <div className="w-full max-w-[320px] border border-t-2 border-[#d4d4d4] bg-white px-5 py-5">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 size-9 shrink-0 rounded-full border-2 border-[#e5e5e5] border-t-[#0057d9] animate-spin"
            aria-hidden
          />
          <div>
            <p className="font-[\'Avenir:Heavy\',sans-serif] text-[13px] uppercase leading-tight text-[#1a1a1a]">Stopping cycle</p>
            <p className="mt-1 font-[\'Avenir:Roman\',sans-serif] text-[13px] leading-snug text-[#525252]">
              About {secondsLeft} second{secondsLeft === 1 ? '' : 's'} left. The door stays locked until complete.
            </p>
            <p className="mt-2 font-[\'Avenir:Heavy\',sans-serif] text-[11px] uppercase tracking-wide text-[#b45309]">
              Do not open the door
            </p>
          </div>
        </div>
        <button type="button" className={`${primaryBtn} ${primaryBlue} mt-5`} disabled>
          Stopping…
        </button>
      </div>
    </>
  );

  let stoppingBody: ReactNode;
  switch (variant) {
    case 'countdownInModal':
      stoppingBody = countdownStopping;
      break;
    case 'progressBarModal':
      stoppingBody = progressStopping;
      break;
    case 'ringCountdownModal':
      stoppingBody = ringStopping;
      break;
    case 'phaseStepsModal':
      stoppingBody = stepsStopping;
      break;
    case 'bottomSheetStatus':
      stoppingBody = sheetStopping;
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
        Tap “Cancel cycle” to simulate the ~10s machine stop. Switch variants in the explorer.
      </p>
    </div>
  );
}
