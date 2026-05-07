# Feature: Habit Management

## What it does
A settings page where the user creates, edits, deletes and reorders 
the habits they want to track. Each habit has a name, a type 
(boolean checkbox or numeric value), an optional unit, and a 
display order. Changes here affect what appears on the daily 
check-in screen.

## User stories
- As a user, I want to create a new habit so I can start tracking it
- As a user, I want to set a habit as boolean or numeric so it 
  captures the right kind of data
- As a user, I want to reorder habits so the most important ones 
  appear first
- As a user, I want to delete a habit I no longer track

## Data requirements
Creates: habit row
Reads: all habits ordered by order field
Updates: habit name, type, unit, order
Deletes: habit row (and associated habitEntries)

## Acceptance criteria
- [ ] User can create a habit with name, type and optional unit
- [ ] Boolean and numeric types both available
- [ ] Habits display in order field sequence
- [ ] User can edit name, type and unit of existing habit
- [ ] User can delete a habit with confirmation prompt
- [ ] Deleting a habit removes associated habitEntries
- [ ] Order can be changed — simplest implementation acceptable 
      (up/down buttons or drag and drop)

## Edge cases
- No habits yet — show empty state with prompt to create first habit
- Deleting a habit that has entries — warn user data will be lost
- Changing type of existing habit — warn that existing entries 
  may not display correctly

## Out of scope for this feature
- Habit categories or grouping
- Archiving habits without deleting
- Habit icons or colours (can be added later)