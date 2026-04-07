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
    hint: 'Rounded track, soft fill, subtle depth.',
  },
  insetWell: {
    title: '4 Inset well',
    hint: 'Recessed tray; white summary + content.',
  },
  accentBar: {
    title: '5 Accent bar',
    hint: 'Bold left stripe; editorial feel.',
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
    case 'pillSoft':
      return {
        details:
          'group overflow-hidden rounded-[20px] border border-[#e8e8e8] bg-[#f4f4f4] shadow-[0_1px_3px_rgba(0,0,0,0.06)] open:bg-[#f7f7f7] open:shadow-[0_4px_14px_rgba(0,0,0,0.08)]',
        summary: `${baseSummary} px-5 py-3.5`,
        content: `${baseContentInner} border-t border-[#e0e0e0] bg-white px-4 py-4`,
        chevron: 'text-[#525252]',
      };
    case 'insetWell':
      return {
        details: 'group overflow-hidden rounded-[14px] bg-[#e5e5e5] p-[5px]',
        summary: `${baseSummary} rounded-[10px] bg-white px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]`,
        content: `${baseContentInner} mt-[5px] rounded-[10px] border border-[#ebebeb] bg-white px-3 py-4 shadow-sm`,
        chevron: 'text-[#404040]',
      };
    case 'accentBar':
      return {
        details:
          'group overflow-hidden rounded-[12px] border border-[#d4d4d4] border-l-[5px] border-l-[#1a1a1a] bg-white pl-3 open:bg-[#fafafa]',
        summary: `${baseSummary} pr-4 py-3.5 pl-1`,
        content: `${baseContentInner} border-t border-[#e5e5e5] bg-[#f7f7f7] px-4 py-4`,
        chevron: 'text-[#1a1a1a]',
      };
  }
}
