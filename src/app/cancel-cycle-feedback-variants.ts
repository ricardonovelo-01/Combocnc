/** Which high-level prototype fills the main preview. */
export type PrototypeScene = 'laundry' | 'cancelFeedback';

export type CancelCycleFeedbackVariant =
  | 'countdownInModal'
  | 'progressBarModal'
  | 'ringCountdownModal'
  | 'phaseStepsModal'
  | 'bottomSheetStatus';

export const CANCEL_CYCLE_FEEDBACK_ORDER: CancelCycleFeedbackVariant[] = [
  'countdownInModal',
  'progressBarModal',
  'ringCountdownModal',
  'phaseStepsModal',
  'bottomSheetStatus',
];

export const CANCEL_CYCLE_FEEDBACK_META: Record<
  CancelCycleFeedbackVariant,
  { title: string; blurb: string }
> = {
  countdownInModal: {
    title: '1 · Modal + live countdown',
    blurb: 'Same dialog; title and body update, primary shows “Stopping…”, Close disabled.',
  },
  progressBarModal: {
    title: '2 · Modal + determinate bar',
    blurb: 'Linear progress for the ~10s stop; no numeric timer, copy explains the wait.',
  },
  ringCountdownModal: {
    title: '3 · Modal + ring timer',
    blurb: 'Large circular progress with seconds in the center—glanceable remaining time.',
  },
  phaseStepsModal: {
    title: '4 · Modal + phase checklist',
    blurb: 'Three bounded steps advance over the stop so it feels like real machine work.',
  },
  bottomSheetStatus: {
    title: '5 · Sheet + persistent status',
    blurb: 'Confirm dismisses the alert; a bottom sheet carries stopping state and a safety line.',
  },
};
