// === Core Types ===
export type Mode = 'WASH_ONLY' | 'WASH_DRY' | 'DRY_ONLY';
export type Cycle = 
  | 'NORMAL' 
  | 'QUICK' 
  | 'DELICATES' 
  | 'BULKY_ITEMS'
  | 'COLD_WASH'
  | 'SANITIZE_OXI'
  | 'HANDWASH'
  | 'HEAVY_DUTY'
  | 'JEANS'
  | 'RINSE_SPIN'
  | 'CLEAN_WASHER';

export type Dryness = 'EXTRA_DRY' | 'DRY' | 'DAMP_DRY' | 'OFF';
export type WashTemp = 'Hot' | 'Warm' | 'Cool' | 'Tap Cold' | 'Cold';
export type SpinLevel = 'Fast' | 'High' | 'Medium' | 'Low' | 'No Spin';
export type SoilLevel = 'Heavy' | 'Medium-Heavy' | 'Normal' | 'Medium-Light' | 'Light';
export type DryTemp = 'High' | 'Medium' | 'Low' | 'Off';

export interface LaundryState {
  mode: Mode;
  cycle: Cycle;
  dryness: Dryness;
  time: number | null; // minutes
  washTemp: WashTemp;
  spin: SpinLevel;
  soil: SoilLevel;
  dryTemp: DryTemp;
  preWash: boolean;
  preSoak: boolean;
  extraRinse: boolean;
  dampSignal: boolean;
  delayDry: boolean;
  wrinkleShield: boolean;
}

// === Cycle-specific defaults ===
interface CycleDefaults {
  soil: SoilLevel;
  washTemp: WashTemp;
  spin: SpinLevel;
  dryness: Dryness;
  defaultTime: number | null; // Default time duration in minutes for "DRY" dryness
  extraDryTime: number | null; // Time for "EXTRA_DRY" dryness
  dampDryTime: number | null; // Time for "DAMP_DRY" dryness
  wrinkleShield: boolean;
}

const CYCLE_DEFAULTS: Record<Cycle, CycleDefaults> = {
  NORMAL:       { soil: 'Normal', washTemp: 'Warm',  spin: 'High',   dryness: 'DRY', defaultTime: 60, extraDryTime: 75, dampDryTime: 45, wrinkleShield: false },
  QUICK:        { soil: 'Normal', washTemp: 'Cold',  spin: 'Low',    dryness: 'OFF', defaultTime: 45, extraDryTime: null, dampDryTime: null, wrinkleShield: true },
  DELICATES:    { soil: 'Light',  washTemp: 'Cold',  spin: 'Low',    dryness: 'DRY', defaultTime: 45, extraDryTime: 60, dampDryTime: 30, wrinkleShield: true },
  BULKY_ITEMS:  { soil: 'Normal', washTemp: 'Warm',  spin: 'Medium', dryness: 'DRY', defaultTime: 120, extraDryTime: 150, dampDryTime: 90, wrinkleShield: true },
  COLD_WASH:    { soil: 'Normal', washTemp: 'Cold',  spin: 'High',   dryness: 'DRY', defaultTime: 60, extraDryTime: 75, dampDryTime: 45, wrinkleShield: true },
  SANITIZE_OXI: { soil: 'Normal', washTemp: 'Hot',   spin: 'High',   dryness: 'DRY', defaultTime: 60, extraDryTime: 75, dampDryTime: 45, wrinkleShield: true },
  HANDWASH:     { soil: 'Normal', washTemp: 'Cold',  spin: 'Low',    dryness: 'DRY', defaultTime: 45, extraDryTime: 60, dampDryTime: 30, wrinkleShield: false },
  HEAVY_DUTY:   { soil: 'Heavy',  washTemp: 'Warm',  spin: 'High',   dryness: 'DRY', defaultTime: 45, extraDryTime: 60, dampDryTime: 30, wrinkleShield: true },
  JEANS:        { soil: 'Normal', washTemp: 'Warm',  spin: 'High',   dryness: 'DRY', defaultTime: 60, extraDryTime: 75, dampDryTime: 45, wrinkleShield: true },
  RINSE_SPIN:   { soil: 'Normal', washTemp: 'Cold',  spin: 'Fast',   dryness: 'EXTRA_DRY', defaultTime: 45, extraDryTime: 45, dampDryTime: 45, wrinkleShield: true },
  CLEAN_WASHER: { soil: 'Normal', washTemp: 'Hot',   spin: 'No Spin',   dryness: 'DAMP_DRY', defaultTime: null, extraDryTime: null, dampDryTime: null, wrinkleShield: true },
};

export function getDefaultsForCycle(cycle: Cycle, mode?: Mode): CycleDefaults {
  const defaults = CYCLE_DEFAULTS[cycle];
  
  // Special case: Quick cycle has different wrinkle shield default based on mode
  if (cycle === 'QUICK' && mode === 'WASH_ONLY') {
    return { ...defaults, wrinkleShield: false };
  }
  
  return defaults;
}

// === Capability Matrix ===
interface CycleCapabilities {
  supportsWash: boolean;
  supportsDry: boolean;
  supportsDryness: boolean;
  supportsTimedDry: boolean;
  availableInModes: Mode[];
}

const CYCLE_CAPS: Record<Cycle, CycleCapabilities> = {
  NORMAL:       { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  QUICK:        { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  DELICATES:    { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  BULKY_ITEMS:  { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  COLD_WASH:    { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  SANITIZE_OXI: { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  HANDWASH:     { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  HEAVY_DUTY:   { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  JEANS:        { supportsWash: true,  supportsDry: true,  supportsDryness: true,  supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  RINSE_SPIN:   { supportsWash: true,  supportsDry: false, supportsDryness: false, supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
  CLEAN_WASHER: { supportsWash: true,  supportsDry: false, supportsDryness: false, supportsTimedDry: false, availableInModes: ['WASH_ONLY', 'WASH_DRY', 'DRY_ONLY'] },
};

// === Helper functions for combined cycles ===
export function getBaseCycle(cycle: Cycle): BaseCycle {
  if (cycle.endsWith('_TIMED_DRY')) {
    return cycle.replace('_TIMED_DRY', '') as BaseCycle;
  }
  return cycle as BaseCycle;
}

export function getCombinedCycle(baseCycle: BaseCycle): CombinedCycle | null {
  const combined = `${baseCycle}_TIMED_DRY` as CombinedCycle;
  if (combined in CYCLE_CAPS) {
    return combined;
  }
  return null;
}

export function isCombinedCycle(cycle: Cycle): cycle is CombinedCycle {
  return cycle.endsWith('_TIMED_DRY');
}

export function isBaseCycle(cycle: Cycle): cycle is BaseCycle {
  return !cycle.endsWith('_TIMED_DRY');
}

// Only return base cycles for the picker UI
export function cyclesForPicker(mode: Mode): BaseCycle[] {
  return cyclesForMode(mode).filter(isBaseCycle) as BaseCycle[];
}

// === Valid Cycles per Mode ===
export function cyclesForMode(mode: Mode): Cycle[] {
  return (Object.keys(CYCLE_CAPS) as Cycle[]).filter(cycle => 
    CYCLE_CAPS[cycle].availableInModes.includes(mode)
  );
}

export function defaultCycle(mode: Mode): Cycle {
  return 'NORMAL';
}

export function cycleLabel(cycle: Cycle): string {
  const labels: Record<Cycle, string> = {
    NORMAL: 'Normal',
    QUICK: 'Quick',
    DELICATES: 'Delicates',
    BULKY_ITEMS: 'Bulky Items',
    COLD_WASH: 'Cold Wash',
    SANITIZE_OXI: 'Sanitize Oxidize',
    HANDWASH: 'Hand Wash',
    HEAVY_DUTY: 'Heavy Duty',
    JEANS: 'Jeans',
    RINSE_SPIN: 'Rinse & Dry',
    CLEAN_WASHER: 'Clean Washer w/ Affresh',
  };
  return labels[cycle];
}

export function drynessLabel(d: Dryness): string {
  const labels: Record<Dryness, string> = {
    EXTRA_DRY: 'Extra Dry',
    DRY: 'Dry',
    DAMP_DRY: 'Damp Dry',
    OFF: 'Off',
  };
  return labels[d];
}

// === Display Label ===
export function displayCycleLabel(state: LaundryState): string {
  const base = cycleLabel(state.cycle);
  if (state.mode === 'WASH_DRY' && state.time !== null) {
    return `${base} + Timed Dry`;
  }
  return base;
}

// === Visibility helpers ===
export function showWashSection(mode: Mode): boolean {
  return mode === 'WASH_ONLY' || mode === 'WASH_DRY';
}

export function showDrySection(mode: Mode): boolean {
  return mode === 'WASH_DRY' || mode === 'DRY_ONLY';
}

// === State Normalizer (the heart of the logic) ===
export function normalizeState(state: LaundryState): LaundryState {
  const s = { ...state };
  const caps = CYCLE_CAPS[s.cycle];

  // 1. Validate cycle is available for current mode
  if (!caps.availableInModes.includes(s.mode)) {
    // Cycle not available in this mode - change to default cycle for this mode
    s.cycle = defaultCycle(s.mode);
  }

  // Re-fetch capabilities after potential cycle change
  const updatedCaps = CYCLE_CAPS[s.cycle];

  // 2. Mutual exclusivity: time vs dryness
  if (s.time !== null) {
    s.dryness = 'OFF';
  }
  if (s.dryness !== 'OFF' && s.time !== null) {
    s.time = null;
  }

  // 3. If dryness selected but cycle doesn't support it, change cycle
  if (s.dryness !== 'OFF' && !updatedCaps.supportsDryness) {
    // Find a cycle that supports dryness in current mode
    const dryCycle = cyclesForMode(s.mode).find(c => CYCLE_CAPS[c].supportsDryness);
    s.cycle = dryCycle || 'NORMAL';
  }

  // 4. Wash Only → no dry settings
  if (s.mode === 'WASH_ONLY') {
    s.dryness = 'OFF';
    s.time = null;
    s.dampSignal = false;
    s.delayDry = false;
    
    // Special case for Quick cycle: wrinkleShield OFF in WASH_ONLY
    if (s.cycle === 'QUICK') {
      s.wrinkleShield = false;
    }
  }

  // 5. Dry Only → no wash settings  
  if (s.mode === 'DRY_ONLY') {
    s.preWash = false;
    s.preSoak = false;
    s.extraRinse = false;
    
    const updatedCapsForDry = CYCLE_CAPS[s.cycle];
    const availableOptions = getAvailableOptionsForCycle(s.cycle);
    
    // If cycle has no dryness options available, set time to default
    if (availableOptions.dryness.length === 0 && s.time === null) {
      const defaults = CYCLE_DEFAULTS[s.cycle];
      s.time = defaults.defaultTime;
      s.dryness = 'OFF';
    }
    // Otherwise, if dryness is OFF and cycle supports dryness and time is null, restore to cycle default
    else if (s.dryness === 'OFF' && updatedCapsForDry.supportsDryness && s.time === null) {
      const defaults = CYCLE_DEFAULTS[s.cycle];
      s.dryness = defaults.dryness;
    }
  }

  // 6. Wash & Dry mode → if both dryness and time are OFF/null, restore dryness
  if (s.mode === 'WASH_DRY') {
    const updatedCapsForWashDry = CYCLE_CAPS[s.cycle];
    const availableOptions = getAvailableOptionsForCycle(s.cycle);
    
    // If cycle has no dryness options available, set time to default
    if (availableOptions.dryness.length === 0 && s.time === null) {
      const defaults = CYCLE_DEFAULTS[s.cycle];
      s.time = defaults.defaultTime;
      s.dryness = 'OFF';
    } 
    // Otherwise, if both dryness and time are OFF/null and cycle supports dryness, restore dryness
    else if (s.dryness === 'OFF' && s.time === null && updatedCapsForWashDry.supportsDryness) {
      const defaults = CYCLE_DEFAULTS[s.cycle];
      s.dryness = defaults.dryness;
    }
  }

  return s;
}

// === Initial State ===
export function initialState(): LaundryState {
  const normalDefaults = CYCLE_DEFAULTS['NORMAL'];
  return {
    mode: 'WASH_DRY',
    cycle: 'NORMAL',
    dryness: normalDefaults.dryness,
    time: null,
    washTemp: normalDefaults.washTemp,
    spin: normalDefaults.spin,
    soil: normalDefaults.soil,
    dryTemp: 'Medium',
    preWash: false,
    preSoak: false,
    extraRinse: false,
    dampSignal: false,
    delayDry: false,
    wrinkleShield: false,
  };
}

// === Time options ===
export const TIME_OPTIONS = [15, 30, 45, 60, 90];
export const DRYNESS_OPTIONS: Dryness[] = ['EXTRA_DRY', 'DRY', 'DAMP_DRY'];
export const WASH_TEMP_OPTIONS: WashTemp[] = ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'];
export const SPIN_OPTIONS: SpinLevel[] = ['Fast', 'High', 'Medium', 'Low', 'No Spin'];
export const SOIL_OPTIONS: SoilLevel[] = ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'];
export const DRY_TEMP_OPTIONS: DryTemp[] = ['High', 'Medium', 'Low', 'Off'];

// === Cycle-specific Available Options (based on spec matrix) ===
// Black cells in the spec = NOT available
interface AvailableOptions {
  washTemp: WashTemp[];
  spin: SpinLevel[];
  soil: SoilLevel[];
  dryness: Dryness[];
  dryTemp: DryTemp[];
  timedDry: number[];
}

const CYCLE_AVAILABLE_OPTIONS: Record<Cycle, AvailableOptions> = {
  NORMAL: {
    washTemp: ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'],
    spin: ['Fast', 'High', 'Medium'], // No Low, No Spin
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  QUICK: {
    washTemp: ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'], // No temperature options
    spin: ['High', 'Medium', 'Low', 'No Spin'],
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: [], // No dryness options for Quick
    dryTemp: [], // No dry temp options for Quick
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  DELICATES: {
    washTemp: ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'],
    spin: ['Fast', 'High', 'Medium', 'Low', 'No Spin'],
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  BULKY_ITEMS: {
    washTemp: ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'],
    spin: ['High', 'Medium', 'Low', 'No Spin'],
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  COLD_WASH: {
    washTemp: ['Tap Cold', 'Cold'], // Only cold temps available
    spin: ['High', 'Medium', 'Low', 'No Spin'],
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  SANITIZE_OXI: {
    washTemp: ['Hot'], // Only hot available (all others are blacked out)
    spin: ['Fast', 'High', 'Medium', 'Low'], // No Spin excluded
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  HANDWASH: {
    washTemp: ['Warm', 'Cool', 'Tap Cold', 'Cold'], // No hot
    spin: ['Medium', 'Low', 'No Spin'], // No high spin
    soil: ['Normal', 'Medium-Light', 'Light'], // No heavy soil options
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  HEAVY_DUTY: {
    washTemp: ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'],
    spin: ['Fast', 'High', 'Medium', 'Low', 'No Spin'],
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  JEANS: {
    washTemp: ['Hot', 'Warm', 'Cool', 'Tap Cold', 'Cold'],
    spin: ['Fast', 'High', 'Medium', 'Low', 'No Spin'],
    soil: ['Heavy', 'Medium-Heavy', 'Normal', 'Medium-Light', 'Light'],
    dryness: ['EXTRA_DRY', 'DRY', 'DAMP_DRY'],
    dryTemp: ['High', 'Medium', 'Low', 'Off'],
    timedDry: [15, 30, 45, 60, 75, 90, 105, 120],
  },
  RINSE_SPIN: {
    washTemp: [], // No temperature options available
    spin: ['Fast'], // Only Fast spin available
    soil: [], // No soil options available
    dryness: ['EXTRA_DRY'], // Auto dry only
    dryTemp: ['High', 'Medium', 'Low'], // APP controlled
    timedDry: [45], // Only 45 minutes available
  },
  CLEAN_WASHER: {
    washTemp: ['Hot'], // Only Hot temperature
    spin: ['No Spin'], // Only No Spin available
    soil: [], // No soil options available
    dryness: ['DAMP_DRY'], // APP controlled, only Damp Dry
    dryTemp: ['Medium'], // Only Normal/Medium temp
    timedDry: [], // No timed dry options
  },
};

// Get available options for current cycle
export function getAvailableOptionsForCycle(cycle: Cycle): AvailableOptions {
  return CYCLE_AVAILABLE_OPTIONS[cycle] || CYCLE_AVAILABLE_OPTIONS.NORMAL;
}

// Filter picker options based on what's available for current cycle
export function getFilteredWashTempOptions(cycle: Cycle): WashTemp[] {
  return getAvailableOptionsForCycle(cycle).washTemp;
}

export function getFilteredSpinOptions(cycle: Cycle): SpinLevel[] {
  return getAvailableOptionsForCycle(cycle).spin;
}

export function getFilteredSoilOptions(cycle: Cycle): SoilLevel[] {
  return getAvailableOptionsForCycle(cycle).soil;
}

export function getFilteredDrynessOptions(cycle: Cycle): Dryness[] {
  return getAvailableOptionsForCycle(cycle).dryness;
}

export function getFilteredDryTempOptions(cycle: Cycle): DryTemp[] {
  return getAvailableOptionsForCycle(cycle).dryTemp;
}

export function getFilteredTimedDryOptions(cycle: Cycle): number[] {
  return getAvailableOptionsForCycle(cycle).timedDry;
}

// Get the time associated with a dryness level for a given cycle
export function getTimeForDryness(cycle: Cycle, dryness: Dryness): number | null {
  const defaults = CYCLE_DEFAULTS[cycle];
  switch (dryness) {
    case 'DRY':
      return defaults.defaultTime;
    case 'EXTRA_DRY':
      return defaults.extraDryTime;
    case 'DAMP_DRY':
      return defaults.dampDryTime;
    case 'OFF':
      return null;
  }
}