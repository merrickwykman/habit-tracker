# Plan

## Active task

### Task 1: Project setup and Supabase connection

#### Context
First task on every project. Establishes the foundation everything 
else builds on. No features until this is verified working.

#### Objective
A running Next.js app connected to Supabase with environment 
variables configured and verified.

#### Files to create or edit
- src/lib/supabase.ts — create Supabase client
- src/app/page.tsx — replace default with minimal placeholder
- .env.local — add Supabase credentials (not committed)
- .env.example — confirm variables are listed

#### Requirements
- Next.js app runs on localhost:3000 without errors
- Supabase client initialises without errors
- Environment variables load correctly
- No default Next.js content visible

#### Do not do
- Do not create any database tables yet
- Do not build any UI components yet
- Do not install additional dependencies without asking

#### Future considerations
- Database schema created in Task 2
- Auth may be added in a future version

#### Acceptance checks
- [ ] npm run dev runs without errors
- [ ] No TypeScript errors on npx tsc --noEmit
- [ ] Supabase client imports without error
- [ ] Placeholder page visible at localhost:3000

---

## Backlog

### Task 2: Database schema
Create all tables in Supabase — Habit, DailyLog, HabitEntry. 
Verify with test data.

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

<!-- Move finished tasks here with a brief note on decisions made -->