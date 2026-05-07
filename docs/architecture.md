# Architecture

## Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Database: Supabase (PostgreSQL)
- Validation: Zod
- Forms: React Hook Form
- Deployment: Vercel

## Folder structure
\`\`\`
src/
├─ app/                        ← Next.js pages and routes
│   ├─ page.tsx                ← home / today view
│   ├─ history/
│   │   └─ page.tsx            ← history view
│   ├─ habits/
│   │   └─ page.tsx            ← habit management
│   ├─ charts/
│   │   └─ page.tsx            ← charts and visualisation
│   └─ api/
│       ├─ habits/
│       │   └─ route.ts        ← CRUD for habits
│       ├─ entries/
│       │   └─ route.ts        ← log habit completions
│       └─ logs/
│           └─ route.ts        ← daily log management
├─ components/
│   ├─ ui/                     ← shadcn/ui primitives
│   ├─ HabitCard/              ← individual habit checkbox/input
│   ├─ Heatmap/                ← GitHub-style activity heatmap
│   ├─ StreakBadge/            ← streak display with grace period
│   ├─ DayNote/                ← free text note component
│   └─ Charts/                 ← completion rate and metric charts
├─ lib/
│   ├─ supabase.ts             ← Supabase client
│   ├─ utils.ts                ← shared utilities
│   └─ validations/            ← Zod schemas
└─ types/
    └─ index.ts                ← all TypeScript types
\`\`\`

## Data model

**Habit**
Defines the things being tracked. Created once, reused daily.
- id: uuid
- name: string
- type: enum ('boolean' | 'numeric')
- unit: string | null (e.g. "bpm", "hours", "1-10")
- order: number
- createdAt: timestamp

**DailyLog**
One record per day. Created automatically on first entry of the day.
- id: uuid
- date: date (unique)
- notes: string | null
- createdAt: timestamp

**HabitEntry**
A record of a habit being completed or measured on a given day.
- id: uuid
- dailyLogId: uuid (→ DailyLog)
- habitId: uuid (→ Habit)
- completed: boolean
- value: numeric | null (for numeric type habits)
- createdAt: timestamp

## Auth
None — single user personal tool. No login required.

## Key technical decisions
- Supabase over local JSON — chosen for learning value ahead of 
  the lucid dreaming app which will need full Supabase setup
- No RLS policies needed — single user, no multi-tenancy risk
- Streak calculation derived on read — not stored, avoids sync 
  issues if entries are deleted or backdated
- Grace period logic — one missed day allowed before streak resets, 
  calculated by checking for gaps in DailyLog dates

## Environment variables
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
\`\`\`

## What NOT to add yet
- No authentication
- No background jobs or scheduled tasks
- No push notifications
- No external API integrations
- No AI pattern analysis
- No mobile-specific native features