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
 * Three ways to separate wash vs dry in full control (neutrals only).
 */
export function FullControlWashDryChrome({ variant, showWash, showDry, wash, dry }: Props) {
  if (variant === 'simpleContainer') {
    const box = 'rounded-[10px] border border-[#e5e5e5] bg-white';
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section className={`${box} ${contentInset}`} aria-labelledby="fc-wash-simple">
            <div className={headerToContent} id="fc-wash-simple">
              <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]">Wash</p>
            </div>
            <div className="flex flex-col gap-3">{wash}</div>
          </section>
        )}
        {showDry && (
          <section className={`${box} ${contentInset}`} aria-labelledby="fc-dry-simple">
            <div className={headerToContent} id="fc-dry-simple">
              <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]">Dry</p>
            </div>
            <div className="flex flex-col gap-3">{dry}</div>
          </section>
        )}
      </div>
    );
  }

  if (variant === 'iconHeaders') {
    const headerBand = 'flex items-start gap-3 border-b border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3';
    const bodyPanel = 'flex flex-col gap-3 bg-white px-4 py-3';
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section className="overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white" aria-labelledby="fc-wash-icon">
            <div className={headerBand}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#d4d4d4] bg-white text-[#404040]">
                <Droplet size={20} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-wash-icon">
                  Wash
                </p>
                <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
                  Temp · spin · soil
                </p>
              </div>
            </div>
            <div className={bodyPanel}>{wash}</div>
          </section>
        )}
        {showDry && (
          <section className="overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white" aria-labelledby="fc-dry-icon">
            <div className={headerBand}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#d4d4d4] bg-white text-[#404040]">
                <Sun size={20} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a]" id="fc-dry-icon">
                  Dry
                </p>
                <p className="mt-0.5 font-['Avenir:Roman',sans-serif] text-[11px] leading-snug text-[#737373]">
                  Heat · time · dryness
                </p>
              </div>
            </div>
            <div className={bodyPanel}>{dry}</div>
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
              className="shrink-0 bg-white px-2 font-['Avenir:Heavy',sans-serif] text-[14px] capitalize text-[#1a1a1a]"
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
              className="shrink-0 bg-white px-2 font-['Avenir:Heavy',sans-serif] text-[14px] capitalize text-[#1a1a1a]"
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
