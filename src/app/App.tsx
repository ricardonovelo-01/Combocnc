import { useState } from 'react';
import { ExplorePanel } from './components/ExplorePanel';
import { LaundryControlApp } from './components/LaundryControlApp';
import { CancelCycleFeedbackPrototype } from './components/CancelCycleFeedbackPrototype';
import { RunningCyclePrototype } from './components/RunningCyclePrototype';
import { RunningCycleDevPanel } from './components/RunningCycleDevPanel';
import { useRunningCycleTimer } from './use-running-cycle-timer';
import type { CancelCycleFeedbackVariant, PrototypeScene } from './cancel-cycle-feedback-variants';
import type { RunningCycleVariant, RunningCycleMode } from './running-cycle-variants';
import type { FullControlWashDryVariant, LayoutVariant } from './explorer-meta';
import type { ProgressiveDisclosureStyle } from './progressive-disclosure-styles';
import type { TimeUxVariant } from './components/DryControlsSection';
import { APP_VERSION } from './version';

export default function App() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [prototypeScene, setPrototypeScene] = useState<PrototypeScene>('laundry');
  const [cancelFeedbackVariant, setCancelFeedbackVariant] =
    useState<CancelCycleFeedbackVariant>('countdownInModal');
  const [timeVariant, setTimeVariant] = useState<TimeUxVariant>('segmented');
  const [otherTimeOpen, setOtherTimeOpen] = useState(false);
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('fullControl');
  const [moreLayoutsOpen, setMoreLayoutsOpen] = useState(false);
  const [washDryChromeOpen, setWashDryChromeOpen] = useState(false);
  const [fullControlWashDryStyle, setFullControlWashDryStyle] =
    useState<FullControlWashDryVariant>('simpleContainer');
  const [progressiveDisclosureStyle, setProgressiveDisclosureStyle] =
    useState<ProgressiveDisclosureStyle>('borderedCard');
  const [runningCycleVariant, setRunningCycleVariant] =
    useState<RunningCycleVariant>('segmentedSimple');
  const [runningCycleMode, setRunningCycleMode] =
    useState<RunningCycleMode>('combo');
  const [devPanelOpen, setDevPanelOpen] = useState(true);
  const runningCycleTimer = useRunningCycleTimer(runningCycleMode);

  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 bg-[#ebebeb]">
      <p
        className="pointer-events-none fixed bottom-2 right-2 z-[200] select-none font-mono text-[9px] leading-none text-[#a3a3a3]"
        title={`Build ${APP_VERSION}`}
        aria-hidden
      >
        {APP_VERSION}
      </p>
      <ExplorePanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        prototypeScene={prototypeScene}
        onPrototypeScene={setPrototypeScene}
        cancelFeedbackVariant={cancelFeedbackVariant}
        onCancelFeedbackVariant={setCancelFeedbackVariant}
        runningCycleVariant={runningCycleVariant}
        onRunningCycleVariant={setRunningCycleVariant}
        runningCycleMode={runningCycleMode}
        onRunningCycleMode={setRunningCycleMode}
        timeVariant={timeVariant}
        onTimeVariant={setTimeVariant}
        otherTimeOpen={otherTimeOpen}
        onOtherTimeOpen={setOtherTimeOpen}
        layoutVariant={layoutVariant}
        onLayoutVariant={v => {
          setLayoutVariant(v);
          if (v === 'fullControl') setMoreLayoutsOpen(false);
          else setMoreLayoutsOpen(true);
        }}
        moreLayoutsOpen={moreLayoutsOpen}
        onMoreLayoutsOpen={setMoreLayoutsOpen}
        fullControlWashDryStyle={fullControlWashDryStyle}
        onFullControlWashDryStyle={setFullControlWashDryStyle}
        washDryChromeOpen={washDryChromeOpen}
        onWashDryChromeOpen={setWashDryChromeOpen}
        progressiveDisclosureStyle={progressiveDisclosureStyle}
        onProgressiveDisclosureStyle={setProgressiveDisclosureStyle}
      />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-auto p-4 sm:p-8">
        <div className="flex w-full max-w-[400px] flex-col items-center gap-3">
          <p className="max-w-[360px] text-center font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
            {prototypeScene === 'laundry'
              ? 'Live preview — use the explorer to switch time UX and layout.'
              : prototypeScene === 'cancelFeedback'
                ? 'Cancel cycle — confirm, then stopping feedback (duration varies; demo uses a short timer).'
                : 'Running cycle — 4 progress variants. Use dev controls to jump time or reset.'}
          </p>
          <div className="h-[min(100vh-10rem,880px)] w-full max-w-[360px] shrink-0">
            {prototypeScene === 'laundry' ? (
              <LaundryControlApp
                timeVariant={timeVariant}
                layoutVariant={layoutVariant}
                progressiveDisclosureStyle={progressiveDisclosureStyle}
                fullControlWashDryStyle={fullControlWashDryStyle}
              />
            ) : prototypeScene === 'cancelFeedback' ? (
              <CancelCycleFeedbackPrototype variant={cancelFeedbackVariant} />
            ) : (
              <RunningCyclePrototype
                variant={runningCycleVariant}
                mode={runningCycleMode}
                timer={runningCycleTimer}
              />
            )}
          </div>
        </div>
      </main>
      {prototypeScene === 'runningCycle' && (
        <RunningCycleDevPanel
          open={devPanelOpen}
          onOpenChange={setDevPanelOpen}
          timer={runningCycleTimer}
        />
      )}
    </div>
  );
}
