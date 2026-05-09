# Plan

## Active task

### Task 5: Today view polish
Outstanding vs completed visual distinction. Progress indicator 
showing X of Y habits done today.

---

## Backlog

### Task 5b: Habit goals and completion thresholds
Add optional goal field to numeric habits (e.g. Water goal = 4L).
Habit only marks as completed when logged value meets or exceeds goal.
Requires: Supabase migration to add goal column, habit form update, 
completion logic update in HabitCheckIn.

### Task 6: History view
List of past days showing summary of completed habits per day. 
Clean, scannable, no drilling into detail.

### Task 7: Streak tracking
Calculate consecutive days from DailyLog dates. One missed day 
grace period before reset. Display streak on home screen.

### Task 8: Day notes
Free text note field on each day. Added from home screen or 
history view.

### Task 9: Charts and visualisation
Completion rate per habit over 30 days. Line chart for numeric 
metrics over time. Recharts library.

### Task 10: Activity heatmap
GitHub-style yearly heatmap of logging activity. Colour intensity 
based on number of habits completed that day. Hero element on 
home screen.

### Task 11: PWA setup
manifest.json, service worker, add to home screen support. 
Mobile-friendly layout pass.

---

## Completed

### Task 4: Daily check-in and today view
Home screen replaced with server component fetching habits,
today's daily_log, and habit_entry rows. TodayView client
component renders greeting, heatmap placeholder, progress count,
and habit list. HabitCheckIn handles boolean checkbox and numeric
input. /api/entries POST upserts entries and auto-creates daily_log.

### Task 3: Habit management
Settings page at /habits. Create, edit, delete, reorder with
up/down buttons. Boolean and numeric types. HabitForm shared
component. Server component fetches habits; client component
handles mutations via router.refresh(). API routes at
/api/habits and /api/habits/[id].

### Task 2: Database schema
habit, daily_log, and habit_entry tables created in Supabase.
habit_type enum ('boolean', 'numeric'). sort_order used instead
of reserved word order. Verified with seed data. TypeScript
interfaces in src/types/index.ts.

### Task 1: Project setup and Supabase connection
Next.js 16 scaffolded with TypeScript, Tailwind, App Router.
@supabase/supabase-js installed. Supabase client created in
src/lib/supabase.ts reading from env vars. Placeholder page
replaces default Next.js content. .env.local not committed.
