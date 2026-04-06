import { ArrowLeft, Heart, Settings, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Droplet, Sun, Shirt } from 'lucide-react';
import { useState, useCallback, useEffect, type ReactNode } from 'react';
import washerImage from '../../imports/ComboCC/158356eed04099aa3d6c70763cd639a6f7aa97e9.png';
import {
  type Mode,
  type Cycle,
  type LaundryState,
  type WashTemp,
  type SpinLevel,
  type SoilLevel,
  type DryTemp,
  type Dryness,
  initialState,
  normalizeState,
  cyclesForMode,
  cycleLabel,
  getDefaultsForCycle,
  getFilteredWashTempOptions,
  getFilteredSpinOptions,
  getFilteredSoilOptions,
  getFilteredTimedDryOptions,
  showWashSection,
  showDrySection,
  drynessLabel,
  getTimeForDryness,
} from './laundry-state';
import { DryControlsSection, type TimeUxVariant } from './DryControlsSection';
import type { LayoutVariant } from '../explorer-meta';
// === Cycle Picker Full Screen ===
function CyclePicker({ mode, currentCycle, onSelect, onClose }: {
  mode: Mode;
  currentCycle: Cycle;
  onSelect: (cycle: Cycle) => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'standard' | 'specialty' | 'custom'>('standard');
  const [isClosing, setIsClosing] = useState(false);

  const standardCycles: Cycle[] = [
    'NORMAL', 'QUICK', 'DELICATES', 'BULKY_ITEMS',
    'COLD_WASH', 'SANITIZE_OXI', 'HANDWASH', 'HEAVY_DUTY', 'JEANS'
  ];
  const utilityCycles: Cycle[] = ['RINSE_SPIN', 'DRAIN_SPIN', 'CLEAN_WASHER'];

  const availableCycles = cyclesForMode(mode);
  const filterAvailable = (cycles: Cycle[]) => cycles.filter(c => availableCycles.includes(c));

  const displayCycles = activeTab === 'standard' ? filterAvailable(standardCycles) : [];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSelect = (cycle: Cycle) => {
    setIsClosing(true);
    setTimeout(() => {
      onSelect(cycle);
      onClose();
    }, 300);
  };

  return (
    <div className={`absolute inset-0 z-40 bg-white ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
      <div className="w-full h-full flex flex-col">
        {/* Status Bar */}
        <div className="h-[44px] px-6 flex items-center justify-between">
          {/* Left: Time */}
          <p className="font-['SF_Pro_Text',sans-serif] text-[15px] font-semibold text-[#1a1a1a]">9:41</p>
          
          {/* Right: Status Icons */}
          <div className="flex items-center gap-[6px]">
            {/* Cellular Signal */}
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect x="0" y="8" width="3" height="4" rx="0.8" fill="#1a1a1a" />
              <rect x="5" y="5" width="3" height="7" rx="0.8" fill="#1a1a1a" />
              <rect x="10" y="2" width="3" height="10" rx="0.8" fill="#1a1a1a" />
              <rect x="15" y="0" width="3" height="12" rx="0.8" fill="#1a1a1a" />
            </svg>
            
            {/* WiFi */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M8.5 11C9.05 11 9.5 10.55 9.5 10C9.5 9.45 9.05 9 8.5 9C7.95 9 7.5 9.45 7.5 10C7.5 10.55 7.95 11 8.5 11Z" fill="#1a1a1a" />
              <path d="M8.5 7C10.16 7 11.65 7.69 12.71 8.79L14.13 7.37C12.68 5.88 10.69 5 8.5 5C6.31 5 4.32 5.88 2.87 7.37L4.29 8.79C5.35 7.69 6.84 7 8.5 7Z" fill="#1a1a1a" />
              <path d="M8.5 1C11.76 1 14.78 2.31 17 4.43L15.58 5.85C13.73 4.04 11.23 3 8.5 3C5.77 3 3.27 4.04 1.42 5.85L0 4.43C2.22 2.31 5.24 1 8.5 1Z" fill="#1a1a1a" />
            </svg>
            
            {/* Battery */}
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#1a1a1a" strokeOpacity="0.35" />
              <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#1a1a1a" />
              <path d="M24 4.5C24 4.22386 24.2239 4 24.5 4H25C25.8284 4 26.5 4.67157 26.5 5.5V7.5C26.5 8.32843 25.8284 9 25 9H24.5C24.2239 9 24 8.77614 24 8.5V4.5Z" fill="#1a1a1a" fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-6 pt-3 pb-4">
          <div className="flex items-center justify-between px-2">
            <button onClick={handleClose} className="size-[44px] flex items-center justify-center">
              <ArrowLeft size={24} />
            </button>
            <p className="font-['Avenir:Heavy',sans-serif] text-[#1a1a1a] text-[14px] tracking-wider absolute left-1/2 -translate-x-1/2">Whirlpool</p>
            <div className="size-[44px]" />
          </div>
          <div className="px-4">
            <p className="font-['Avenir:Heavy',sans-serif] text-[24px] text-[#1a1a1a]">Select Cycle</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-6 h-[40px] rounded-full font-['Avenir:Heavy',sans-serif] text-[14px] transition-colors
                ${activeTab === 'standard' ? 'bg-[#262626] text-white' : 'bg-white text-[#1a1a1a] border border-[#d4d4d4]'}`}>
              Standard
            </button>
            <button
              onClick={() => setActiveTab('specialty')}
              className={`px-6 h-[40px] rounded-full font-['Avenir:Heavy',sans-serif] text-[14px] transition-colors
                ${activeTab === 'specialty' ? 'bg-[#262626] text-white' : 'bg-white text-[#1a1a1a] border border-[#d4d4d4]'}`}>
              Specialty
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-6 h-[40px] rounded-full font-['Avenir:Heavy',sans-serif] text-[14px] transition-colors
                ${activeTab === 'custom' ? 'bg-[#262626] text-white' : 'bg-white text-[#1a1a1a] border border-[#d4d4d4]'}`}>
              Custom
            </button>
          </div>
        </div>

        {/* Cycle List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
          {activeTab === 'standard' && (
            <div key="standard" className="animate-fade-in">
              <div className="bg-white rounded-[12px] border border-[#e5e5e5] overflow-hidden">
                {displayCycles.map((cycle, idx) => (
                  <button
                    key={cycle}
                    onClick={() => handleSelect(cycle)}
                    className={`w-full h-[56px] flex items-center justify-between px-4 ${idx !== 0 ? 'border-t border-[#e5e5e5]' : ''}`}>
                    <span className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#1a1a1a]">
                      {cycleLabel(cycle)}
                    </span>
                    <ChevronRight size={20} className="text-[#8e8e8e]" />
                  </button>
                ))}
              </div>

              {/* Utility Cycles Section */}
              {filterAvailable(utilityCycles).length > 0 && (
                <>
                  <p className="font-['Avenir:Medium',sans-serif] text-[13px] text-[#8e8e8e] mt-6 mb-3 px-1">
                    Utility Cycles
                  </p>
                  <div className="bg-white rounded-[12px] border border-[#e5e5e5] overflow-hidden">
                    {filterAvailable(utilityCycles).map((cycle, idx) => (
                      <button
                        key={cycle}
                        onClick={() => handleSelect(cycle)}
                        className={`w-full h-[56px] flex items-center justify-between px-4 ${idx !== 0 ? 'border-t border-[#e5e5e5]' : ''}`}>
                        <span className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#1a1a1a]">
                          {cycleLabel(cycle)}
                        </span>
                        <ChevronRight size={20} className="text-[#8e8e8e]" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Specialty Tab Content */}
          {activeTab === 'specialty' && (
            <div key="specialty" className="animate-fade-in flex items-center justify-center py-12">
              <p className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#8e8e8e]">No specialty cycles</p>
            </div>
          )}

          {/* Custom Tab Content */}
          {activeTab === 'custom' && (
            <div key="custom" className="animate-fade-in flex items-center justify-center py-12">
              <p className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#8e8e8e]">No custom cycles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// === Picker Modal ===
function PickerModal({ title, options, value, onSelect, onClose }: {
  title: string; options: { value: string; label: string }[]; value: string;
  onSelect: (v: string) => void; onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const handleSelect = (v: string) => {
    onSelect(v);
    handleClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center" onClick={handleClose}>
      <div className={`absolute inset-0 bg-black/30 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} />
      <div className={`relative bg-white w-full max-w-[360px] rounded-t-[20px] pb-8 ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <p className="font-['Avenir:Heavy',sans-serif] text-[16px]">{title}</p>
          <button onClick={handleClose} className="p-1"><X size={20} /></button>
        </div>
        <div className="flex flex-col py-2">
          {options.map(o => (
            <button key={o.value}
              className={`px-6 py-3 text-left font-['Avenir:Medium',sans-serif] text-[16px] ${o.value === value ? 'bg-gray-100 font-["Avenir:Heavy",sans-serif]' : ''}`}
              onClick={() => handleSelect(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// === Wheel Picker Modal (iOS Style) ===
function WheelPicker({ title, options, value, onSelect, onClose }: {
  title: string; options: number[]; value: number | null; onSelect: (v: number) => void; onClose: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (value === null) return 0;
    const idx = options.indexOf(value);
    return idx >= 0 ? idx : 0;
  });
  const [wheelRef, setWheelRef] = useState<HTMLDivElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const ITEM_HEIGHT = 44;

  // Scroll to the current value on mount
  useEffect(() => {
    if (wheelRef) {
      const initialIndex = selectedIndex;
      wheelRef.scrollTop = initialIndex * ITEM_HEIGHT;
    }
  }, [wheelRef, selectedIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(options.length - 1, index)));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const handleDone = () => {
    onSelect(options[selectedIndex]);
    handleClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center" onClick={handleClose}>
      <div className={`absolute inset-0 bg-black/30 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} />
      <div className={`relative bg-white w-full max-w-[360px] rounded-t-[20px] pb-8 ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <button onClick={handleClose} className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#1a1a1a]">
            Cancel
          </button>
          <p className="font-['Avenir:Heavy',sans-serif] text-[16px]">{title}</p>
          <button onClick={handleDone} className="font-['Avenir:Heavy',sans-serif] text-[16px] text-[#1a1a1a]">
            Done
          </button>
        </div>

        {/* Wheel Container */}
        <div className="relative h-[220px] overflow-hidden mt-2">
          {/* Selection Indicator */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[44px] pointer-events-none z-10">
            <div className="absolute inset-x-4 top-0 h-[1px] bg-[#d4d4d4]" />
            <div className="absolute inset-x-4 bottom-0 h-[1px] bg-[#d4d4d4]" />
            <div className="absolute inset-0 bg-[#f5f5f5]/50" />
          </div>

          {/* Scrollable Wheel */}
          <div 
            ref={setWheelRef}
            className="wheel-container h-full overflow-y-scroll snap-y snap-mandatory"
            onScroll={handleScroll}
            style={{ 
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch'
            }}>
            {/* Top padding */}
            <div style={{ height: `${ITEM_HEIGHT * 2}px` }} />
            
            {/* Options */}
            {options.map((option, idx) => {
              const distance = Math.abs(idx - selectedIndex);
              const opacity = Math.max(0.3, 1 - distance * 0.25);
              const scale = Math.max(0.85, 1 - distance * 0.08);
              
              return (
                <div
                  key={option}
                  className="flex items-center justify-center snap-center transition-all duration-150"
                  style={{ 
                    height: `${ITEM_HEIGHT}px`,
                    opacity,
                    transform: `scale(${scale})`,
                  }}>
                  <span className="font-['Avenir:Medium',sans-serif] text-[20px] text-[#1a1a1a]">
                    {option}
                  </span>
                  <span className="font-['Avenir:Medium',sans-serif] text-[20px] text-[#8e8e8e] ml-2">
                    min
                  </span>
                </div>
              );
            })}
            
            {/* Bottom padding */}
            <div style={{ height: `${ITEM_HEIGHT * 2}px` }} />
          </div>

          {/* Fade overlays */}
          <div className="absolute top-0 inset-x-0 h-[88px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[88px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// === Toggle ===
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`relative w-[41px] h-[24px] rounded-full p-[2px] transition-colors ${on ? 'bg-[#262626]' : 'bg-[#d4d4d4]'}`}>
      <div className={`bg-white rounded-full size-[20px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] transition-transform ${on ? 'translate-x-[17px]' : 'translate-x-0'}`} />
    </button>
  );
}

// === Toggle Row ===
function ToggleRow({ label, on, onChange, info }: { label: string; on: boolean; onChange: (v: boolean) => void; info?: boolean }) {
  return (
    <div className="bg-white h-[70px] min-h-[70px] relative rounded-[8px] w-full border border-[#d4d4d4]">
      <div className="flex items-center h-full px-4">
        <div className="flex-1 flex items-center gap-1">
          <p className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#1a1a1a]">{label}</p>
          {info && <Info size={16} className="text-[#404040]" />}
        </div>
        <Toggle on={on} onChange={onChange} />
      </div>
    </div>
  );
}

// === Selector Card ===
function SelectorCard({ label, value, onClick, disabled }: { label: string; value: string; onClick: () => void; disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <p className="font-['Avenir:Medium',sans-serif] text-[14px] text-[#404040]">{label}</p>
      <button onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`flex h-[48px] w-full items-center justify-center rounded-[8px] border border-[#d4d4d4] bg-white shadow-sm ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
        <span className="font-['Avenir:Medium',sans-serif] text-[15px] text-[#0a0a0a]">{value}</span>
      </button>
    </div>
  );
}

// === Mode Card ===
function ModeCard({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon: ReactNode }) {
  return (
    <button onClick={onClick}
      className={`flex-1 h-[88px] flex flex-col items-center justify-center gap-2 rounded-[8px] transition-all
        ${active ? 'bg-white' : 'bg-[#f5f5f5]'}`}>
      <div className={`size-[32px] flex items-center justify-center ${active ? 'text-[#1a1a1a]' : 'text-[#737373]'}`}>
        {icon}
      </div>
      <p className={`font-['Avenir:Medium',sans-serif] text-[13px] text-center leading-tight ${active ? 'text-[#1a1a1a]' : 'text-[#737373]'}`}>
        {label}
      </p>
    </button>
  );
}

function LayoutSectionCard({
  title,
  summary,
  open,
  onToggle,
  children,
}: {
  title: string;
  summary: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
      <div className="overflow-hidden rounded-[12px] border border-[#d4d4d4] bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#fafafa]"
      >
        <div className="min-w-0 flex-1">
          <p className="font-['Avenir:Heavy',sans-serif] text-[14px] text-[#1a1a1a]">{title}</p>
          <p className="mt-0.5 truncate font-['Avenir:Roman',sans-serif] text-[11px] text-[#737373]">{summary}</p>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#525252] transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="flex flex-col gap-4 border-t border-[#f0f0f0] bg-[#fafafa] px-4 py-4">{children}</div>
      )}
    </div>
  );
}

export function LaundryControlApp({
  timeVariant,
  layoutVariant,
}: {
  timeVariant: TimeUxVariant;
  layoutVariant: LayoutVariant;
}) {
  const [state, setState] = useState<LaundryState>(initialState());
  const [picker, setPicker] = useState<{ title: string; options: { value: string; label: string }[]; current: string; onSelect: (v: string) => void } | null>(null);
  const [wheelPicker, setWheelPicker] = useState<{ title: string; options: number[]; current: number | null; onSelect: (v: number) => void } | null>(null);
  const [showCyclePicker, setShowCyclePicker] = useState(false);
  const [openSection, setOpenSection] = useState<'wash' | 'dry' | 'finish' | null>('dry');

  const update = useCallback((partial: Partial<LaundryState>) => {
    setState(prev => normalizeState({ ...prev, ...partial }));
  }, []);

  // Cycle selection needs special handling for mode auto-correction
  const selectCycle = (cycle: Cycle) => {
    const defaults = getDefaultsForCycle(cycle, state.mode);
    const newState = { 
      ...state, 
      cycle,
      // Reset ALL settings to cycle defaults
      washTemp: defaults.washTemp,
      spin: defaults.spin,
      soil: defaults.soil,
      dryness: defaults.dryness,
      time: null, // Clear custom time when changing cycle
      dryTemp: 'Medium', // Reset to default dry temp
      // Reset all toggles to defaults
      preWash: false,
      preSoak: false,
      extraRinse: false,
      dampSignal: false,
      delayDry: false,
      wrinkleShield: defaults.wrinkleShield,
    };
    setState(normalizeState(newState));
  };

  // Mode change with state preservation
  const selectMode = (mode: Mode) => {
    if (mode === state.mode) return;
    const newState = { ...state, mode };
    
    // Let normalizeState handle cycle validation automatically
    setState(normalizeState(newState));
  };

  // Dryness selection
  const selectDryness = (dryness: Dryness) => {
    update({ dryness, time: null });
  };

  // Time selection
  const selectTime = (time: number) => {
    update({ time, dryness: 'OFF' });
  };

  const openPicker = (title: string, options: { value: string; label: string }[], current: string, onSelect: (v: string) => void) => {
    setPicker({ title, options, current, onSelect });
  };

  const openWheelPicker = (title: string, options: number[], current: number | null, onSelect: (v: number) => void) => {
    setWheelPicker({ title, options, current, onSelect });
  };

  const showWash = showWashSection(state.mode);
  const showDry = showDrySection(state.mode);

  useEffect(() => {
    if (layoutVariant !== 'sectionCards') return;
    if (showDry) setOpenSection('dry');
    else if (showWash) setOpenSection('wash');
    else setOpenSection('finish');
  }, [state.mode, layoutVariant, showDry, showWash]);

  const washSummaryLine =
    `${state.washTemp} · ${state.spin} · ${state.soil}`;
  const estMin = getTimeForDryness(state.cycle, state.dryness);
  const drySummaryLine =
    state.time !== null
      ? `Timed ${state.time} min`
      : state.dryness !== 'OFF'
        ? drynessLabel(state.dryness)
        : estMin !== null
          ? `Est. ${estMin} min`
          : 'Dry settings';

  const finishSummaryLine = `Wrinkle ${state.wrinkleShield ? 'On' : 'Off'}`;

  const modeSelectorBlock = (
    <div className="flex gap-1 rounded-[8px] bg-[#f2f2f2] p-1">
      <ModeCard
        label="Wash Only"
        active={state.mode === 'WASH_ONLY'}
        onClick={() => selectMode('WASH_ONLY')}
        icon={
          <div className="relative size-[32px]">
            <Shirt size={32} strokeWidth={1.5} />
            <div className="absolute bottom-[-2px] right-[-2px] rounded-full bg-[#f2f2f2] p-[3px]">
              <Droplet size={10} strokeWidth={2} fill="currentColor" />
            </div>
          </div>
        }
      />
      <ModeCard
        label="Wash & Dry"
        active={state.mode === 'WASH_DRY'}
        onClick={() => selectMode('WASH_DRY')}
        icon={
          <div className="relative size-[32px]">
            <Shirt size={32} strokeWidth={1.5} />
            <div className="absolute bottom-[-2px] right-[-2px] flex items-center gap-[1px] rounded-full bg-[#f2f2f2] p-[2px]">
              <Droplet size={8} strokeWidth={2} fill="currentColor" />
              <Sun size={8} strokeWidth={2} />
            </div>
          </div>
        }
      />
      <ModeCard
        label="Dry Only"
        active={state.mode === 'DRY_ONLY'}
        onClick={() => selectMode('DRY_ONLY')}
        icon={
          <div className="relative size-[32px]">
            <Shirt size={32} strokeWidth={1.5} />
            <div className="absolute bottom-[-2px] right-[-2px] rounded-full bg-[#f2f2f2] p-[3px]">
              <Sun size={10} strokeWidth={2} />
            </div>
          </div>
        }
      />
    </div>
  );

  const cycleBlock = (
    <div className="flex flex-col gap-1">
      <p className="font-['Avenir:Medium',sans-serif] text-[14px] capitalize text-[#1a1a1a]">Cycle</p>
      <button
        type="button"
        onClick={() => setShowCyclePicker(true)}
        className="flex h-[56px] w-full items-center justify-center rounded-[8px] border border-[#d4d4d4] bg-white shadow-sm"
      >
        <span className="font-['Avenir:Medium',sans-serif] text-[16px] text-[#0a0a0a]">
          {cycleLabel(state.cycle)}
        </span>
      </button>
    </div>
  );

  const washBlock = showWash && (
    <>
      {state.mode === 'WASH_DRY' && (
        <p className="font-['Avenir:Heavy',sans-serif] text-[16px] capitalize text-[#1a1a1a]">Wash</p>
      )}
      <div className="flex gap-[10px]">
        <SelectorCard
          label="Temperature"
          value={getFilteredWashTempOptions(state.cycle).length > 0 ? state.washTemp : '-'}
          disabled={getFilteredWashTempOptions(state.cycle).length === 0}
          onClick={() =>
            getFilteredWashTempOptions(state.cycle).length > 0 &&
            openPicker(
              'Temperature',
              getFilteredWashTempOptions(state.cycle).map(v => ({ value: v, label: v })),
              state.washTemp,
              v => update({ washTemp: v as WashTemp }),
            )
          }
        />
        <SelectorCard
          label="Spin"
          value={getFilteredSpinOptions(state.cycle).length > 0 ? state.spin : '-'}
          disabled={getFilteredSpinOptions(state.cycle).length === 0}
          onClick={() =>
            getFilteredSpinOptions(state.cycle).length > 0 &&
            openPicker(
              'Spin',
              getFilteredSpinOptions(state.cycle).map(v => ({ value: v, label: v })),
              state.spin,
              v => update({ spin: v as SpinLevel }),
            )
          }
        />
        <SelectorCard
          label="Soil"
          value={getFilteredSoilOptions(state.cycle).length > 0 ? state.soil : '-'}
          disabled={getFilteredSoilOptions(state.cycle).length === 0}
          onClick={() =>
            getFilteredSoilOptions(state.cycle).length > 0 &&
            openPicker(
              'Soil',
              getFilteredSoilOptions(state.cycle).map(v => ({ value: v, label: v })),
              state.soil,
              v => update({ soil: v as SoilLevel }),
            )
          }
        />
      </div>
      <ToggleRow label="Pre Wash" on={state.preWash} onChange={v => update({ preWash: v })} />
      <ToggleRow label="Pre Soak" on={state.preSoak} onChange={v => update({ preSoak: v })} />
      <ToggleRow label="Extra Rinse" on={state.extraRinse} onChange={v => update({ extraRinse: v })} />
    </>
  );

  const washControlsOnly = showWash && (
    <>
      <div className="flex gap-[10px]">
        <SelectorCard
          label="Temperature"
          value={getFilteredWashTempOptions(state.cycle).length > 0 ? state.washTemp : '-'}
          disabled={getFilteredWashTempOptions(state.cycle).length === 0}
          onClick={() =>
            getFilteredWashTempOptions(state.cycle).length > 0 &&
            openPicker(
              'Temperature',
              getFilteredWashTempOptions(state.cycle).map(v => ({ value: v, label: v })),
              state.washTemp,
              v => update({ washTemp: v as WashTemp }),
            )
          }
        />
        <SelectorCard
          label="Spin"
          value={getFilteredSpinOptions(state.cycle).length > 0 ? state.spin : '-'}
          disabled={getFilteredSpinOptions(state.cycle).length === 0}
          onClick={() =>
            getFilteredSpinOptions(state.cycle).length > 0 &&
            openPicker(
              'Spin',
              getFilteredSpinOptions(state.cycle).map(v => ({ value: v, label: v })),
              state.spin,
              v => update({ spin: v as SpinLevel }),
            )
          }
        />
        <SelectorCard
          label="Soil"
          value={getFilteredSoilOptions(state.cycle).length > 0 ? state.soil : '-'}
          disabled={getFilteredSoilOptions(state.cycle).length === 0}
          onClick={() =>
            getFilteredSoilOptions(state.cycle).length > 0 &&
            openPicker(
              'Soil',
              getFilteredSoilOptions(state.cycle).map(v => ({ value: v, label: v })),
              state.soil,
              v => update({ soil: v as SoilLevel }),
            )
          }
        />
      </div>
      <ToggleRow label="Pre Wash" on={state.preWash} onChange={v => update({ preWash: v })} />
      <ToggleRow label="Pre Soak" on={state.preSoak} onChange={v => update({ preSoak: v })} />
      <ToggleRow label="Extra Rinse" on={state.extraRinse} onChange={v => update({ extraRinse: v })} />
    </>
  );

  const dryControlsBlock = showDry && (
    <DryControlsSection
      variant={timeVariant}
      mode={state.mode}
      state={state}
      cycle={state.cycle}
      hideDryHeading={layoutVariant === 'sectionCards'}
      update={update}
      openPicker={openPicker}
      openWheelPicker={openWheelPicker}
      selectDryness={selectDryness}
      selectTime={selectTime}
    />
  );

  const dryExtraToggles = showDry && (
    <>
      <ToggleRow label="Damp Signal" on={state.dampSignal} onChange={v => update({ dampSignal: v })} />
      {state.mode === 'WASH_DRY' && (
        <ToggleRow label="Delay Dry" on={state.delayDry} onChange={v => update({ delayDry: v })} />
      )}
    </>
  );

  const wrinkleBlock = (
    <ToggleRow label="Wrinkle Shield" on={state.wrinkleShield} onChange={v => update({ wrinkleShield: v })} info />
  );

  return (
    <div className="relative h-full min-h-0 w-full min-w-0 bg-white flex flex-col overflow-hidden shadow-2xl rounded-[20px]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-white">
        <div className="h-[44px] px-6 flex items-center justify-between">
          {/* Left: Time */}
          <p className="font-['SF_Pro_Text',sans-serif] text-[15px] font-semibold text-[#1a1a1a]">9:41</p>
          
          {/* Right: Status Icons */}
          <div className="flex items-center gap-[6px]">
            {/* Cellular Signal */}
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect x="0" y="8" width="3" height="4" rx="0.8" fill="#1a1a1a" />
              <rect x="5" y="5" width="3" height="7" rx="0.8" fill="#1a1a1a" />
              <rect x="10" y="2" width="3" height="10" rx="0.8" fill="#1a1a1a" />
              <rect x="15" y="0" width="3" height="12" rx="0.8" fill="#1a1a1a" />
            </svg>
            
            {/* WiFi */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M8.5 11C9.05 11 9.5 10.55 9.5 10C9.5 9.45 9.05 9 8.5 9C7.95 9 7.5 9.45 7.5 10C7.5 10.55 7.95 11 8.5 11Z" fill="#1a1a1a" />
              <path d="M8.5 7C10.16 7 11.65 7.69 12.71 8.79L14.13 7.37C12.68 5.88 10.69 5 8.5 5C6.31 5 4.32 5.88 2.87 7.37L4.29 8.79C5.35 7.69 6.84 7 8.5 7Z" fill="#1a1a1a" />
              <path d="M8.5 1C11.76 1 14.78 2.31 17 4.43L15.58 5.85C13.73 4.04 11.23 3 8.5 3C5.77 3 3.27 4.04 1.42 5.85L0 4.43C2.22 2.31 5.24 1 8.5 1Z" fill="#1a1a1a" />
            </svg>
            
            {/* Battery */}
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#1a1a1a" strokeOpacity="0.35" />
              <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#1a1a1a" />
              <path d="M24 4.5C24 4.22386 24.2239 4 24.5 4H25C25.8284 4 26.5 4.67157 26.5 5.5V7.5C26.5 8.32843 25.8284 9 25 9H24.5C24.2239 9 24 8.77614 24 8.5V4.5Z" fill="#1a1a1a" fillOpacity="0.4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header - doesn't scroll */}
      <div className="absolute top-[44px] left-0 right-0 z-30 bg-white">
        <div className="flex flex-col gap-4 pt-3 pb-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <button className="size-[44px] flex items-center justify-center"><ArrowLeft size={24} /></button>
            </div>
            <p className="font-['Avenir:Heavy',sans-serif] text-[#1a1a1a] text-[14px] tracking-wider absolute left-1/2 -translate-x-1/2">Whirlpool</p>
            <div className="flex items-center gap-1">
              <button className="size-[44px] flex items-center justify-center"><Heart size={20} /></button>
              <button className="size-[44px] flex items-center justify-center"><Settings size={20} /></button>
            </div>
          </div>
          <div className="px-4 flex flex-col gap-2">
            <p className="font-['Avenir:Heavy',sans-serif] text-[20px] text-[#1a1a1a] leading-[1.4]">Combo</p>
            <div className="flex items-center gap-1">
              <span className="bg-[#dff0e8] text-[#0f7e00] text-[12px] font-['Avenir:Roman',sans-serif] px-2 py-0.5 rounded-full flex items-center gap-1">
                Remote Start On
                <span className="size-[6px] bg-[#0f7e00] rounded-full inline-block" />
              </span>
              <Info size={16} className="text-[#1a1a1a]" />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header + status bar */}
      <div className="h-[200px]" />

      {/* Scrollable container - contains image and controls */}
      <div className="flex-1 overflow-y-auto pb-[140px] scrollbar-hide">
        {/* Product Image */}
        <div className="w-full h-[320px] bg-white flex items-start justify-center">
          <img 
            src={washerImage}
            alt="Combo Washer Dryer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* White Controls Section - overlaps image bottom */}
        <div className="bg-white rounded-t-[16px] shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.08)] -mt-[200px] relative z-20">
          <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
            {layoutVariant === 'fullControl' && (
              <>
                {modeSelectorBlock}
                {cycleBlock}
                {washBlock}
                {dryControlsBlock}
                {dryExtraToggles}
                {wrinkleBlock}
              </>
            )}

            {layoutVariant === 'moreControls' && (
              <>
                {modeSelectorBlock}
                {cycleBlock}
                <details className="group overflow-hidden rounded-[12px] border border-[#d4d4d4] bg-white shadow-sm open:bg-[#fafafa]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3.5 font-['Avenir:Heavy',sans-serif] text-[15px] text-[#0a0a0a] [&::-webkit-details-marker]:hidden">
                    <span>See more controls</span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-[#404040] transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <div className="flex flex-col gap-4 border-t border-[#e5e5e5] bg-[#f7f7f7] px-4 py-4">
                    {washBlock}
                    {dryControlsBlock}
                    {dryExtraToggles}
                    {wrinkleBlock}
                  </div>
                </details>
              </>
            )}

            {layoutVariant === 'sectionCards' && (
              <div className="flex flex-col gap-3">
                {modeSelectorBlock}
                {cycleBlock}
                {showWash && (
                  <LayoutSectionCard
                    title="Wash"
                    summary={washSummaryLine}
                    open={openSection === 'wash'}
                    onToggle={() => setOpenSection(openSection === 'wash' ? null : 'wash')}
                  >
                    {washControlsOnly}
                  </LayoutSectionCard>
                )}
                {showDry && (
                  <LayoutSectionCard
                    title="Dry"
                    summary={drySummaryLine}
                    open={openSection === 'dry'}
                    onToggle={() => setOpenSection(openSection === 'dry' ? null : 'dry')}
                  >
                    {dryControlsBlock}
                    {dryExtraToggles}
                  </LayoutSectionCard>
                )}
                <LayoutSectionCard
                  title="Finishing"
                  summary={finishSummaryLine}
                  open={openSection === 'finish'}
                  onToggle={() => setOpenSection(openSection === 'finish' ? null : 'finish')}
                >
                  {wrinkleBlock}
                </LayoutSectionCard>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Picker Modal */}
      {picker && (
        <PickerModal title={picker.title} options={picker.options} value={picker.current}
          onSelect={picker.onSelect} onClose={() => setPicker(null)} />
      )}

      {/* Wheel Picker Modal */}
      {wheelPicker && (
        <WheelPicker title={wheelPicker.title} options={wheelPicker.options} value={wheelPicker.current}
          onSelect={wheelPicker.onSelect} onClose={() => setWheelPicker(null)} />
      )}

      {/* Cycle Picker Modal */}
      {showCyclePicker && (
        <CyclePicker mode={state.mode} currentCycle={state.cycle} onSelect={selectCycle} onClose={() => setShowCyclePicker(false)} />
      )}

      {/* Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="px-4 pb-4 pt-3 bg-gradient-to-t from-white via-white to-transparent">
          <div className="flex flex-col gap-2 items-center">
            <button className="bg-[#1a1a1a] text-white font-['Avenir:Heavy',sans-serif] text-[14px] h-[48px] w-full rounded-full">
              Start
            </button>
            <button className="text-[#1a1a1a] font-['Avenir:Heavy',sans-serif] text-[14px] h-[48px] w-full rounded-full">
              Delay Start
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes slide-in-right {
          from { 
            transform: translateX(100%); 
            opacity: 0.8;
          }
          to { 
            transform: translateX(0); 
            opacity: 1;
          }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

        @keyframes slide-out-right {
          from { 
            transform: translateX(0); 
            opacity: 1;
          }
          to { 
            transform: translateX(100%); 
            opacity: 0.8;
          }
        }
        .animate-slide-out-right { animation: slide-out-right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }

        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out { animation: fade-out 0.25s ease-out; }

        @keyframes slide-down {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        .animate-slide-down { animation: slide-down 0.25s ease-out; }
      `}</style>
    </div>
  );
}