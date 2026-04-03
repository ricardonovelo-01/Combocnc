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
  | 'segmented'
  | 'timedBanner'
  | 'consolidated'
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

  const clearTimedDry = () => {
    update({ time: null });
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
      value={drynessOptions.length === 0 ? '' : state.dryness === 'OFF' ? '—' : drynessLabel(state.dryness)}
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
            : '—'
      }
      sublabel={
        opts?.sublabel ??
        (state.time !== null ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined)
      }
      onClick={() => pickTimeWheel(opts?.wheelTitle ?? 'Timed dry')}
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

  if (variant === 'segmented') {
    return (
      <>
        {dryHeading}
        <div className="mb-1 rounded-full bg-[#ececec] p-1 flex">
          <button
            type="button"
            onClick={goSensorDry}
            className={`flex-1 rounded-full py-2 text-[13px] font-['Avenir:Heavy',sans-serif] transition-colors ${
              !timedActive ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#737373]'
            }`}
          >
            Sensor dry
          </button>
          <button
            type="button"
            onClick={openTimedDryWheel}
            className={`flex-1 rounded-full py-2 text-[13px] font-['Avenir:Heavy',sans-serif] transition-colors ${
              timedActive ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#737373]'
            }`}
          >
            Timed dry
          </button>
        </div>
        <p className="text-[11px] text-[#737373] leading-snug -mt-0.5 mb-1">
          {timedActive
            ? 'Moisture sensing is off — the dryer runs for a fixed time (timed dry).'
            : 'Moisture sensing adjusts the run using dryness level.'}
        </p>
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard({ disabled: timedActive, sublabel: timedActive ? 'Not used' : undefined })}
          {timeCard({
            sublabel: timedActive ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined,
          })}
        </div>
      </>
    );
  }

  if (variant === 'timedBanner') {
    return (
      <>
        {dryHeading}
        {timedActive && (
          <div className="rounded-[10px] border border-amber-200/80 bg-amber-50 px-3 py-2.5">
            <p className="font-['Avenir:Heavy',sans-serif] text-[13px] text-amber-950">Timed dry is on</p>
            <p className="font-['Avenir:Roman',sans-serif] text-[12px] text-amber-900/90 leading-snug mt-0.5">
              You’re no longer using a sensor-based dry. The dryer will run for the minutes you set.
            </p>
          </div>
        )}
        <div className="flex gap-[10px]">
          {tempCard}
          {drynessCard({
            disabled: timedActive,
            sublabel: timedActive ? 'Sensor off' : undefined,
          })}
          {timeCard()}
        </div>
      </>
    );
  }

  if (variant === 'consolidated') {
    return (
      <>
        {dryHeading}
        <div className="flex gap-[10px] items-stretch">
          <div className="flex-1 min-w-0">{tempCard}</div>
          <div className="flex-[2] min-w-0 flex flex-col gap-1.5">
            <p className="font-['Avenir:Medium',sans-serif] text-[14px] text-[#404040]">Dry</p>
            <div className="flex flex-col rounded-[8px] overflow-hidden border border-[#e5e5e5] bg-[#fafafa]">
              <button
                type="button"
                disabled={drynessOptions.length === 0 || timedActive}
                onClick={() =>
                  drynessOptions.length > 0 &&
                  !timedActive &&
                  openPicker(
                    'Dryness',
                    drynessOptions.map(v => ({ value: v, label: drynessLabel(v) })),
                    state.dryness,
                    v => selectDryness(v as Dryness),
                  )
                }
                className={`min-h-[48px] w-full px-3 py-2.5 text-left border-b border-[#e5e5e5] ${
                  timedActive ? 'opacity-50' : ''
                }`}
              >
                <p className="font-['Avenir:Medium',sans-serif] text-[11px] text-[#737373] uppercase tracking-wide">
                  Moisture level
                </p>
                <p className="font-['Avenir:Medium',sans-serif] text-[15px] text-[#1a1a1a]">
                  {drynessOptions.length === 0 ? '—' : timedActive ? '—' : drynessLabel(state.dryness)}
                </p>
              </button>
              <button
                type="button"
                onClick={() => pickTimeWheel('Timed dry')}
                className="min-h-[48px] w-full px-3 py-2.5 text-left"
              >
                <p className="font-['Avenir:Medium',sans-serif] text-[11px] text-[#737373] uppercase tracking-wide">
                  {timedActive ? 'Timed dry' : 'Time'}
                </p>
                <p className="font-['Avenir:Medium',sans-serif] text-[15px] text-[#1a1a1a]">
                  {timedActive
                    ? `${state.time} min · fixed`
                    : estFromSensor !== null
                      ? `~${estFromSensor} min est. (sensor)`
                      : '—'}
                </p>
              </button>
            </div>
            <p className="text-[11px] text-[#737373] leading-snug">
              Picking a custom time switches to timed dry and turns off moisture sensing for this load.
            </p>
          </div>
        </div>
      </>
    );
  }

  /* expandableTiming */
  return (
    <>
      {dryHeading}
      <div className="flex gap-[10px]">
        {tempCard}
        {drynessCard()}
        {(timedRowVisible || timedActive) && (
          <DrySelectorCard
            label="Time"
            value={
              state.time !== null
                ? `${state.time} min`
                : estFromSensor !== null
                  ? `${estFromSensor} min`
                  : '—'
            }
            sublabel={state.time !== null ? 'Timed dry' : estFromSensor !== null ? 'Est. (sensor)' : undefined}
            onClick={() => pickTimeWheel('Time')}
          />
        )}
      </div>
      {!timedRowVisible && !timedActive && (
        <button
          type="button"
          onClick={() => setTimedRowVisible(true)}
          className="w-full rounded-[8px] border border-dashed border-[#c4c4c4] bg-white py-3 font-['Avenir:Medium',sans-serif] text-[14px] text-[#404040]"
        >
          + Use timed dry (fixed minutes)
        </button>
      )}
      {timedRowVisible && !timedActive && (
        <p className="text-[11px] text-[#737373] leading-snug">
          Optional: set an exact dry time. This uses timed dry and turns off moisture sensing.
        </p>
      )}
      {timedActive && (
        <button
          type="button"
          onClick={() => {
            clearTimedDry();
            setTimedRowVisible(false);
          }}
          className="text-[13px] font-['Avenir:Medium',sans-serif] text-[#2563eb] text-center py-1"
        >
          Clear timed dry — use sensor dry
        </button>
      )}
    </>
  );
}
