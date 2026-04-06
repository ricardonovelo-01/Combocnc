/**
 * Layout shells: how the same laundry state + controls are organized on one screen.
 * Grounded in prototype 1 (segmented time UX) as the dry interaction baseline.
 *
 * UX notes (for review with PM):
 * - full — Baseline density; every control visible. Highest clarity, highest load.
 * - minimalSeeMore — Boss direction: keep path-to-start short; tuck secondary wash/toggles
 *   behind one disclosure. Trade-off: two taps for wash options.
 * - sectionedWashDryExtras — Chunking by mental model (wash vs dry vs extras) without
 *   leaving the page; lighter than a wizard.
 * - heroCycleStrip — Emphasize cycle choice; good when “pick cycle first” is the story.
 * - dryFirst — Surfaces dry timing early for combo users who think “how dry?” before wash.
 * - sheetMoreInline — “More settings” expands in-place (not a new nav stack); feels lighter
 *   than full wizard, heavier than see-more if the panel is tall.
 * - compactDensity — Same structure as full, tighter spacing; tests legibility vs. calm.
 */
export type LayoutVariant =
  | 'full'
  | 'minimalSeeMore'
  | 'sectionedWashDryExtras'
  | 'heroCycleStrip'
  | 'dryFirst'
  | 'sheetMoreInline'
  | 'compactDensity';

export const LAYOUT_VARIANT_ORDER: LayoutVariant[] = [
  'full',
  'minimalSeeMore',
  'sectionedWashDryExtras',
  'heroCycleStrip',
  'dryFirst',
  'sheetMoreInline',
  'compactDensity',
];

export const LAYOUT_META: Record<LayoutVariant, { title: string; blurb: string }> = {
  full: {
    title: 'Full surface',
    blurb: 'All controls visible in one scroll. Best for power users; highest cognitive load.',
  },
  minimalSeeMore: {
    title: 'Minimal + see more',
    blurb: 'Mode, cycle, dry row first; wash + toggles behind one “See more controls” expand.',
  },
  sectionedWashDryExtras: {
    title: 'Wash / Dry / Extras',
    blurb: 'Three collapsible sections by job type—still one screen, no route change.',
  },
  heroCycleStrip: {
    title: 'Hero cycle',
    blurb: 'Cycle emphasized; dry row next; everything else under “All options”.',
  },
  dryFirst: {
    title: 'Dry first',
    blurb: 'Reorder: mode → dry (segmented) → cycle → wash. For combo-first mental models.',
  },
  sheetMoreInline: {
    title: 'More settings (inline)',
    blurb: 'Core strip + inline expand for wash and toggles—not a new page.',
  },
  compactDensity: {
    title: 'Compact density',
    blurb: 'Same order as full, tighter gaps/type—tests minimalism without hiding controls.',
  },
};
