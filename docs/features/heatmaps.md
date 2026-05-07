# Feature: Activity Heatmap

## What it does
A GitHub-style yearly heatmap displayed as the hero element on 
the home screen. Each day is represented as a square. Colour 
intensity reflects how many habits were completed that day — 
empty days are grey, fully completed days are the darkest shade.

## User stories
- As a user, I want to see my yearly activity at a glance so 
  I feel motivated by visible consistency
- As a user, I want colour intensity to reflect completion volume 
  so I can see my best and worst days visually

## Data requirements
Reads: dailyLogs for the last 365 days
Reads: habitEntries count per day
Derives: completion ratio per day for colour intensity

## Acceptance criteria
- [ ] 365 day grid displayed on home screen
- [ ] Each day coloured by completion intensity
- [ ] Empty days shown as neutral/grey
- [ ] Current day highlighted
- [ ] Hovering or tapping a day shows date and completion count
- [ ] Renders efficiently — no per-day database calls

## Edge cases
- No data yet — all squares grey, not broken
- Partial completion — intermediate colour shown correctly
- Current day with no entries — shown as empty not missing

## Out of scope for this feature
- Clicking a day to navigate to history (can be added later)
- Custom colour themes
- Weekly or monthly view variants