import { useState } from 'react';
import { ExplorePanel } from './components/ExplorePanel';
import { LaundryControlApp } from './components/LaundryControlApp';
import type { LayoutVariant } from './explorer-meta';
import type { TimeUxVariant } from './components/DryControlsSection';

export default function App() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [timeVariant, setTimeVariant] = useState<TimeUxVariant>('segmented');
  const [otherTimeOpen, setOtherTimeOpen] = useState(false);
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('fullControl');

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 bg-[#ebebeb]">
      <ExplorePanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        timeVariant={timeVariant}
        onTimeVariant={setTimeVariant}
        otherTimeOpen={otherTimeOpen}
        onOtherTimeOpen={setOtherTimeOpen}
        layoutVariant={layoutVariant}
        onLayoutVariant={setLayoutVariant}
      />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-auto p-4 sm:p-8">
        <div className="flex w-full max-w-[400px] flex-col items-center gap-3">
          <p className="max-w-[360px] text-center font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#525252]">
            Live preview · Time UX + layout shell. Prototype 1 (segmented dry) is the base; layout options change how the rest of the controls are revealed.
          </p>
          <div className="h-[min(100vh-10rem,880px)] w-full max-w-[360px] shrink-0">
            <LaundryControlApp timeVariant={timeVariant} layoutVariant={layoutVariant} />
          </div>
        </div>
      </main>
    </div>
  );
}
