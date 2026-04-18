import { useState } from 'react';
import { ExplorePanel } from './components/ExplorePanel';
import { LaundryControlApp } from './components/LaundryControlApp';
import { CancelCycleFeedbackPrototype } from './components/CancelCycleFeedbackPrototype';
import type { CancelCycleFeedbackVariant, PrototypeScene } from './cancel-cycle-feedback-variants';
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
              : 'Cancel cycle — confirm, then ~10s stopping state. Switch variants in the explorer.'}
          </p>
          <div className="h-[min(100vh-10rem,880px)] w-full max-w-[360px] shrink-0">
            {prototypeScene === 'laundry' ? (
              <LaundryControlApp
                timeVariant={timeVariant}
                layoutVariant={layoutVariant}
                progressiveDisclosureStyle={progressiveDisclosureStyle}
                fullControlWashDryStyle={fullControlWashDryStyle}
              />
            ) : (
              <CancelCycleFeedbackPrototype variant={cancelFeedbackVariant} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
