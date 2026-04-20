import { ChevronDown, Layers, LayoutGrid, PanelLeft, Timer } from 'lucide-react';
import type { TimeUxVariant } from './DryControlsSection';
import {
  FULL_CONTROL_WASH_DRY_META,
  FULL_CONTROL_WASH_DRY_ORDER,
  LAYOUT_META,
  MORE_LAYOUT_VARIANTS,
  OTHER_TIME_VARIANTS,
  PRIMARY_TIME_VARIANTS,
  PROTOTYPE_META,
  type FullControlWashDryVariant,
  type LayoutVariant,
} from '../explorer-meta';
import {
  PROGRESSIVE_DISCLOSURE_META,
  PROGRESSIVE_DISCLOSURE_ORDER,
  type ProgressiveDisclosureStyle,
} from '../progressive-disclosure-styles';
import {
  CANCEL_CYCLE_FEEDBACK_META,
  CANCEL_CYCLE_FEEDBACK_ORDER,
  type CancelCycleFeedbackVariant,
  type PrototypeScene,
} from '../cancel-cycle-feedback-variants';
import {
  RUNNING_CYCLE_META,
  RUNNING_CYCLE_ORDER,
  type RunningCycleMode,
  type RunningCycleVariant,
} from '../running-cycle-variants';

type ExplorePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prototypeScene: PrototypeScene;
  onPrototypeScene: (v: PrototypeScene) => void;
  cancelFeedbackVariant: CancelCycleFeedbackVariant;
  onCancelFeedbackVariant: (v: CancelCycleFeedbackVariant) => void;
  runningCycleVariant: RunningCycleVariant;
  onRunningCycleVariant: (v: RunningCycleVariant) => void;
  runningCycleMode: RunningCycleMode;
  onRunningCycleMode: (v: RunningCycleMode) => void;
  timeVariant: TimeUxVariant;
  onTimeVariant: (v: TimeUxVariant) => void;
  otherTimeOpen: boolean;
  onOtherTimeOpen: (open: boolean) => void;
  layoutVariant: LayoutVariant;
  onLayoutVariant: (v: LayoutVariant) => void;
  moreLayoutsOpen: boolean;
  onMoreLayoutsOpen: (open: boolean) => void;
  fullControlWashDryStyle: FullControlWashDryVariant;
  onFullControlWashDryStyle: (v: FullControlWashDryVariant) => void;
  washDryChromeOpen: boolean;
  onWashDryChromeOpen: (open: boolean) => void;
  progressiveDisclosureStyle: ProgressiveDisclosureStyle;
  onProgressiveDisclosureStyle: (v: ProgressiveDisclosureStyle) => void;
};

export function ExplorePanel({
  open,
  onOpenChange,
  prototypeScene,
  onPrototypeScene,
  cancelFeedbackVariant,
  onCancelFeedbackVariant,
  runningCycleVariant,
  onRunningCycleVariant,
  runningCycleMode,
  onRunningCycleMode,
  timeVariant,
  onTimeVariant,
  otherTimeOpen,
  onOtherTimeOpen,
  layoutVariant,
  onLayoutVariant,
  moreLayoutsOpen,
  onMoreLayoutsOpen,
  fullControlWashDryStyle,
  onFullControlWashDryStyle,
  washDryChromeOpen,
  onWashDryChromeOpen,
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
            <Layers size={15} className="text-[#404040]" strokeWidth={2} />
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Prototype
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {(['laundry', 'runningCycle', 'cancelFeedback'] as const).map(key => {
              const selected = prototypeScene === key;
              const label =
                key === 'laundry'
                  ? 'Laundry control'
                  : key === 'runningCycle'
                    ? 'Running cycle'
                    : 'Cancel cycle (stopping)';
              const hint =
                key === 'laundry'
                  ? 'Main appliance UI, time + layout variants.'
                  : key === 'runningCycle'
                    ? 'In-cycle progress: wash vs dry bar and phase copy.'
                    : 'After confirm, stopping feedback while the machine finishes (duration varies).';
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onPrototypeScene(key)}
                  className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                      : 'border-[#e5e5e5] bg-white text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{label}</p>
                  <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                    {hint}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {prototypeScene === 'runningCycle' && (
          <div className="mb-5 border-b border-[#f0f0f0] pb-5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Progress bar
            </p>
            <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#8e8e8e]">
              Segmented vs unified progress on the running screen.
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {RUNNING_CYCLE_ORDER.map(id => {
                const meta = RUNNING_CYCLE_META[id];
                const selected = runningCycleVariant === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onRunningCycleVariant(id)}
                    className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                      selected
                        ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                        : 'border-[#e5e5e5] bg-white text-[#525252] hover:border-[#d4d4d4]'
                    }`}
                  >
                    <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{meta.title}</p>
                    <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                      {meta.blurb}
                    </p>
                  </button>
                );
              })}
            </div>
            <p className="mb-2 mt-4 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Machine mode
            </p>
            <div className="flex flex-col gap-1.5">
              {(['combo', 'washerOnly'] as const).map(m => {
                const selected = runningCycleMode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onRunningCycleMode(m)}
                    className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                      selected
                        ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                        : 'border-[#e5e5e5] bg-white text-[#525252] hover:border-[#d4d4d4]'
                    }`}
                  >
                    <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">
                      {m === 'combo' ? 'Wash & dry' : 'Wash only'}
                    </p>
                    <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                      {m === 'combo' ? 'Two phases on the bar when applicable.' : 'Single wash phase only.'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {prototypeScene === 'cancelFeedback' && (
          <div className="mb-5 border-b border-[#f0f0f0] pb-5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Stopping feedback
            </p>
            <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#8e8e8e]">
              Five patterns for cancel-in-progress feedback without promising an exact duration.
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {CANCEL_CYCLE_FEEDBACK_ORDER.map(id => {
                const meta = CANCEL_CYCLE_FEEDBACK_META[id];
                const selected = cancelFeedbackVariant === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onCancelFeedbackVariant(id)}
                    className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                      selected
                        ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                        : 'border-[#e5e5e5] bg-white text-[#525252] hover:border-[#d4d4d4]'
                    }`}
                  >
                    <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{meta.title}</p>
                    <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                      {meta.blurb}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {prototypeScene === 'laundry' && (
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
        )}

        {prototypeScene === 'laundry' && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <LayoutGrid size={15} className="text-[#404040]" strokeWidth={2} />
            <p className="font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
              Layout
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {(['fullControl'] as const).map(key => {
              const meta = LAYOUT_META[key];
              const selected = layoutVariant === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onLayoutVariant(key)}
                  className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                    selected
                      ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                      : 'border-[#e5e5e5] bg-white text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{meta.title}</p>
                  <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                    {meta.panelHint}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onMoreLayoutsOpen(!moreLayoutsOpen)}
            aria-expanded={moreLayoutsOpen}
            className="mt-2 flex w-full items-center justify-between rounded-[8px] border border-dashed border-[#d4d4d4] bg-[#fafafa] px-2.5 py-2 text-left hover:bg-[#f5f5f5]"
          >
            <span className="min-w-0 font-['Avenir:Heavy',sans-serif] text-[11px] text-[#525252]">
              More layouts
              {layoutVariant !== 'fullControl' && !moreLayoutsOpen ? (
                <span className="mt-0.5 block truncate font-['Avenir:Roman',sans-serif] text-[10px] font-normal text-[#737373]">
                  {LAYOUT_META[layoutVariant].title}
                </span>
              ) : null}
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-[#737373] transition-transform ${moreLayoutsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {moreLayoutsOpen && (
            <div className="mt-2 flex flex-col gap-1.5 border-l-2 border-[#e5e5e5] pl-2">
              {MORE_LAYOUT_VARIANTS.map(key => {
                const meta = LAYOUT_META[key];
                const selected = layoutVariant === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onLayoutVariant(key)}
                    className={`rounded-[8px] border px-2.5 py-2 text-left transition-colors ${
                      selected
                        ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                        : 'border-[#ebebeb] bg-white text-[#525252] hover:border-[#d4d4d4]'
                    }`}
                  >
                    <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{meta.title}</p>
                    <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                      {meta.panelHint}
                    </p>
                  </button>
                );
              })}

              {layoutVariant === 'moreControls' && (
                <div className="mt-3 border-t border-[#f0f0f0] pt-3">
                  <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-wide text-[#737373]">
                    Disclosure style
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
                              ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                              : 'border-[#e5e5e5] bg-white hover:border-[#d4d4d4]'
                          }`}
                        >
                          <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{meta.title}</p>
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
          )}

          {layoutVariant === 'fullControl' && (
            <div className="mt-5 border-t border-[#f0f0f0] pt-5">
              <button
                type="button"
                onClick={() => onWashDryChromeOpen(!washDryChromeOpen)}
                aria-expanded={washDryChromeOpen}
                className="flex w-full items-center justify-between rounded-[8px] border border-dashed border-[#d4d4d4] bg-[#fafafa] px-2.5 py-2 text-left hover:bg-[#f5f5f5]"
              >
                <span className="min-w-0 font-['Avenir:Heavy',sans-serif] text-[11px] text-[#525252]">
                  Wash vs dry framing
                  {!washDryChromeOpen ? (
                    <span className="mt-0.5 block truncate font-['Avenir:Roman',sans-serif] text-[10px] font-normal text-[#737373]">
                      {FULL_CONTROL_WASH_DRY_META[fullControlWashDryStyle].title}
                    </span>
                  ) : null}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[#737373] transition-transform ${washDryChromeOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {washDryChromeOpen && (
                <div className="mt-2 flex flex-col gap-1.5 border-l-2 border-[#e5e5e5] pl-2">
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
                            ? 'border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a]'
                            : 'border-[#ebebeb] bg-white text-[#525252] hover:border-[#d4d4d4]'
                        }`}
                      >
                        <p className="font-['Avenir:Heavy',sans-serif] text-[12px]">{meta.title}</p>
                        <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[10px] leading-snug text-[#737373]">
                          {meta.hint}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        )}
      </div>
    </aside>
  );
}
