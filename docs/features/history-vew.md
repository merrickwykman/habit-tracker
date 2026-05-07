# Feature: History View

## What it does
A page showing past days as a clean, scannable list. Each day 
shows the date, which habits were completed, the streak status, 
and whether a note was added. Summary only — no drilling into 
individual values.

## User stories
- As a user, I want to see past days at a glance so I can 
  reflect on my consistency
- As a user, I want to see which habits were completed each day 
  so I can spot patterns without opening charts

## Data requirements
Reads: dailyLogs table ordered by date descending
Reads: habitEntries for each log (completed ones only)
Reads: habits table for names

## Acceptance criteria
- [ ] List of past days in reverse chronological order
- [ ] Each day shows date and completed habit names
- [ ] Days with notes show a note indicator
- [ ] Empty days (no entries) not shown or shown as missed
- [ ] Loads efficiently — no N+1 queries

## Edge cases
- No history yet — show empty state
- Day with no completions — handle gracefully

## Out of scope for this feature
- Editing past entries from history view
- Filtering by habit
- Exporting history