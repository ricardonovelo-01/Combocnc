import type { TimeUxVariant } from './components/DryControlsSection';

/** Visual system for separating wash vs dry when layout is Full control. */
export type FullControlWashDryVariant = 'simpleContainer' | 'iconHeaders' | 'dividerLabels';

export const FULL_CONTROL_WASH_DRY_ORDER: FullControlWashDryVariant[] = [
  'simpleContainer',
  'iconHeaders',
  'dividerLabels',
];

export const FULL_CONTROL_WASH_DRY_META: Record<
  FullControlWashDryVariant,
  { title: string; hint: string }
> = {
  simpleContainer: {
    title: 'Simple containers',
    hint: 'Matching bordered boxes, title + short line, then controls.',
  },
  iconHeaders: {
    title: 'Icon headers',
    hint: 'Monochrome icons in matching tiles; header band + body spacing aligned.',
  },
  dividerLabels: {
    title: 'Labeled rules',
    hint: 'Rules with centered labels; comfortable padding inside each group.',
  },
};

/** How the main control stack is organized (prototype 1 / segmented dry UX is the base). */
export type LayoutVariant = 'fullControl' | 'moreControls' | 'sectionCards';

export const LAYOUT_META: Record<LayoutVariant, { title: string; panelHint: string }> = {
  fullControl: {
    title: 'Full control',
    panelHint: 'All controls in one scroll; three ways to frame wash vs dry.',
  },
  moreControls: {
    title: 'Progressive disclosure',
    panelHint: 'Mode & cycle first; rest under See more.',
  },
  sectionCards: {
    title: 'Grouped sections',
    panelHint: 'Wash / Dry / Finishing cards.',
  },
};

/** Shown in the main Layout row; secondary layouts sit under “More”. */
export const MORE_LAYOUT_VARIANTS: LayoutVariant[] = ['moreControls', 'sectionCards'];

export const PROTOTYPE_META: Record<TimeUxVariant, { title: string; blurb: string }> = {
  segmented: {
    title: '1 Sensor Dry vs Timed Dry',
    blurb: 'Segment toggles Sensor Dry or Timed Dry, then the row shows dryness or time. Time fills in after you pick minutes.',
  },
  baselineNoSensorEstimate: {
    title: '5 Same as 2, without banner',
    blurb: 'Same Time rules as column 2, but no timed-dry banner. No sensor minute guess—only Timed dry minutes or a dash.',
  },
  timedBanner: {
    title: '2 Timed banner',
    blurb: 'Same Time rules as column 5, plus a banner when Timed dry is on.',
  },
  baseline: {
    title: '4 Same as 2, with sensor estimate',
    blurb: 'Like column 2, but Time can show Est. (sensor) when a minute guess exists; Timed dry label when set.',
  },
  expandableTiming: {
    title: '3 Sensor vs Timed Dry (picker for minutes)',
    blurb: 'Switch between Sensor Dry and Timed Dry; choosing Timed Dry opens the minute picker.',
  },
};

export const PRIMARY_TIME_VARIANTS: TimeUxVariant[] = ['segmented', 'timedBanner'];

export const OTHER_TIME_VARIANTS: TimeUxVariant[] = [
  'expandableTiming',
  'baseline',
  'baselineNoSensorEstimate',
];
