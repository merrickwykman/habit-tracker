# Plan

## Active task

### Task 2: Database schema
Create all tables in Supabase — Habit, DailyLog, HabitEntry. 
Verify with test data.

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

### Task 1: Project setup and Supabase connection ✓
Next.js scaffolded, Supabase client created, .env.local gitignored, 
type checks passing clean.
