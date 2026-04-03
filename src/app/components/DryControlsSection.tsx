import { Clock, Droplets } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Cycle, Dryness, DryTemp, LaundryState, Mode } from './laundry-state';
import {
  drynessLabel,
  getDefaultsForCycle,
  getFilteredDryTempOptions,
  getFilteredDrynessOptions,
  getFilteredTimedDryOptions,
  getTimeForDryness,
} from './laundry-state';

export type TimeUxVariant =
  | 'baseline'
  | 'baselineNoSensorEstimate'
  | 'segmented'
  | 'timedBanner'
  | 'expandableTiming';

function DrySelectorCard({
  label,
  value,
  onClick,
  disabled,
  sublabel,
}: {
  label: string;
  value: string;
  onClick: () => void;
  disabled?: boolean;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <p className="font-['Avenir:Medium',sans-serif] text-[14px] text-[#404040]">{label}</p>
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`min-h-[48px] w-full flex flex-col items-center justify-center rounded-[8px] bg-[#f5f5f5] px-1 py-1.5 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        <span className="font-['Avenir:Medium',sans-serif] text-[15px] text-[#1a1a1a] text-center leading-tight">
          {value}
        </span>
        {sublabel && (
          <span className="font-['Avenir:Roman',sans-serif] text-[11px] text-[#737373] text-center leading-tight mt-0.5">
            {sublabel}
          </span>
        )}
      </button>
    </div>
  );
}

type DryControlsProps = {
  variant: TimeUxVariant;
  mode: Mode;
  state: LaundryState;
  cycle: Cycle;
  update: (partial: Partial<LaundryState>) => void;
  openPicker: (
    title: string,
    options: { value: string; label: string }[],
    current: string,
    onSelect: (v: string) => void,
  ) => void;
  openWheelPicker: (
    title: string,
    options: number[],
    current: number | null,
    onSelect: (v: number) => void,
  ) => void;
  selectDryness: (dryness: Dryness) => void;
  selectTime: (time: number) => void;
};

export function DryControlsSection({
  variant,
  mode,
  state,
  cycle,
  update,
  openPicker,
  openWheelPicker,
  selectDryness,
  selectTime,
}: DryControlsProps) {
  const dryTempOptions = getFilteredDryTempOptions(cycle);
  const drynessOptions = getFilteredDrynessOptions(cycle);
  const timedDryOptions = getFilteredTimedDryOptions(cycle);
  const estFromSensor = getTimeForDryness(cycle, state.dryness);
  const timedActive = state.time !== null;

  const pickTimeWheel = (title: string) => {
    const currentTime = state.time !== null ? state.time : getTimeForDryness(cycle, state.dryness);
    openWheelPicker(title, timedDryOptions, currentTime, selectTime);
  };

  const goSensorDry = () => {
    const defaults = getDefaultsForCycle(cycle, mode);
    update({ time: null, dryness: defaults.dryness });
  };

  const openTimedDryWheel = () => {
    const current =
      state.time ?? getTimeForDryness(cycle, state.dryness) ?? timedDryOptions[0] ?? 45;
    openWheelPicker('Timed Dry', timedDryOptions, current, selectTime);
  };

  const [timedRowVisible, setTimedRowVisible] = useState(timedActive);
  useEffect(() => {
    if (timedActive) setTimedRowVisible(true);
  }, [timedActive]);

  /** Segmented: which side of the row is shown (sensor = dryness, timed = time), independent until time is set */
  const [segmentedMode, setSegmentedMode] = useState<'sensor' | 'timed'>(() =>
    state.time !== null ? 'timed' : 'sensor',
  );
  useEffect(() => {
    if (state.time !== null) setSegmentedMode('timed');
  }, [state.time]);

  const dryHeading = mode === 'WASH_DRY' && (
    <p className="capitalize font-['Avenir:Heavy',sans-serif] text-[16px] text-[#1a1a1a]">Dry</p>
  );

  const tempCard = (
    <DrySelectorCard
      label="Temperature"
      value={dryTempOptions.length > 0 ? state.dryTemp : ''}
      disabled={dryTempOptions.length === 0}
      onClick={() =>
        dryTempOptions.length > 0 &&
        openPicker(
          'Dry Temperature',
          dryTempOptions.map(v => ({ value: v, label: v })),
          state.dryTemp,
          v => update({ dryTemp: v as DryTemp }),
        )
      }
    />
  );

  const drynessCard = (opts?: { disabled?: boolean; sublabel?: string }) => (
    <DrySelectorCard
      label="Dryness"
      value={drynessOptions.length === 0 ? '' : state.dryness === 'OFF' ? '-' : drynessLabel(state.dryness)}
      disabled={drynessOptions.length === 0 || opts?.disabled}
      sublabel={opts?.sublabel}
      onClick={() =>
        !(drynessOptions.length === 0 || opts?.disabled) &&
        openPicker(
          'Dryness',
          drynessOptions.map(v => ({ value: v, label: drynessLabel(v) })),
          state.dryness,
          v => selectDryness(v as Dryness),
        )
      }
    />
  );

  const timeCard = (opts?: { sublabel?: string; wheelTitle?: string }) => (
    <DrySelectorCard
      label="Time"
      value={
        state.time !== null
          ? `${state.time} min`
          : estFromSensor !== null
            ? `${estFromSensor} min`
            : '-'
      }
      sublabel={
        opts?.sublabel ??
        (state.time !== null ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined)
      }
      onClick={() => pickTimeWheel(opts?.wheelTitle ?? 'Timed Dry')}
    />
  );

  if (variant === 'baseline') {
    return (
      <>
        {dryHeading}
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard()}
          {timeCard({ wheelTitle: 'Time' })}
        </div>
      </>
    );
  }

  /** Baseline layout but UI cannot show sensor-derived minutes (no estimate, no Est. label). */
  if (variant === 'baselineNoSensorEstimate') {
    const wheelDefault = state.time ?? timedDryOptions[0] ?? 45;
    return (
      <>
        {dryHeading}
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard()}
          <DrySelectorCard
            label="Time"
            value={state.time !== null ? `${state.time} min` : '-'}
            sublabel={state.time !== null ? 'Timed dry' : undefined}
            onClick={() => openWheelPicker('Time', timedDryOptions, wheelDefault, selectTime)}
          />
        </div>
      </>
    );
  }

  if (variant === 'segmented') {
    const sensorSelected = segmentedMode === 'sensor';
    return (
      <>
        {dryHeading}
        <div className="rounded-[8px] bg-[#f2f2f2] p-1 flex gap-1">
          <button
            type="button"
            onClick={() => {
              goSensorDry();
              setSegmentedMode('sensor');
            }}
            className={`flex-1 rounded-[6px] py-2.5 text-[13px] font-['Avenir:Heavy',sans-serif] transition-colors ${
              sensorSelected ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#737373]'
            }`}
          >
            Sensor Dry
          </button>
          <button
            type="button"
            onClick={() => {
              setSegmentedMode('timed');
              openTimedDryWheel();
            }}
            className={`flex-1 rounded-[6px] py-2.5 text-[13px] font-['Avenir:Heavy',sans-serif] transition-colors ${
              !sensorSelected ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#737373]'
            }`}
          >
            Timed Dry
          </button>
        </div>
        <div className="flex gap-[10px]">
          {tempCard}
          {sensorSelected && drynessCard()}
          {!sensorSelected && (
            <DrySelectorCard
              label="Time"
              value={state.time !== null ? `${state.time} min` : '-'}
              onClick={() => pickTimeWheel('Timed Dry')}
            />
          )}
        </div>
      </>
    );
  }

  if (variant === 'timedBanner') {
    return (
      <>
        {dryHeading}
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard()}
          {timeCard()}
        </div>
        {timedActive && (
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a]">Timed dry is on</p>
            <p className="font-['Avenir:Roman',sans-serif] text-[12px] text-[#525252] leading-snug mt-0.5">
              Sensor dry is not running for this load. The dryer uses your minute value. You can still change dryness or time in the row above.
            </p>
          </div>
        )}
      </>
    );
  }

  /* expandableTiming: switch above tiles; dryness OR time, never both */
  const timePath = timedRowVisible || timedActive;

  const switchToTimed = () => {
    setTimedRowVisible(true);
    openTimedDryWheel();
  };
  const switchToSensor = () => {
    if (timedActive) goSensorDry();
    setTimedRowVisible(false);
  };

  return (
    <>
      {dryHeading}
      <div className="w-full">
        {!timePath ? (
          <button
            type="button"
            onClick={switchToTimed}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#f5f5f5] px-3 py-2 font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a] active:bg-[#ebebeb]"
          >
            <Clock className="size-[18px] shrink-0 text-[#404040]" strokeWidth={2} aria-hidden />
            Switch to Timed Dry
          </button>
        ) : (
          <button
            type="button"
            onClick={switchToSensor}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#f5f5f5] px-3 py-2 font-['Avenir:Heavy',sans-serif] text-[15px] text-[#1a1a1a] active:bg-[#ebebeb]"
          >
            <Droplets className="size-[18px] shrink-0 text-[#404040]" strokeWidth={2} aria-hidden />
            Switch to Sensor Dry
          </button>
        )}
      </div>
      <div className="flex gap-[10px]">
        {tempCard}
        {!timePath && drynessCard()}
        {timePath && (
          <DrySelectorCard
            label="Time"
            value={state.time !== null ? `${state.time} min` : '-'}
            onClick={() => pickTimeWheel('Timed Dry')}
          />
        )}
      </div>
    </>
  );
}
