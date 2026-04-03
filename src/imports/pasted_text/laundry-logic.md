0. Core Mental Model (Most Important)
Everything in these screens follows one governing rule:
If a selection becomes invalid due to another change, the system automatically updates to the closest valid configuration.
There are four main control types:
Mode
Wash Only
Wash & Dry
Dry Only
Cycle
Example:
Normal
Quick
Timed Dry
etc.
Dry Settings
Dryness (Extra Dry, Dry, Damp Dry, Off)
Time (Timed duration)
Derived Behavior
Cycle may change automatically
Dryness may change automatically
Mode may change automatically
1. Entities and Relationships (Implementation-Level)
Define these core objects:
Mode = {
  WASH_ONLY,
  WASH_DRY,
  DRY_ONLY
}

Cycle = {
  NORMAL,
  QUICK,
  DELICATES,
  TIMED_DRY,
  ...
}

Dryness = {
  EXTRA_DRY,
  DRY,
  DAMP_DRY,
  OFF
}

Time = integer (minutes)
Each Cycle supports only certain:
CycleCapabilities = {
   supportsWash: boolean
   supportsDry: boolean
   supportsDryness: boolean
   supportsTimedDry: boolean
}
Example:
TIMED_DRY = {
   supportsWash: false
   supportsDry: true
   supportsDryness: false
   supportsTimedDry: true
}

NORMAL = {
   supportsWash: true
   supportsDry: true
   supportsDryness: true
   supportsTimedDry: false
}
2. Mode Selection Logic
(Last image — base mode switching)
When user selects Mode:
onModeChange(newMode)
Step 1 — Validate current cycle
If:
currentCycle incompatible with newMode
Then:
replace cycle with defaultCycleFor(newMode)
Example:
Current	User selects	Result
Timed Dry	Wash & Dry	Normal + Timed Dry
Normal	Dry Only	Timed Dry
3. Mode Swap with Invalid Cycle
("Mode Swap with invalid Cycle – Cycle Update")
Flow:
User switches:
Dry Only → Wash & Dry
While:
Cycle = Timed Dry
This is invalid because:
Timed Dry = Dry-only cycle
Wash & Dry requires wash cycle
So system:
currentCycle = NORMAL
currentDryTime = previousTimedDryTime
Final UI:
Cycle = Normal + Timed Dry
Meaning:
Wash cycle added automatically.
Implementation Rule
if modeChange causes invalidCycle:
     cycle = defaultCompatibleCycle
4. Selecting Timed Dry inside Wash Only
("Timed Dry Cycle Selected in Wash Only Mode")
Flow:
User:
Mode = Wash Only
User selects Cycle = Timed Dry
Problem:
Timed Dry requires drying
Wash Only has no drying
So system:
mode = Dry Only
cycle = Timed Dry
Implementation Rule
if cycle requiresDry AND mode == WASH_ONLY:
       mode = DRY_ONLY
This is a mode override.
5. Time Selection inside Wash + Dry
("Time Selection in Wash + Dry Mode")
Flow:
User:
Mode = Wash & Dry
Cycle = Normal
Dryness = Extra Dry
User selects:
Time = 45 min
Problem:
Time and Dryness cannot coexist
So:
cycleDryMode = Timed Dry
dryness = OFF
time = 45 min
UI Result:
Cycle = Normal + Timed Dry
Dryness removed
Time applied
Implementation Rule
if timeSelected:
      dryness = OFF
      enableTimedDry()
6. Dryness Selection with Invalid Cycle
("Dryness selected with invalid Cycle")
Flow:
User:
Mode = Dry Only
Cycle = Timed Dry
Dryness selected = Extra Dry
Problem:
Timed Dry uses Time, not Dryness
So:
cycle = NORMAL
dryness = Extra Dry
time = null
Implementation Rule
if drynessSelected AND cycle does not supportDryness:
        cycle = defaultDrynessSupportedCycle
7. Priority Rules (Very Important)
When conflicts happen:
Resolve in this order:
Mode → Cycle → Dry Settings → Time
Meaning:
Mode is highest authority.
Priority Table
Trigger	Priority
Mode change	Highest
Cycle selection	High
Dryness selection	Medium
Time selection	Medium
8. Mode + Cycle Combination Logic
Valid combinations:
Mode	Allowed Cycles
Wash Only	Wash cycles
Dry Only	Dry cycles
Wash & Dry	Wash cycles + Dry stage
Invalid combinations are auto-fixed.
Never block user.
Always auto-correct.
9. Default Cycle Rules
Each mode needs a fallback:
defaultCycleFor(WASH_ONLY) = NORMAL
defaultCycleFor(WASH_DRY) = NORMAL
defaultCycleFor(DRY_ONLY) = TIMED_DRY
10. Time vs Dryness Mutual Exclusivity
These two are mutually exclusive:
Dryness
Time
Cannot exist simultaneously.
Rule:
if timeSet:
      dryness = OFF

if drynessSet:
      time = null
11. UI Update Requirements
After any auto-change:
Update:
Mode selector highlight
Cycle name label
Dry settings section
Enabled/disabled fields
Example:
updateUI()
refreshCycleLabel()
refreshModeSelection()
refreshDrySettings()
12. Display Rules (What User Sees)
Cycle display formats:
Normal
Normal + Timed Dry
Timed Dry
Use:
if washCycle + time:
     show "Normal + Timed Dry"
13. Edge Cases Engineers Must Handle
These are critical.
Case A — Mode change removes drying
Wash & Dry → Wash Only
Then:
remove Dry settings
remove Time
remove Dryness
Case B — Mode adds drying
Wash Only → Wash & Dry
Then:
restore previousDrySettings OR default
Case C — Re-select same value
Do nothing.
Avoid redundant updates.
14. State Machine Representation (Recommended)
System should behave like:
State = {
   mode
   cycle
   dryness
   time
}
All changes go through:
updateState(action)
validateState()
normalizeState()
render()
15. Suggested Validation Flow (Engineering)
Every change runs:
function normalizeState(state):

    validateMode(state)

    validateCycle(state)

    validateDrySettings(state)

    validateTime(state)

    return correctedState
16. Developer-Friendly Pseudocode
function onUserChange(action):

    state = apply(action)

    if cycle invalid for mode:
        state.cycle = defaultCycle(mode)

    if time exists:
        state.dryness = OFF

    if dryness exists and cycle doesn't support:
        state.cycle = defaultDryCycle()

    render(state)
17. UX Philosophy Behind This (Why It Works)
These flows follow:
✅ Never block user
✅ Auto-correct instead of error
✅ Always land in valid state
No dead ends.
No errors.
No modal warnings.
Just intelligent correction.
18. If I Were Implementing This — I'd Build:
Capability Matrix
State Normalizer
Mode Resolver
Cycle Resolver
Dry Resolver
Not UI-first.
Logic-first.
19. If This Goes to Engineering — What They Need
Minimum deliverables:
Mode → Cycle compatibility table
Cycle → Dry capability table
Default cycle per mode
Time vs Dryness exclusivity rule
State normalization logic
Without these:
Implementation will drift.
20. My UX Assessment (Honest)
This system is:
✅ Logically consistent
✅ Predictable
✅ Implementation-friendly
✅ Scalable
But:
⚠️ Naming clarity of "Normal + Timed Dry" must be consistent across UI and API.
Otherwise confusion will happen.
If Useful — I Can Also Provide:
A full decision tree diagram
A state transition table
A QA test matrix
A JSON capability model
Those are usually the next step before engineering handoff.