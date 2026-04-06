import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { LayoutVariant } from '../layout-variants';

export type LaundryLayoutSlots = {
  mode: ReactNode;
  cycle: ReactNode;
  wash: ReactNode;
  dry: ReactNode;
  dryToggles: ReactNode;
  wrinkle: ReactNode;
};

function CollapsibleBar({
  title,
  open,
  onToggle,
  children,
  subtle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  subtle?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-[#e5e5e5] ${subtle ? 'bg-white' : 'bg-[#fafafa]'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
      >
        <span className="font-['Avenir:Heavy',sans-serif] text-[14px] text-[#1a1a1a]">{title}</span>
        {open ? <ChevronUp size={18} className="shrink-0 text-[#404040]" /> : <ChevronDown size={18} className="shrink-0 text-[#404040]" />}
      </button>
      {open && <div className="border-t border-[#e5e5e5] px-3 pb-3 pt-3 flex flex-col gap-4">{children}</div>}
    </div>
  );
}

function FullOrder({ slots }: { slots: LaundryLayoutSlots }) {
  return (
    <>
      {slots.mode}
      {slots.cycle}
      {slots.wash}
      {slots.dry}
      {slots.dryToggles}
      {slots.wrinkle}
    </>
  );
}

export function LaundryLayouts({
  layout,
  slots,
}: {
  layout: LayoutVariant;
  slots: LaundryLayoutSlots;
}) {
  const [seeMore, setSeeMore] = useState(false);
  const [washOpen, setWashOpen] = useState(true);
  const [dryOpen, setDryOpen] = useState(true);
  const [extrasOpen, setExtrasOpen] = useState(true);
  const [allOptions, setAllOptions] = useState(false);
  const [moreSettings, setMoreSettings] = useState(false);

  const gapClass = layout === 'compactDensity' ? 'gap-2' : 'gap-4';
  const compact = layout === 'compactDensity';

  if (layout === 'full' || layout === 'compactDensity') {
    return (
      <div className={`flex flex-col ${gapClass} ${compact ? '[&_.capitalize]:text-[13px]' : ''}`}>
        <FullOrder slots={slots} />
      </div>
    );
  }

  if (layout === 'minimalSeeMore') {
    return (
      <div className="flex flex-col gap-4">
        {slots.mode}
        {slots.cycle}
        {slots.dry}
        <CollapsibleBar title="See more controls" open={seeMore} onToggle={() => setSeeMore(s => !s)}>
          {slots.wash}
          {slots.dryToggles}
          {slots.wrinkle}
        </CollapsibleBar>
      </div>
    );
  }

  if (layout === 'sectionedWashDryExtras') {
    return (
      <div className="flex flex-col gap-3">
        {slots.mode}
        {slots.cycle}
        <CollapsibleBar title="Wash" open={washOpen} onToggle={() => setWashOpen(s => !s)} subtle>
          {slots.wash}
        </CollapsibleBar>
        <CollapsibleBar title="Dry" open={dryOpen} onToggle={() => setDryOpen(s => !s)} subtle>
          {slots.dry}
          {slots.dryToggles}
        </CollapsibleBar>
        <CollapsibleBar title="Extras" open={extrasOpen} onToggle={() => setExtrasOpen(s => !s)} subtle>
          {slots.wrinkle}
        </CollapsibleBar>
      </div>
    );
  }

  if (layout === 'heroCycleStrip') {
    return (
      <div className="flex flex-col gap-4">
        {slots.mode}
        <div className="rounded-[12px] border border-[#e5e5e5] bg-[#fafafa] p-2">{slots.cycle}</div>
        {slots.dry}
        <CollapsibleBar title="All washing & drying options" open={allOptions} onToggle={() => setAllOptions(s => !s)}>
          {slots.wash}
          {slots.dryToggles}
          {slots.wrinkle}
        </CollapsibleBar>
      </div>
    );
  }

  if (layout === 'dryFirst') {
    return (
      <div className="flex flex-col gap-4">
        {slots.mode}
        {slots.dry}
        {slots.cycle}
        {slots.wash}
        {slots.dryToggles}
        {slots.wrinkle}
      </div>
    );
  }

  if (layout === 'sheetMoreInline') {
    return (
      <div className="flex flex-col gap-4">
        {slots.mode}
        {slots.cycle}
        {slots.dry}
        <CollapsibleBar title="More settings" open={moreSettings} onToggle={() => setMoreSettings(s => !s)}>
          {slots.wash}
          {slots.dryToggles}
          {slots.wrinkle}
        </CollapsibleBar>
      </div>
    );
  }

  return <FullOrder slots={slots} />;
}
