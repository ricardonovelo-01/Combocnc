/** Which high-level prototype fills the main preview. */
export type PrototypeScene = 'laundry' | 'cancelFeedback';

export type CancelCycleFeedbackVariant =
  | 'countdownInModal'
  | 'progressBarModal'
  | 'spinnerModal'
  | 'rotatingMessagesModal'
  | 'rangeReassuranceModal';

export const CANCEL_CYCLE_FEEDBACK_ORDER: CancelCycleFeedbackVariant[] = [
  'countdownInModal',
  'progressBarModal',
  'spinnerModal',
  'rotatingMessagesModal',
  'rangeReassuranceModal',
];

export const CANCEL_CYCLE_FEEDBACK_META: Record<
  CancelCycleFeedbackVariant,
  { title: string; blurb: string }
> = {
  countdownInModal: {
    title: '1 · Modal + elapsed time',
    blurb: 'Same dialog shell; shows time counting up so the machine feels active—no fake “seconds left.”',
  },
  progressBarModal: {
    title: '2 · Modal + indeterminate bar',
    blurb: 'Activity bar that loops; copy says duration varies (not a percent complete).',
  },
  spinnerModal: {
    title: '3 · Modal + spinner',
    blurb: 'Minimal: spinner and plain language that we cannot predict exactly how long.',
  },
  rotatingMessagesModal: {
    title: '4 · Modal + rotating status',
    blurb: 'Status line cycles for reassurance—illustrative, not a promise of real phases.',
  },
  rangeReassuranceModal: {
    title: '5 · Modal + activity ticks',
    blurb: 'Qualitative copy plus a small activity indicator (not a progress bar).',
  },
};
