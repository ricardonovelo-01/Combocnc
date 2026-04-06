import type { TimeUxVariant } from './components/DryControlsSection';

export const TIME_UX_VARIANT_ORDER: TimeUxVariant[] = [
  'segmented',
  'timedBanner',
  'expandableTiming',
  'baseline',
  'baselineNoSensorEstimate',
];

export const TIME_UX_META: Record<TimeUxVariant, { title: string; blurb: string }> = {
  segmented: {
    title: 'Sensor Dry vs Timed Dry',
    blurb: 'Segment toggles Sensor Dry or Timed Dry, then the row shows dryness or time.',
  },
  timedBanner: {
    title: 'Timed banner',
    blurb: 'Same Time rules as the no-banner baseline, plus a banner when Timed dry is on.',
  },
  expandableTiming: {
    title: 'Sensor vs Timed (picker)',
    blurb: 'Switch modes; Timed Dry opens the minute picker.',
  },
  baseline: {
    title: 'Baseline + sensor estimate',
    blurb: 'Three tiles with Est. (sensor) when a guess exists.',
  },
  baselineNoSensorEstimate: {
    title: 'Same as timed banner, no banner',
    blurb: 'No sensor minute guess—timed minutes or dash.',
  },
};
