import { ChevronDown, LayoutGrid, PanelLeft, Timer } from 'lucide-react';
import type { TimeUxVariant } from './DryControlsSection';
import type { LayoutVariant } from '../explorer-meta';
import {
  LAYOUT_META,
  OTHER_TIME_VARIANTS,
  PRIMARY_TIME_VARIANTS,
  PROTOTYPE_META,
} from '../explorer-meta';

type ExplorePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeVariant: TimeUxVariant;
  onTimeVariant: (v: TimeUxVariant) => void;
  otherTimeOpen: boolean;
  onOtherTimeOpen: (open: boolean) => void;
  layoutVariant: LayoutVariant;
  onLayoutVariant: (v: LayoutVariant) => void;
};

export function ExplorePanel({
  open,
  onOpenChange,
  timeVariant,
  onTimeVariant,
  otherTimeOpen,
  onOtherTimeOpen,
  layoutVariant,
  onLayoutVariant,
}: ExplorePanelProps) {
  if (!open) {
    return (
      <div className="flex h-full w-12 shrink-0 flex-col items-center border-r border-[#e5e5e5] bg-white py-3">
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="flex size-10 items-center justify-center rounded-[10px] text-[#404040] hover:bg-[#f5f5f5]"
          aria-label="Open prototype explorer"
        >
          <PanelLeft size={22} strokeWidth={2} />
        </button>
        <div className="mt-4 flex flex-1 flex-col items-center gap-3">
          <span className="text-[10px] font-['Avenir:Heavy',sans-serif] uppercase tracking-wider text-[#a3a3a3] [writing-mode:vertical-rl]">
            Explorer
          </span>
        </div>
      </div>
    );
  }

  return (
    <aside className="flex h-full w-[min(100vw,340px)] shrink-0 flex-col border-r border-[#e5e5e5] bg-white shadow-[4px_0_24px_-8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between border-b border-[#f0f0f0] px-3 py-3">
        <div>
          <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]">Prototype explorer</p>
          <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
            Time UX and layout treatments. Preview updates live.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] text-[#525252] hover:bg-[#f5f5f5]"
          aria-label="Collapse panel"
        >
          <PanelLeft size={20} className="rotate-180" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {/* Time variants */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <Timer size={16} className="text-[#404040]" strokeWidth={2} />
            <p className="font-['Avenir:Heavy',sans-serif] text-[12px] uppercase tracking-wide text-[#525252]">
              Time variants
            </p>
          </div>
          <p className="mb-3 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
            Two primary explorations; the rest stay under Other time explorations.
          </p>
          <div className="flex flex-col gap-2">
            {PRIMARY_TIME_VARIANTS.map(v => {
              const meta = PROTOTYPE_META[v];
              const selected = timeVariant === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => onTimeVariant(v)}
                  className={`rounded-[10px] border px-3 py-2.5 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-[#fafafa]'
                      : 'border-[#e5e5e5] bg-white hover:border-[#d4d4d4]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]">{meta.title}</p>
                  <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                    {meta.blurb}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onOtherTimeOpen(!otherTimeOpen)}
            aria-expanded={otherTimeOpen}
            className="mt-3 flex w-full items-center justify-between rounded-[10px] border border-dashed border-[#d4d4d4] bg-[#fafafa] px-3 py-2.5 text-left hover:bg-[#f5f5f5]"
          >
            <span className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#404040]">
              Other time explorations
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-[#737373] transition-transform ${otherTimeOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {otherTimeOpen && (
            <div className="mt-2 flex flex-col gap-2 border-l-2 border-[#e5e5e5] pl-3">
              {OTHER_TIME_VARIANTS.map(v => {
                const meta = PROTOTYPE_META[v];
                const selected = timeVariant === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onTimeVariant(v)}
                    className={`rounded-[10px] border px-3 py-2 text-left transition-colors ${
                      selected
                        ? 'border-[#1a1a1a] bg-[#fafafa]'
                        : 'border-[#ebebeb] bg-white hover:border-[#d4d4d4]'
                    }`}
                  >
                    <p className="font-['Avenir:Heavy',sans-serif] text-[11px] text-[#1a1a1a]">{meta.title}</p>
                    <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                      {meta.blurb}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Layout variants */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <LayoutGrid size={16} className="text-[#404040]" strokeWidth={2} />
            <p className="font-['Avenir:Heavy',sans-serif] text-[12px] uppercase tracking-wide text-[#525252]">
              Layout variants
            </p>
          </div>
          <p className="mb-3 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
            Same dry interaction as prototype 1 (segmented); only how the rest of the stack is revealed changes.
          </p>
          <div className="flex flex-col gap-3">
            {(Object.keys(LAYOUT_META) as LayoutVariant[]).map(key => {
              const meta = LAYOUT_META[key];
              const selected = layoutVariant === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onLayoutVariant(key)}
                  className={`rounded-[12px] border px-3 py-3 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-[#fafafa] ring-1 ring-[#1a1a1a]/10'
                      : 'border-[#e5e5e5] bg-white hover:border-[#d4d4d4]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a]">{meta.title}</p>
                  <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#525252]">
                    {meta.blurb}
                  </p>
                  <p className="mt-2 border-t border-[#f0f0f0] pt-2 font-['Avenir:Roman',sans-serif] text-[10px] italic leading-snug text-[#737373]">
                    {meta.rationale}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
