# Plan

## Active task

### Task 4: Daily check-in and today view
Home screen with greeting, heatmap placeholder, habits listed 
with checkboxes and numeric inputs. Creates DailyLog on first 
entry of the day. Individual habit completion as you go.

---

## Backlog

### Task 5: Today view polish
Outstanding vs completed visual distinction. Progress indicator 
showing X of Y habits done today.

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
