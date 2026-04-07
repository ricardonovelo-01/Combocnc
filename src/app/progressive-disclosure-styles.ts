/**
 * Visual treatments for “See more controls” (progressive disclosure layout).
 *
 * Styles **1–2** use native `<details>` (see `getDetailsDisclosureClasses`).
 * Styles **3–5** are implemented in `ProgressiveDisclosureMoreControls.tsx` with
 * **controlled** open state so structure can differ (pill morph, trays, accent rail).
 */
export type ProgressiveDisclosureStyle =
  | 'borderedCard'
  | 'minimalRow'
  | 'pillSoft'
  | 'insetWell'
  | 'accentBar';

export type DetailsOnlyProgressiveStyle = 'borderedCard' | 'minimalRow';

export const PROGRESSIVE_DISCLOSURE_META: Record<
  ProgressiveDisclosureStyle,
  { title: string; hint: string }
> = {
  borderedCard: {
    title: '1 Bordered card',
    hint: 'Native <details>: outline, inner panel when open.',
  },
  minimalRow: {
    title: '2 Minimal row',
    hint: 'Native <details>: light divider, no heavy frame.',
  },
  pillSoft: {
    title: '3 Morphing pill',
    hint: 'Closed = capsule; open = card. JS-driven radius (not <details>).',
  },
  insetWell: {
    title: '4 Stacked tray',
    hint: 'Gray frame; white header tile + nested content tile.',
  },
  accentBar: {
    title: '5 Spine + panel',
    hint: 'Fixed left rail runs full height with expanded content.',
  },
};

export const PROGRESSIVE_DISCLOSURE_ORDER: ProgressiveDisclosureStyle[] = [
  'borderedCard',
  'minimalRow',
  'pillSoft',
  'insetWell',
  'accentBar',
];

export function getDetailsDisclosureClasses(style: DetailsOnlyProgressiveStyle): {
  details: string;
  summary: string;
  content: string;
  chevron: string;
} {
  const baseSummary =
    'flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden font-[\'Avenir:Heavy\',sans-serif] text-[15px] text-[#0a0a0a]';
  const baseContentInner = 'flex flex-col gap-4';

  switch (style) {
    case 'borderedCard':
      return {
        details:
          'group overflow-hidden rounded-[12px] border border-[#d4d4d4] bg-white open:bg-[#fafafa]',
        summary: `${baseSummary} px-4 py-3.5`,
        content: `${baseContentInner} border-t border-[#e5e5e5] bg-[#f7f7f7] px-4 py-4`,
        chevron: 'text-[#404040]',
      };
    case 'minimalRow':
      return {
        details: 'group border-b border-[#e5e5e5] bg-white',
        summary: `${baseSummary} px-1 py-3.5`,
        content: `${baseContentInner} border-t border-dashed border-[#ebebeb] bg-white px-1 pt-4 pb-1`,
        chevron: 'text-[#737373]',
      };
  }
}
