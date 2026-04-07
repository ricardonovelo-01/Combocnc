import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import {
  getDetailsDisclosureClasses,
  type ProgressiveDisclosureStyle,
} from '../progressive-disclosure-styles';

const LABEL = 'See more controls';

type Props = {
  style: ProgressiveDisclosureStyle;
  children: ReactNode;
};

/**
 * Progressive disclosure for “more controls”: styles 1–2 use native `<details>` (reliable,
 * keyboard-friendly). Styles 3–5 use **controlled** disclosure so we can use layouts
 * `<details>` cannot express well (morphing radius, nested trays, flex accent rail).
 */
export function ProgressiveDisclosureMoreControls({ style, children }: Props) {
  if (style === 'borderedCard' || style === 'minimalRow') {
    const c = getDetailsDisclosureClasses(style);
    return (
      <details className={c.details}>
        <summary className={c.summary}>
          <span>{LABEL}</span>
          <ChevronDown
            size={18}
            className={`shrink-0 transition-transform group-open:rotate-180 ${c.chevron}`}
            aria-hidden
          />
        </summary>
        <div className={c.content}>{children}</div>
      </details>
    );
  }

  return <CustomDisclosureShell style={style}>{children}</CustomDisclosureShell>;
}

function CustomDisclosureShell({
  style,
  children,
}: {
  style: Exclude<ProgressiveDisclosureStyle, 'borderedCard' | 'minimalRow'>;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const panelId = `${reactId}-more`;

  const toggle = () => setOpen(o => !o);

  const btnBase =
    'flex w-full cursor-pointer items-center justify-between gap-2 text-left font-[\'Avenir:Heavy\',sans-serif] text-[15px] text-[#0a0a0a]';

  if (style === 'pillSoft') {
    return (
      <div
        className={`overflow-hidden border border-[#d4d4d4] bg-[#f5f5f5] transition-[border-radius] duration-200 ease-out ${
          open ? 'rounded-2xl' : 'rounded-[999px]'
        }`}
      >
        <button
          type="button"
          className={`${btnBase} px-5 py-3.5 ${open ? 'border-b border-[#e0e0e0] bg-white' : 'bg-white'}`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? `Collapse ${LABEL}` : `Expand ${LABEL}`}
          onClick={toggle}
        >
          <span>{LABEL}</span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-[#525252] transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
        {open && (
          <div id={panelId} className="bg-[#f7f7f7] px-4 py-4">
            {children}
          </div>
        )}
      </div>
    );
  }

  if (style === 'insetWell') {
    return (
      <div className="rounded-2xl border border-[#a8a8a8] bg-[#cecece] p-2">
        <button
          type="button"
          className={`${btnBase} rounded-xl border border-[#b8b8b8] bg-white px-4 py-3.5`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? `Collapse ${LABEL}` : `Expand ${LABEL}`}
          onClick={toggle}
        >
          <span>{LABEL}</span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-[#404040] transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
        {open && (
          <div
            id={panelId}
            className="mt-2 flex flex-col gap-4 rounded-xl border border-[#b0b0b0] bg-[#efefef] px-3 py-4"
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  if (style === 'accentBar') {
    return (
      <div className="flex min-h-0 overflow-hidden rounded-xl border border-[#d4d4d4] bg-white">
        <div className="w-1.5 shrink-0 bg-[#1a1a1a]" aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col">
          <button
            type="button"
            className={`${btnBase} px-4 py-3.5 ${open ? 'border-b border-[#e5e5e5]' : ''}`}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? `Collapse ${LABEL}` : `Expand ${LABEL}`}
            onClick={toggle}
          >
            <span>{LABEL}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-[#1a1a1a] transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          {open && (
            <div id={panelId} className="bg-[#f7f7f7] px-4 py-4">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
