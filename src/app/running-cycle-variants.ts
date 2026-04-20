export type RunningCycleVariant =
  | 'segmentedSimple'
  | 'segmentedDetailed'
  | 'segmentedIcons'
  | 'unifiedBar';

export const RUNNING_CYCLE_ORDER: RunningCycleVariant[] = [
  'segmentedSimple',
  'segmentedDetailed',
  'segmentedIcons',
  'unifiedBar',
];

export const RUNNING_CYCLE_META: Record<
  RunningCycleVariant,
  { title: string; blurb: string }
> = {
  segmentedSimple: {
    title: '1 · Segmented, minimal',
    blurb: 'Bar split into Wash / Dry halves. Labels only — no per-phase time.',
  },
  segmentedDetailed: {
    title: '2 · Segmented, per-phase time',
    blurb: 'Adds “45m left” on the active phase and “Dry next” on the upcoming one.',
  },
  segmentedIcons: {
    title: '3 · Segmented, labeled icons',
    blurb: 'Wash/Dry labels with droplet + air icons, muted text color.',
  },
  unifiedBar: {
    title: '4 · Unified bar',
    blurb: 'No segmentation — one bar + single “Washing” phase label.',
  },
};

export type RunningCycleMode = 'combo' | 'washerOnly';
