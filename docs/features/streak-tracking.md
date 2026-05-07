# Feature: Streak Tracking

## What it does
Calculates and displays the user's current streak — consecutive 
days where at least one habit was logged. One missed day grace 
period before the streak resets. Displayed on the home screen 
as a badge or counter.

## User stories
- As a user, I want to see my current streak so I feel motivated 
  to keep logging daily
- As a user, I want one missed day grace period so a single 
  off day doesn't reset my progress

## Data requirements
Reads: dailyLogs table ordered by date descending
Derives: streak count from date gaps — not stored in database

## Acceptance criteria
- [ ] Streak displays correctly on home screen
- [ ] Streak increments when a new day has at least one entry
- [ ] One missed day does not reset streak
- [ ] Two consecutive missed days resets streak to 0
- [ ] Streak calculation is correct across month boundaries
- [ ] Today counts toward streak if at least one habit logged

## Edge cases
- No logs yet — streak shows 0
- Only one day logged — streak shows 1
- Grace period on the current day — streak held, not reset yet

## Out of scope for this feature
- Longest streak record
- Streak notifications
- Per-habit streaks