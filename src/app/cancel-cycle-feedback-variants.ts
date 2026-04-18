/** Which high-level prototype fills the main preview. */
export type PrototypeScene = 'laundry' | 'cancelFeedback';

export type CancelCycleFeedbackVariant =
  | 'countdownInModal'
  | 'progressBarModal'
  | 'spinnerModal'
  | 'rotatingMessagesModal'
  | 'bottomSheetStatus';

export const CANCEL_CYCLE_FEEDBACK_ORDER: CancelCycleFeedbackVariant[] = [
  'countdownInModal',
  'progressBarModal',
  'spinnerModal',
  'rotatingMessagesModal',
  'bottomSheetStatus',
];

export const CANCEL_CYCLE_FEEDBACK_META: Record<
  CancelCycleFeedbackVariant,
  { title: string; blurb: string }
> = {
  countdownInModal: {
    title: '1 · Modal + live countdown',
    blurb: 'Same dialog updates; primary “Stopping…”, Close disabled. Demo timer is a stand-in for remaining time.',
  },
  progressBarModal: {
    title: '2 · Modal + indeterminate bar',
    blurb: 'Looping activity bar; copy says duration varies (not percent complete).',
  },
  spinnerModal: {
    title: '3 · Modal + spinner',
    blurb: 'Compact spinner with plain language about unpredictable duration.',
  },
  rotatingMessagesModal: {
    title: '4 · Modal + rotating status',
    blurb: 'Status lines cycle for reassurance—illustrative, not guaranteed phases.',
  },
  bottomSheetStatus: {
    title: '5 · Sheet + persistent status',
    blurb: 'After confirm, a bottom sheet carries stopping state, estimate, and a safety line.',
  },
};
