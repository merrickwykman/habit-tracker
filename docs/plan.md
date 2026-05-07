# Plan

## Active task

### Task 2: Database schema

#### Context
Creates the three tables the app depends on. No app features
can be built until the schema exists and is verified.

#### Objective
All tables created in Supabase and verified with test data.

#### Files created
- supabase/schema.sql — DDL for habit, daily_log, habit_entry tables
- supabase/seed.sql — test data to verify the schema
- src/types/index.ts — TypeScript interfaces matching the schema

#### Requirements
- Run schema.sql in the Supabase SQL editor
- Run seed.sql to insert test rows
- Verify rows appear in the Supabase Table Editor

#### Acceptance checks
- [ ] All three tables visible in Supabase Table Editor
- [ ] Seed data inserted without errors
- [ ] npx tsc --noEmit passes

---

## Backlog

### Task 3: Habit management
Create, edit, delete and reorder habits. Separate settings page.
Boolean and numeric types supported.

### Task 4: Daily check-in and today view
Home screen with greeting, heatmap placeholder, habits listed 
with checkboxes and numeric inputs. Creates DailyLog on first 
entry of the day. Individual habit completion as you go.

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

### Task 1: Project setup and Supabase connection
Next.js 16 scaffolded with TypeScript, Tailwind, App Router.
@supabase/supabase-js installed. Supabase client created in
src/lib/supabase.ts reading from env vars. Placeholder page
replaces default Next.js content. .env.local not committed.