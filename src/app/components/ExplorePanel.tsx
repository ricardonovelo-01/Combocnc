import { ChevronDown, LayoutGrid, PanelLeft, Timer } from 'lucide-react';
import type { TimeUxVariant } from './DryControlsSection';
import type { LayoutVariant } from '../explorer-meta';
import {
  FULL_CONTROL_WASH_DRY_META,
  FULL_CONTROL_WASH_DRY_ORDER,
  LAYOUT_META,
  OTHER_TIME_VARIANTS,
  PRIMARY_TIME_VARIANTS,
  PROTOTYPE_META,
  type FullControlWashDryVariant,
} from '../explorer-meta';
import {
  PROGRESSIVE_DISCLOSURE_META,
  PROGRESSIVE_DISCLOSURE_ORDER,
  type ProgressiveDisclosureStyle,
} from '../progressive-disclosure-styles';

type ExplorePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeVariant: TimeUxVariant;
  onTimeVariant: (v: TimeUxVariant) => void;
  otherTimeOpen: boolean;
  onOtherTimeOpen: (open: boolean) => void;
  layoutVariant: LayoutVariant;
  onLayoutVariant: (v: LayoutVariant) => void;
  fullControlWashDryStyle: FullControlWashDryVariant;
  onFullControlWashDryStyle: (v: FullControlWashDryVariant) => void;
  progressiveDisclosureStyle: ProgressiveDisclosureStyle;
  onProgressiveDisclosureStyle: (v: ProgressiveDisclosureStyle) => void;
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
  fullControlWashDryStyle,
  onFullControlWashDryStyle,
  progressiveDisclosureStyle,
  onProgressiveDisclosureStyle,
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
    <aside className="flex h-full w-[min(100vw,280px)] shrink-0 flex-col border-r border-[#e5e5e5] bg-white">
      <div className="flex items-center justify-between border-b border-[#f0f0f0] px-3 py-2.5">
        <p className="font-['Avenir:Heavy',sans-serif] text-[14px] text-[#1a1a1a]">Explorer</p>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] text-[#525252] hover:bg-[#f5f5f5]"
          aria-label="Collapse panel"
        >
          <PanelLeft size={20} className="rotate-180" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-2">
            <Timer size={15} className="text-[#404040]" strokeWidth={2} />
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Time
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {PRIMARY_TIME_VARIANTS.map(v => {
              const meta = PROTOTYPE_META[v];
              const selected = timeVariant === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => onTimeVariant(v)}
                  className={`rounded-[8px] border px-2.5 py-2 text-left text-[12px] font-['Avenir:Heavy',sans-serif] transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                      : 'border-[#e5e5e5] bg-white text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  {meta.title}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onOtherTimeOpen(!otherTimeOpen)}
            aria-expanded={otherTimeOpen}
            className="mt-2 flex w-full items-center justify-between rounded-[8px] border border-dashed border-[#d4d4d4] bg-[#fafafa] px-2.5 py-2 text-left hover:bg-[#f5f5f5]"
          >
            <span className="font-['Avenir:Heavy',sans-serif] text-[11px] text-[#525252]">More</span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-[#737373] transition-transform ${otherTimeOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {otherTimeOpen && (
            <div className="mt-2 flex flex-col gap-1.5 border-l-2 border-[#e5e5e5] pl-2">
              {OTHER_TIME_VARIANTS.map(v => {
                const meta = PROTOTYPE_META[v];
                const selected = timeVariant === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onTimeVariant(v)}
                    className={`rounded-[8px] border px-2.5 py-1.5 text-left text-[11px] font-['Avenir:Heavy',sans-serif] transition-colors ${
                      selected
                        ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                        : 'border-[#ebebeb] bg-white text-[#525252] hover:border-[#d4d4d4]'
                    }`}
                  >
                    {meta.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <LayoutGrid size={15} className="text-[#404040]" strokeWidth={2} />
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Layout
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(LAYOUT_META) as LayoutVariant[]).map(key => {
              const meta = LAYOUT_META[key];
              const selected = layoutVariant === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onLayoutVariant(key)}
                  className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-[#fafafa] ring-1 ring-[#1a1a1a]/10'
                      : 'border-[#e5e5e5] bg-white hover:border-[#d4d4d4]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]">{meta.title}</p>
                  <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                    {meta.panelHint}
                  </p>
                </button>
              );
            })}
          </div>

          {layoutVariant === 'fullControl' && (
            <div className="mt-5 border-t border-[#f0f0f0] pt-5">
              <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
                Wash vs dry (full control)
              </p>
              <div className="flex flex-col gap-1.5">
                {FULL_CONTROL_WASH_DRY_ORDER.map(key => {
                  const meta = FULL_CONTROL_WASH_DRY_META[key];
                  const selected = fullControlWashDryStyle === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onFullControlWashDryStyle(key)}
                      className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                        selected
                          ? 'border-[#1a1a1a] bg-[#fafafa]'
                          : 'border-[#e5e5e5] bg-white hover:border-[#d4d4d4]'
                      }`}
                    >
                      <p className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]">{meta.title}</p>
                      <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                        {meta.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {layoutVariant === 'moreControls' && (
            <div className="mt-5 border-t border-[#f0f0f0] pt-5">
              <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
                Progressive disclosure style
              </p>
              <div className="flex flex-col gap-1.5">
                {PROGRESSIVE_DISCLOSURE_ORDER.map(key => {
                  const meta = PROGRESSIVE_DISCLOSURE_META[key];
                  const selected = progressiveDisclosureStyle === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onProgressiveDisclosureStyle(key)}
                      className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                        selected
                          ? 'border-[#1a1a1a] bg-[#fafafa] ring-1 ring-[#1a1a1a]/10'
                          : 'border-[#e5e5e5] bg-white hover:border-[#d4d4d4]'
                      }`}
                    >
                      <p className="font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]">{meta.title}</p>
                      <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                        {meta.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
