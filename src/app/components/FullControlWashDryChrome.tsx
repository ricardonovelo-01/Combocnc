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
 * Full-control wash vs dry framing (neutrals only, borders + flat fills).
 * Variants are selected in the explorer under Full control → Wash vs dry.
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

  if (variant === 'dividerLabels') {
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

  /** Narrow vertical label on the left, controls on the right. */
  if (variant === 'sideRail') {
    const rail = (side: 'wash' | 'dry', children: ReactNode) => (
      <div className="flex min-w-0 overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white">
        <div
          className="flex w-[34px] shrink-0 items-center justify-center border-r border-[#e5e5e5] bg-[#fafafa] py-4"
          aria-hidden
        >
          <span className="font-['Avenir:Heavy',sans-serif] text-[10px] uppercase tracking-[0.12em] text-[#737373] [writing-mode:vertical-rl] rotate-180">
            {side === 'wash' ? 'Wash' : 'Dry'}
          </span>
        </div>
        <div className="min-w-0 flex-1 p-3">{children}</div>
      </div>
    );
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && rail('wash', <div className="flex flex-col gap-3">{wash}</div>)}
        {showDry && rail('dry', <div className="flex flex-col gap-3">{dry}</div>)}
      </div>
    );
  }

  /** Numbered circle + title, then controls. */
  if (variant === 'phaseBadges') {
    const head = (n: '1' | '2', id: string, title: string) => (
      <div className="mb-3 flex items-center gap-2.5" id={id}>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a] font-['Avenir:Heavy',sans-serif] text-[12px] text-[#1a1a1a]"
          aria-hidden
        >
          {n}
        </span>
        <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]">{title}</p>
      </div>
    );
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && (
          <section className="rounded-[12px] border border-[#e5e5e5] bg-white p-3" aria-labelledby="fc-wash-badge">
            {head('1', 'fc-wash-badge', 'Wash')}
            <div className="flex flex-col gap-3">{wash}</div>
          </section>
        )}
        {showDry && (
          <section className="rounded-[12px] border border-[#e5e5e5] bg-white p-3" aria-labelledby="fc-dry-badge">
            {head('2', 'fc-dry-badge', 'Dry')}
            <div className="flex flex-col gap-3">{dry}</div>
          </section>
        )}
      </div>
    );
  }

  /** Outer gray field, inner white tray (double frame). */
  if (variant === 'insetPanel') {
    const block = (title: string, id: string, children: ReactNode) => (
      <section className="rounded-[12px] border border-[#d4d4d4] bg-[#fafafa] p-2" aria-labelledby={id}>
        <p className="mb-2 px-1 font-['Avenir:Heavy',sans-serif] text-[14px] capitalize text-[#1a1a1a]" id={id}>
          {title}
        </p>
        <div className="rounded-[8px] border border-[#e5e5e5] bg-white p-3">
          <div className="flex flex-col gap-3">{children}</div>
        </div>
      </section>
    );
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && block('Wash', 'fc-wash-inset', wash)}
        {showDry && block('Dry', 'fc-dry-inset', dry)}
      </div>
    );
  }

  /** Flat strip: title + bottom rule only, minimal chrome. */
  if (variant === 'compactStrip') {
    const strip = (title: string, id: string, children: ReactNode) => (
      <section className="border-b border-[#e5e5e5] pb-4" aria-labelledby={id}>
        <p className="mb-3 font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]" id={id}>
          {title}
        </p>
        <div className="flex flex-col gap-3">{children}</div>
      </section>
    );
    return (
      <div className="flex flex-col gap-6">
        {showWash && strip('Wash', 'fc-wash-strip', wash)}
        {showDry && strip('Dry', 'fc-dry-strip', dry)}
      </div>
    );
  }

  /** Section tint + inner white bordered tray for controls. */
  if (variant === 'nestedTray') {
    const tray = (title: string, id: string, children: ReactNode) => (
      <section className="rounded-[12px] border border-[#e5e5e5] bg-[#fafafa] p-2" aria-labelledby={id}>
        <p className="mb-2 px-2 pt-1 font-['Avenir:Heavy',sans-serif] text-[14px] capitalize text-[#1a1a1a]" id={id}>
          {title}
        </p>
        <div className="rounded-[10px] border border-[#e5e5e5] bg-white px-3 py-3">
          <div className="flex flex-col gap-3">{children}</div>
        </div>
      </section>
    );
    return (
      <div className={`flex flex-col ${betweenGroups}`}>
        {showWash && tray('Wash', 'fc-wash-tray', wash)}
        {showDry && tray('Dry', 'fc-dry-tray', dry)}
      </div>
    );
  }

  /** Title with a strong underline bar. */
  if (variant === 'titleUnderline') {
    const under = (title: string, id: string, children: ReactNode) => (
      <section aria-labelledby={id}>
        <div className="mb-3">
          <p
            className="inline-block border-b-[3px] border-[#404040] pb-1 font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]"
            id={id}
          >
            {title}
          </p>
        </div>
        <div className="flex flex-col gap-3">{children}</div>
      </section>
    );
    return (
      <div className="flex flex-col gap-6">
        {showWash && under('Wash', 'fc-wash-ul', wash)}
        {showDry && under('Dry', 'fc-dry-ul', dry)}
      </div>
    );
  }

  /** Title left, short helper right. */
  if (variant === 'splitMeta') {
    const row = (title: string, hint: string, id: string, children: ReactNode) => (
      <section aria-labelledby={id}>
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <p className="font-['Avenir:Heavy',sans-serif] text-[15px] capitalize text-[#1a1a1a]" id={id}>
            {title}
          </p>
          <span className="shrink-0 text-right font-['Avenir:Roman',sans-serif] text-[10px] text-[#737373]">{hint}</span>
        </div>
        <div className="flex flex-col gap-3">{children}</div>
      </section>
    );
    return (
      <div className="flex flex-col gap-6">
        {showWash && row('Wash', 'Temp · spin · soil', 'fc-wash-split', wash)}
        {showDry && row('Dry', 'Heat · time · dryness', 'fc-dry-split', dry)}
      </div>
    );
  }

  return null;
}
