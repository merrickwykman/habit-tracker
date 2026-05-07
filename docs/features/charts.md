# Feature: Charts and Visualisation

## What it does
A dedicated charts page showing two types of visualisation:
1. Completion rate per boolean habit over the last 30 days 
   (e.g. exercise completed 22/30 days)
2. Line chart of numeric metric values over time 
   (e.g. resting heart rate trend)

## User stories
- As a user, I want to see my habit completion rates over 30 days 
  so I can assess consistency
- As a user, I want to see trends in my numeric metrics so I can 
  spot correlations with how I feel

## Data requirements
Reads: habitEntries for last 30 days joined with habits
Derives: completion rate per boolean habit
Derives: value series per numeric habit

## Acceptance criteria
- [ ] Boolean habits show completion rate as bar or percentage
- [ ] Numeric habits show line chart over 30 days
- [ ] Charts only show habits that have data
- [ ] Empty state if no data exists yet
- [ ] No N+1 queries — data fetched efficiently

## Edge cases
- Habit with no entries in 30 days — exclude from chart
- Numeric habit with gaps — line chart handles missing days gracefully
- Only one data point — still renders without breaking

## Out of scope for this feature
- Custom date ranges
- Exporting charts
- Correlating habits with each other