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
  | 'baselinePlain'
  | 'baseline'
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
    openWheelPicker('Timed dry', timedDryOptions, current, selectTime);
  };

  const [timedRowVisible, setTimedRowVisible] = useState(timedActive);
  useEffect(() => {
    if (timedActive) setTimedRowVisible(true);
  }, [timedActive]);

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

  const timeCard = (opts?: { sublabel?: string; wheelTitle?: string; omitSublabel?: boolean }) => (
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
        opts?.omitSublabel
          ? undefined
          : (opts?.sublabel ??
            (state.time !== null ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined))
      }
      onClick={() => pickTimeWheel(opts?.wheelTitle ?? 'Timed dry')}
    />
  );

  if (variant === 'baselinePlain') {
    return (
      <>
        {dryHeading}
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard()}
          {timeCard({ wheelTitle: 'Time', omitSublabel: true })}
        </div>
      </>
    );
  }

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

  if (variant === 'segmented') {
    return (
      <>
        {dryHeading}
        <div className="rounded-[8px] bg-[#f2f2f2] p-1 flex gap-1">
          <button
            type="button"
            onClick={goSensorDry}
            className={`flex-1 rounded-[6px] py-2.5 text-[13px] font-['Avenir:Heavy',sans-serif] transition-colors ${
              !timedActive ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#737373]'
            }`}
          >
            Sensor dry
          </button>
          <button
            type="button"
            onClick={openTimedDryWheel}
            className={`flex-1 rounded-[6px] py-2.5 text-[13px] font-['Avenir:Heavy',sans-serif] transition-colors ${
              timedActive ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#737373]'
            }`}
          >
            Timed dry
          </button>
        </div>
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard()}
          {timeCard({
            sublabel: timedActive ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined,
          })}
        </div>
        {timedActive ? (
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a]">Timed dry</p>
            <p className="font-['Avenir:Roman',sans-serif] text-[12px] text-[#525252] leading-snug mt-0.5">
              Moisture sensing is off for this load. The dryer runs for the minutes you choose.
            </p>
          </div>
        ) : (
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a]">Sensor dry</p>
            <p className="font-['Avenir:Roman',sans-serif] text-[12px] text-[#525252] leading-snug mt-0.5">
              The dryer uses moisture sensing and your dryness setting to decide when to stop.
            </p>
          </div>
        )}
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

  /* expandableTiming: dryness OR time in the row, never both */
  const timePath = timedRowVisible || timedActive;

  return (
    <>
      {dryHeading}
      <div className="flex gap-[10px]">
        {tempCard}
        {!timePath && drynessCard()}
        {timePath && (
          <DrySelectorCard
            label="Time"
            value={
              state.time !== null
                ? `${state.time} min`
                : estFromSensor !== null
                  ? `${estFromSensor} min`
                  : '-'
            }
            sublabel={state.time !== null ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined}
            onClick={() => pickTimeWheel('Time')}
          />
        )}
      </div>
      {!timePath && (
        <>
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5">
            <p className="font-['Avenir:Roman',sans-serif] text-[12px] text-[#525252] leading-snug">
              Choose dryness for moisture sensing. Add timed dry to set minutes instead (dryness hides while time is shown).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTimedRowVisible(true)}
            className="w-full rounded-[8px] bg-[#f2f2f2] h-[52px] flex items-center justify-center gap-2 font-['Avenir:Heavy',sans-serif] text-[14px] text-[#1a1a1a]"
          >
            <span className="text-[18px] leading-none font-['Avenir:Heavy',sans-serif]">+</span>
            Add timed dry
          </button>
        </>
      )}
      {timePath && (
        <div className="flex flex-col gap-2">
          <div className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a]">Timed dry</p>
            <p className="font-['Avenir:Roman',sans-serif] text-[12px] text-[#525252] leading-snug mt-0.5">
              {timedActive
                ? 'Fixed minutes only. Moisture sensing is off. Use sensor dry below to bring dryness back.'
                : 'Pick a time below. Dryness stays hidden until you return to sensor dry.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (timedActive) goSensorDry();
              setTimedRowVisible(false);
            }}
            className="w-full rounded-[8px] border border-[#e5e5e5] bg-white py-2.5 font-['Avenir:Heavy',sans-serif] text-[13px] text-[#1a1a1a] shadow-sm"
          >
            Return to sensor dry
          </button>
        </div>
      )}
    </>
  );
}
