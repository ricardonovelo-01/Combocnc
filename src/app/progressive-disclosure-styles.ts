/**
 * Visual treatments for the “See more controls” `<details>` block (progressive disclosure layout).
 */
export type ProgressiveDisclosureStyle =
  | 'borderedCard'
  | 'minimalRow'
  | 'pillSoft'
  | 'insetWell'
  | 'accentBar';

export const PROGRESSIVE_DISCLOSURE_META: Record<
  ProgressiveDisclosureStyle,
  { title: string; hint: string }
> = {
  borderedCard: {
    title: '1 Bordered card',
    hint: 'Outline, rounded corners; inner panel when open.',
  },
  minimalRow: {
    title: '2 Minimal row',
    hint: 'Light divider; no heavy frame.',
  },
  pillSoft: {
    title: '3 Soft pill',
    hint: 'Full pill when closed; opens into a stacked card.',
  },
  insetWell: {
    title: '4 Inset well',
    hint: 'Recessed gray tray; two white surfaces inside.',
  },
  accentBar: {
    title: '5 Accent bar',
    hint: 'Thick left stripe; no border-width fights.',
  },
};

export const PROGRESSIVE_DISCLOSURE_ORDER: ProgressiveDisclosureStyle[] = [
  'borderedCard',
  'minimalRow',
  'pillSoft',
  'insetWell',
  'accentBar',
];

export function getProgressiveDisclosureClasses(style: ProgressiveDisclosureStyle): {
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
    case 'pillSoft': {
      // Native <details>: closed = summary only → full pill radius. Open = top cap + bottom sheet.
      return {
        details:
          'group overflow-hidden rounded-[22px] border border-[#d0d0d0] bg-[#ebebeb]',
        summary: `${baseSummary} rounded-[22px] border border-transparent bg-white px-5 py-3.5 transition-[border-radius] group-open:rounded-b-none group-open:rounded-t-[22px] group-open:border-b-0`,
        content: `${baseContentInner} rounded-b-[22px] border border-[#e2e2e2] bg-white px-4 py-4`,
        chevron: 'text-[#525252]',
      };
    }
    case 'insetWell':
      return {
        // Recessed tray: darker flat fill + border (no inset shadow).
        details:
          'group rounded-[18px] border border-[#b0b0b0] bg-[#c8c8c8] p-1.5',
        summary: `${baseSummary} rounded-[13px] border border-[#dedede] bg-white px-4 py-3.5`,
        content: `${baseContentInner} mt-1.5 rounded-[13px] border border-[#d4d4d4] bg-[#fafafa] px-3 py-4`,
        chevron: 'text-[#404040]',
      };
    case 'accentBar':
      return {
        // Avoid mixing `border` with `border-l-[npx]` (unreliable). Use explicit sides + thick left.
        details:
          'group overflow-hidden rounded-[12px] border-y border-r border-[#d4d4d4] border-l-[6px] border-l-[#1a1a1a] bg-white',
        summary: `${baseSummary} px-4 py-3.5`,
        content: `${baseContentInner} border-t border-[#e5e5e5] bg-[#f7f7f7] px-4 py-4`,
        chevron: 'text-[#1a1a1a]',
      };
  }
}
