# Feature: Daily Check-in and Today View

## What it does
The home screen of the app. Greets the user by name, shows the 
activity heatmap, and lists all habits with their completion 
status for today. User taps or clicks habits off individually 
throughout the day as they complete them. Boolean habits show 
a checkbox. Numeric habits show an input field.

## User stories
- As a user, I want to see what habits I have left to complete 
  today so I know what's outstanding at a glance
- As a user, I want to tap a habit to mark it complete so logging 
  takes seconds not minutes
- As a user, I want to enter a value for numeric habits like 
  resting heart rate so I can track trends over time
- As a user, I want to see my progress through today's habits 
  so I feel motivated to complete them

## Data requirements
Reads: habits table (all habits in order)
Reads: dailyLogs table (today's log if exists)
Reads: habitEntries table (today's entries)
Creates: dailyLog row on first entry of the day
Creates: habitEntry row on each completion
Updates: habitEntry on value change

## Acceptance criteria
- [ ] Home screen loads with greeting using a name
- [ ] All habits displayed in configured order
- [ ] Boolean habits show checkbox — checked if completed today
- [ ] Numeric habits show input — pre-filled if value logged today
- [ ] Completing a habit saves immediately without page refresh
- [ ] Progress indicator shows X of Y habits completed
- [ ] DailyLog created automatically on first completion of the day
- [ ] Completing same habit twice in one day updates rather than 
      creates duplicate entry

## Edge cases
- No habits created yet — show empty state with link to habit setup
- First time user — no DailyLog exists, create on first entry
- Numeric habit submitted with no value — do not create entry
- Page refreshed mid-day — all completions persist correctly

## Out of scope for this feature
- Editing or deleting habits (that's the habit management feature)
- Viewing past days (that's the history view)
- Streak display (that's the streak tracking feature)
- Heatmap data (placeholder only in this task, built in Task 10)