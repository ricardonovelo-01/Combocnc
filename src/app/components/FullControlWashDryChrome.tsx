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

/** Shared rhythm: space between wash/dry groups, and padding inside each group’s control area. */
const betweenGroups = 'gap-4';
const contentInset = 'px-4 py-3';
const headerToContent = 'mb-3';

/**
 * Five ways to separate wash vs dry in full control using only neutrals (value, borders,
 * type, structure)—no chromatic fills. Spacing is tuned so headers and controls align.
 */
export function FullControlWashDryChrome({ variant, showWash, showDry, wash, dry }: Props) {
  if (variant === 'accentRails') {
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section
            className={`rounded-[10px] border border-[#e5e5e5] border-l-[5px] border-l-[#404040] bg-white ${contentInset}`}
            aria-labelledby="fc-wash-rails"
          >
            <div className={headerToContent} id="fc-wash-rails">
              <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]">Wash</p>
              <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
                Temperature, spin, soil
              </p>
            </div>
            <div className="flex flex-col gap-3">{wash}</div>
          </section>
        )}
        {showDry && (
          <section
            className={`rounded-[10px] border border-[#e5e5e5] border-l-[5px] border-l-[#a3a3a3] bg-[#fafafa] ${contentInset}`}
            aria-labelledby="fc-dry-rails"
          >
            <div className={headerToContent} id="fc-dry-rails">
              <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]">Dry</p>
              <p className="mt-1 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
                Heat, sensor or timed minutes, dryness
              </p>
            </div>
            <div className="flex flex-col gap-3">{dry}</div>
          </section>
        )}
      </div>
    );
  }

  if (variant === 'tintedPanels') {
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section
            className="rounded-[12px] border border-[#e5e5e5] bg-white p-4"
            aria-labelledby="fc-wash-tint"
          >
            <div className={`mb-4 flex flex-wrap items-center justify-between gap-2`} id="fc-wash-tint">
              <p className="font-['Avenir:Heavy',sans-serif] text-[13px] uppercase tracking-wide text-[#1a1a1a]">
                Washing
              </p>
              <span className="rounded-full border border-[#d4d4d4] bg-[#fafafa] px-2.5 py-1 font-['Avenir:Roman',sans-serif] text-[10px] text-[#525252]">
                Agitation & rinse
              </span>
            </div>
            <div className="flex flex-col gap-3">{wash}</div>
          </section>
        )}
        {showDry && (
          <section
            className="rounded-[12px] border border-[#e5e5e5] bg-[#fafafa] p-4"
            aria-labelledby="fc-dry-tint"
          >
            <div className={`mb-4 flex flex-wrap items-center justify-between gap-2`} id="fc-dry-tint">
              <p className="font-['Avenir:Heavy',sans-serif] text-[13px] uppercase tracking-wide text-[#1a1a1a]">
                Drying
              </p>
              <span className="rounded-full border border-[#d4d4d4] bg-white px-2.5 py-1 font-['Avenir:Roman',sans-serif] text-[10px] text-[#525252]">
                Heat & time
              </span>
            </div>
            <div className="flex flex-col gap-3">{dry}</div>
          </section>
        )}
      </div>
    );
  }

  if (variant === 'stepNumbers') {
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section className="flex gap-3" aria-labelledby="fc-wash-step">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white"
              aria-hidden
            >
              <span className="font-['Avenir:Heavy',sans-serif] text-[14px] leading-none text-[#1a1a1a]">1</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${headerToContent} font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]`} id="fc-wash-step">
                Wash
              </p>
              <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-4">
                <div className="flex flex-col gap-3">{wash}</div>
              </div>
            </div>
          </section>
        )}
        {showDry && (
          <section className="flex gap-3" aria-labelledby="fc-dry-step">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#525252] bg-white"
              aria-hidden
            >
              <span className="font-['Avenir:Heavy',sans-serif] text-[14px] leading-none text-[#262626]">2</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${headerToContent} font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]`} id="fc-dry-step">
                Dry
              </p>
              <div className="rounded-[10px] border border-[#e5e5e5] bg-white p-4">
                <div className="flex flex-col gap-3">{dry}</div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  if (variant === 'iconHeaders') {
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section className="overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white" aria-labelledby="fc-wash-icon">
            <div className="flex items-start gap-3 border-b border-[#f0f0f0] bg-[#fafafa] px-4 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#d4d4d4] bg-white text-[#404040]">
                <Droplet size={20} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-wash-icon">
                  Wash
                </p>
                <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
                  Load cleaning
                </p>
              </div>
            </div>
            <div className={`${contentInset} flex flex-col gap-3`}>{wash}</div>
          </section>
        )}
        {showDry && (
          <section className="overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white" aria-labelledby="fc-dry-icon">
            <div className="flex items-start gap-3 border-b border-[#f0f0f0] bg-[#fafafa] px-4 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#d4d4d4] bg-white text-[#404040]">
                <Sun size={20} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-dry-icon">
                  Dry
                </p>
                <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
                  Moisture & finish
                </p>
              </div>
            </div>
            <div className={`${contentInset} flex flex-col gap-3`}>{dry}</div>
          </section>
        )}
      </div>
    );
  }

  // dividerLabels
  return (
    <div className="flex flex-col gap-5">
      {showWash && (
        <section aria-labelledby="fc-wash-div">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d4d4d4]" />
            <span
              className="shrink-0 bg-white px-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-[0.18em] text-[#525252]"
              id="fc-wash-div"
            >
              Wash
            </span>
            <div className="h-px flex-1 bg-[#d4d4d4]" />
          </div>
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-4">
            <div className="flex flex-col gap-3">{wash}</div>
          </div>
        </section>
      )}
      {showDry && (
        <section aria-labelledby="fc-dry-div">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d4d4d4]" />
            <span
              className="shrink-0 bg-white px-2 font-['Avenir:Heavy',sans-serif] text-[11px] uppercase tracking-[0.18em] text-[#525252]"
              id="fc-dry-div"
            >
              Dry
            </span>
            <div className="h-px flex-1 bg-[#d4d4d4]" />
          </div>
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-4">
            <div className="flex flex-col gap-3">{dry}</div>
          </div>
        </section>
      )}
    </div>
  );
}
