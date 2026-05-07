# Architecture

## Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Database: Supabase (PostgreSQL + Auth + Storage)
- Validation: Zod
- Forms: React Hook Form
- Deployment: Vercel

## Folder structure
```
src/
├─ app/                    ← Next.js pages and routes
│   ├─ (auth)/             ← auth routes grouped
│   ├─ (dashboard)/        ← protected app routes
│   └─ api/                ← API routes
├─ components/
│   ├─ ui/                 ← shadcn/ui primitives
│   └─ [feature]/          ← feature-specific components
├─ lib/
│   ├─ supabase.ts         ← Supabase client
│   ├─ utils.ts            ← shared utilities
│   └─ validations/        ← Zod schemas
└─ types/
    └─ index.ts            ← all TypeScript types
```

## Data model
<!--
Define every entity and relationship before writing any code.
This is the one thing that's hard to change later.

Example:
User
- id: uuid
- email: string
- createdAt: timestamp

Post
- id: uuid
- userId: uuid (→ User)
- title: string
- content: string
- publishedAt: timestamp | null
-->

## Auth
<!--
Does this need authentication?
- None — personal local tool
- Supabase Auth — email/password or magic link
- OAuth — Google, GitHub etc

If auth is needed, define protected vs public routes here.
-->

## Key technical decisions
<!--
Record decisions and why — prevents relitigating them later.

Example:
- Using Supabase direct queries over Drizzle — simpler for solo 
  project, RLS handles security at database level
- No separate API layer — Next.js API routes sufficient for this scope
-->

## Environment variables
<!--
List all required env vars so setup is never guesswork.

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
-->

## What NOT to add yet
<!--
Explicitly list things you are deliberately excluding from this version.
Prevents Claude from gold-plating the architecture.

Example:
- No Redis caching
- No background jobs
- No webhooks
- No mobile app
-->
