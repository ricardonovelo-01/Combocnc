import { ChevronRight, PanelLeftClose, PanelLeft } from 'lucide-react';
import type { TimeUxVariant } from './DryControlsSection';
import { TIME_UX_META, TIME_UX_VARIANT_ORDER } from '../time-ux-meta';
import type { LayoutVariant } from '../layout-variants';
import { LAYOUT_META, LAYOUT_VARIANT_ORDER } from '../layout-variants';

type Props = {
  open: boolean;
  onToggleOpen: () => void;
  timeVariant: TimeUxVariant;
  onTimeVariant: (v: TimeUxVariant) => void;
  layoutVariant: LayoutVariant;
  onLayoutVariant: (v: LayoutVariant) => void;
};

export function PrototypeLeftPanel({
  open,
  onToggleOpen,
  timeVariant,
  onTimeVariant,
  layoutVariant,
  onLayoutVariant,
}: Props) {
  return (
    <div
      className={`flex h-full min-h-0 shrink-0 flex-col border-r border-[#e5e5e5] bg-[#fafafa] transition-[width] duration-200 ease-out ${
        open ? 'w-[min(100%,320px)]' : 'w-12'
      }`}
    >
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#e5e5e5] px-2">
        {open ? (
          <span className="truncate pl-1 font-['Avenir:Heavy',sans-serif] text-[12px] text-[#404040]">Prototypes</span>
        ) : null}
        <button
          type="button"
          onClick={onToggleOpen}
          className="ml-auto flex size-8 items-center justify-center rounded-[8px] text-[#404040] hover:bg-[#f0f0f0]"
          aria-expanded={open}
          title={open ? 'Collapse panel' : 'Expand panel'}
        >
          {open ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
        </button>
      </div>

      {open ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">Time interaction</p>
          <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#8e8e8e]">
            Dry timing UX (default: segmented, prototype 1).
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {TIME_UX_VARIANT_ORDER.map(id => {
              const meta = TIME_UX_META[id];
              const selected = timeVariant === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onTimeVariant(id)}
                  className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-white shadow-sm'
                      : 'border-transparent bg-transparent hover:bg-[#f0f0f0]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]">{meta.title}</p>
                  <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                    {meta.blurb}
                  </p>
                </button>
              );
            })}
          </div>

          <p className="mt-6 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
            Layout shell
          </p>
          <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#8e8e8e]">
            How the same controls are grouped—same screen, no new routes.
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {LAYOUT_VARIANT_ORDER.map(id => {
              const meta = LAYOUT_META[id];
              const selected = layoutVariant === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onLayoutVariant(id)}
                  className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-white shadow-sm'
                      : 'border-transparent bg-transparent hover:bg-[#f0f0f0]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]">{meta.title}</p>
                  <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                    {meta.blurb}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center pt-2">
          <button
            type="button"
            onClick={onToggleOpen}
            className="flex size-8 items-center justify-center rounded-[8px] text-[#404040] hover:bg-[#f0f0f0]"
            title="Expand prototypes"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
