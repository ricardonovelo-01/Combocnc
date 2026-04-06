import type { TimeUxVariant } from './components/DryControlsSection';

/** How the main control stack is organized (prototype 1 / segmented dry UX is the base). */
export type LayoutVariant = 'fullControl' | 'moreControls' | 'sectionCards';

export const LAYOUT_META: Record<
  LayoutVariant,
  { title: string; blurb: string; rationale: string }
> = {
  fullControl: {
    title: 'Full control',
    blurb: 'Single scroll; every control visible—baseline reference.',
    rationale:
      'Keeps parity with today’s app density. Best when users expect to scan everything at once.',
  },
  moreControls: {
    title: 'Progressive disclosure',
    blurb: 'Mode and cycle first; wash, dry, toggles, and finishing inside “See more controls”.',
    rationale:
      'Cycle is the first decision; everything else expands in one place without changing navigation.',
  },
  sectionCards: {
    title: 'Grouped sections',
    blurb: 'Wash, Dry, and Finishing as separate collapsible cards with summary lines.',
    rationale:
      'Chunks the job into familiar phases; only one section expanded at a time to reduce vertical noise.',
  },
};

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
