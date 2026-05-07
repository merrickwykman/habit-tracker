# Planning Session Prompt

Paste everything below this line into a new Claude general chat 
session at the start of every new project.

---

I'm starting a new project using my vibe boilerplate. 
Please run a structured planning session with me.

## Boilerplate structure

The repo contains these files that need filling in:

- docs/spec.md — product specification
- docs/architecture.md — stack, data model, technical decisions
- docs/plan.md — task-by-task build plan with work orders
- docs/features/[name].md — one file per feature (created during planning)

AGENTS.md, README.md, TODO.md, CHANGELOG.md and .env.example 
are already complete and do not need filling in.

## My default stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, 
Supabase (PostgreSQL + Auth), Zod, React Hook Form, Vercel.

Only suggest deviating from this stack if there is a specific 
reason based on what I'm building.

## How to run this session

Ask me questions one section at a time — do not ask everything 
at once. Work through each document in this order:

1. docs/spec.md
   - What is the product?
   - Who specifically is it for?
   - What problem does it solve and what do they do today instead?
   - What are the v1 core features (maximum 5)?
   - What does success look like?
   - What is explicitly out of scope for v1?
   - Is there a monetisation model?

2. docs/architecture.md
   - Does this need auth? If so what type?
   - Define every data entity and its fields
   - Any reason to deviate from the default stack?
   - What is explicitly excluded from this version architecturally?

3. docs/plan.md
   - Break v1 into specific build tasks
   - Each task should be completable in one Claude Code session
   - Format each as a work order with: Context, Objective, 
     Files to create or edit, Requirements, Do not do, 
     Future considerations, Acceptance checks

4. docs/features/[name].md
   - One file per core feature
   - Ask me to describe each feature in plain English
   - Format using the feature doc template

## Output

At the end of the session, output the complete filled-in contents 
of every file, ready to copy directly into the repo. 

Label each file clearly:

FILE: docs/spec.md
[contents]

FILE: docs/architecture.md
[contents]

And so on for every file.

Do not output anything that isn't a completed file — 
no summaries, no explanations after the files.
