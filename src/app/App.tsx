import { useState } from 'react';
import { LaundryControlApp } from './components/LaundryControlApp';
import { PrototypeLeftPanel } from './components/PrototypeLeftPanel';
import type { TimeUxVariant } from './components/DryControlsSection';
import type { LayoutVariant } from './layout-variants';

export default function App() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [timeVariant, setTimeVariant] = useState<TimeUxVariant>('segmented');
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('full');

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-row bg-[#e8e8e8]">
      <PrototypeLeftPanel
        open={panelOpen}
        onToggleOpen={() => setPanelOpen(o => !o)}
        timeVariant={timeVariant}
        onTimeVariant={setTimeVariant}
        layoutVariant={layoutVariant}
        onLayoutVariant={setLayoutVariant}
      />
      <div className="flex min-h-0 min-w-0 flex-1 items-start justify-center overflow-auto p-4 sm:p-6">
        <div className="flex h-[min(100vh-8rem,880px)] w-[360px] shrink-0 flex-col">
          <LaundryControlApp variant={timeVariant} layoutVariant={layoutVariant} />
        </div>
      </div>
    </div>
  );
}
