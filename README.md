# Vibe Boilerplate

A structured starting point for vibe coding projects. Gives Claude Code a clear set of rules, a planning workflow, and the right documentation files so you stay in control of what gets built.

## What's included

| File | Purpose |
|------|---------|
| `AGENTS.md` | Rules and workflow instructions loaded by Claude Code at the start of every session |
| `TODO.md` | Current session task list — max 3 tasks, cleared each session |
| `CHANGELOG.md` | Running log of what changed, why, and what decisions were made |
| `.env.example` | Template for required environment variables |
| `docs/spec.md` | Product specification — fill in before any build starts |
| `docs/architecture.md` | Stack, folder structure, data model, and technical decisions |
| `docs/plan.md` | Task-by-task build plan with backlog and completed history |
| `docs/features/example.md` | Feature doc template — copy for each new feature |
| `docs/planning-prompt.md` | Prompt to paste into Claude to run a guided planning session |

---

## Create a new project from this template

1. On GitHub, click **Use this template → Create a new repository**
2. Name your repo and set visibility
3. Clone your new repo locally:

```bash
git clone https://github.com/your-username/your-project-name
cd your-project-name
```

4. Install dependencies and set up environment:

```bash
npm install
cp .env.example .env.local
```

5. Fill in `.env.local` with your Supabase credentials

6. Run the dev server:

```bash
npm run dev
```

---

## Planning session — do this before building anything

This is the most important step. Claude builds what you specify. Vague specs produce vague products.

### Use the planning prompt

`docs/planning-prompt.md` contains a prompt you paste into a new Claude chat (not Claude Code — a regular conversation). It runs a structured interview that produces completed, copy-ready versions of `docs/spec.md`, `docs/architecture.md`, `docs/plan.md`, and all feature docs.

**How to use it:**

1. Open `docs/planning-prompt.md`
2. Copy everything below the `---` divider
3. Paste it into a new Claude chat at [claude.ai](https://claude.ai)
4. Answer the questions — Claude will work through one section at a time
5. At the end, Claude outputs every file ready to copy into your repo
6. Paste the contents into the relevant files, then start building

Do this before opening Claude Code. The planning prompt is a conversation tool, not a build tool.

---

**Fill in these files in order:**

### 1. `docs/spec.md`
Define what you're building and why. Answer every section:
- What does it do?
- Who is it for (be specific — a real person with a real problem)?
- What do they do today instead?
- What are the 5 core v1 features max?
- What is explicitly out of scope?

### 2. `docs/architecture.md`
Define your data model before writing any code. This is the hardest thing to change later. Fill in:
- Every entity and its fields
- Whether you need auth and what type
- Any technical decisions and the reasoning behind them

### 3. `docs/plan.md`
Break the build into tasks. Each task should be:
- Small enough to complete in one Claude Code session
- Specific enough that Claude knows exactly what files to touch
- Written as a work order, not a vague goal

Only ever have one active task. Everything else goes in the backlog.

---

## Running a Claude Code session

### Starting a session

Open Claude Code and start with:

```
Read AGENTS.md and docs/plan.md. Implement Task [N] only.
```

For a feature with its own doc:

```
Read AGENTS.md and docs/features/[feature-name].md. Implement [feature name].
```

Claude will read its instructions, enter plan mode, list the files it plans to change, and wait for your go-ahead before touching anything.

### During a session

- Claude proposes a plan first — review it before saying yes
- If something looks wrong or out of scope, say so before it builds
- Keep `TODO.md` to 3 tasks max — anything more goes in `docs/plan.md` backlog
- Claude will not push to Git — you review and push manually

### Ending a session

1. Move completed tasks from `TODO.md` to the **Done today** section
2. Clear `TODO.md` for next session
3. Review the suggested commit message Claude provides
4. Update `CHANGELOG.md` if anything meaningful changed
5. If Claude worked on a separate branch, merge it before pushing:

```bash
git merge claude/[branch-name]
git push
```

---

## File reference

### `AGENTS.md`
Loaded at the start of every session. Sets Claude's identity, rules, and workflow. Do not delete. Edit only if you want to change how Claude behaves globally across this project.

### `TODO.md`
Current session only. Max 3 tasks. Not a backlog — that lives in `docs/plan.md`. Clear it at the end of every session.

### `CHANGELOG.md`
Updated after meaningful changes, not every commit. Records what changed, why, and any decisions made. Prevents relitigating the same decisions in future sessions.

### `.env.example`
Committed to Git. Lists every required environment variable with no values. Update it whenever you add a new env var. Never commit `.env.local`.

### `docs/spec.md`
Your product definition. Fill this in once during planning. Update it if scope genuinely changes — not just to reflect what was built.

### `docs/architecture.md`
Stack, folder structure, data model, auth approach, and key technical decisions. Update when architecture changes, not when features are added.

### `docs/plan.md`
Your build sequence. One active task at a time. Promote from backlog when the current task is done. Move completed tasks to the Completed section with a brief note on decisions made.

### `docs/features/example.md`
Template for feature docs. Copy it, rename it, fill it in during planning. Reference it in Claude Code sessions to scope work to a single feature.

```bash
cp docs/features/example.md docs/features/[feature-name].md
```

### `docs/planning-prompt.md`
Paste into a Claude chat to run a guided planning session. Produces completed versions of all docs files ready to copy into the repo. Use this before your first Claude Code session, not during one.

---

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth + Storage)
- Zod + React Hook Form
- Vercel
