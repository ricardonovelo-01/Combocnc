import { Droplet, Sun } from 'lucide-react';
import type { ReactNode } from 'react';
import type { FullControlWashDryVariant } from '../explorer-meta';

type Props = {
  variant: FullControlWashDryVariant;
  showWash: boolean;
  showDry: boolean;
  wash: ReactNode;
  dry: ReactNode;
};

/**
 * Five alternative ways to separate “wash” vs “dry” in full-control layout:
 * color temperature, structure, typography, and labeling — no elevation shadows.
 */
export function FullControlWashDryChrome({ variant, showWash, showDry, wash, dry }: Props) {
  if (variant === 'accentRails') {
    return (
      <div className="flex flex-col gap-3">
        {showWash && (
          <section
            className="rounded-[10px] border border-[#bae6fd] border-l-[5px] border-l-[#0284c7] bg-[#f0f9ff] px-3 py-3"
            aria-labelledby="fc-wash-rails"
          >
            <div className="mb-3" id="fc-wash-rails">
              <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#0c4a6e]">Wash</p>
              <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] text-[#0369a1]">
                Water temperature, spin, soil
              </p>
            </div>
            {wash}
          </section>
        )}
        {showDry && (
          <section
            className="rounded-[10px] border border-[#fed7aa] border-l-[5px] border-l-[#ea580c] bg-[#fff7ed] px-3 py-3"
            aria-labelledby="fc-dry-rails"
          >
            <div className="mb-3" id="fc-dry-rails">
              <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#9a3412]">Dry</p>
              <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] text-[#c2410c]">
                Heat, sensor or timed minutes, dryness
              </p>
            </div>
            {dry}
          </section>
        )}
      </div>
    );
  }

  if (variant === 'tintedPanels') {
    return (
      <div className="flex flex-col gap-3">
        {showWash && (
          <section
            className="rounded-[14px] border border-[#99f6e4] bg-[#ecfeff] p-3"
            aria-labelledby="fc-wash-tint"
          >
            <div className="mb-3 flex items-center justify-between gap-2" id="fc-wash-tint">
              <p className="font-['Avenir:Heavy',sans-serif] text-[14px] uppercase tracking-wide text-[#0f766e]">
                Washing
              </p>
              <span className="rounded-full border border-[#5eead4] bg-white px-2 py-0.5 font-['Avenir:Roman',sans-serif] text-[10px] text-[#115e59]">
                Cold / warm water
              </span>
            </div>
            {wash}
          </section>
        )}
        {showDry && (
          <section
            className="rounded-[14px] border border-[#fcd34d] bg-[#fffbeb] p-3"
            aria-labelledby="fc-dry-tint"
          >
            <div className="mb-3 flex items-center justify-between gap-2" id="fc-dry-tint">
              <p className="font-['Avenir:Heavy',sans-serif] text-[14px] uppercase tracking-wide text-[#b45309]">
                Drying
              </p>
              <span className="rounded-full border border-[#fbbf24] bg-white px-2 py-0.5 font-['Avenir:Roman',sans-serif] text-[10px] text-[#92400e]">
                Air & heat
              </span>
            </div>
            {dry}
          </section>
        )}
      </div>
    );
  }

  if (variant === 'stepNumbers') {
    return (
      <div className="flex flex-col gap-4">
        {showWash && (
          <section className="flex gap-3" aria-labelledby="fc-wash-step">
            <div
              className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white"
              aria-hidden
            >
              <span className="font-['Avenir:Heavy',sans-serif] text-[13px] leading-none text-[#1a1a1a]">1</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-wash-step">
                Wash
              </p>
              <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-3">{wash}</div>
            </div>
          </section>
        )}
        {showDry && (
          <section className="flex gap-3" aria-labelledby="fc-dry-step">
            <div
              className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white"
              aria-hidden
            >
              <span className="font-['Avenir:Heavy',sans-serif] text-[13px] leading-none text-[#1a1a1a]">2</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-dry-step">
                Dry
              </p>
              <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-3">{dry}</div>
            </div>
          </section>
        )}
      </div>
    );
  }

  if (variant === 'iconHeaders') {
    return (
      <div className="flex flex-col gap-4">
        {showWash && (
          <section className="rounded-[12px] border border-[#e5e5e5] bg-white" aria-labelledby="fc-wash-icon">
            <div className="flex items-start gap-3 border-b border-[#f0f0f0] bg-[#f8fafc] px-3 py-2.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#bae6fd] bg-white text-[#0284c7]">
                <Droplet size={22} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-wash-icon">
                  Wash
                </p>
                <p className="font-['Avenir:Roman',sans-serif] text-[11px] text-[#737373]">Load cleaning</p>
              </div>
            </div>
            <div className="p-3">{wash}</div>
          </section>
        )}
        {showDry && (
          <section className="rounded-[12px] border border-[#e5e5e5] bg-white" aria-labelledby="fc-dry-icon">
            <div className="flex items-start gap-3 border-b border-[#f0f0f0] bg-[#fffbeb] px-3 py-2.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#fed7aa] bg-white text-[#ea580c]">
                <Sun size={22} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-dry-icon">
                  Dry
                </p>
                <p className="font-['Avenir:Roman',sans-serif] text-[11px] text-[#737373]">Moisture & finish</p>
              </div>
            </div>
            <div className="p-3">{dry}</div>
          </section>
        )}
      </div>
    );
  }

  // dividerLabels
  return (
    <div className="flex flex-col gap-6">
      {showWash && (
        <section aria-labelledby="fc-wash-div">
          <div className="relative mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-[#d4d4d4]" />
            <span
              className="shrink-0 bg-white px-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-[0.2em] text-[#525252]"
              id="fc-wash-div"
            >
              Wash
            </span>
            <div className="h-px flex-1 bg-[#d4d4d4]" />
          </div>
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-3">{wash}</div>
        </section>
      )}
      {showDry && (
        <section aria-labelledby="fc-dry-div">
          <div className="relative mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-[#d4d4d4]" />
            <span
              className="shrink-0 bg-white px-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-[0.2em] text-[#525252]"
              id="fc-dry-div"
            >
              Dry
            </span>
            <div className="h-px flex-1 bg-[#d4d4d4]" />
          </div>
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-3">{dry}</div>
        </section>
      )}
    </div>
  );
}
