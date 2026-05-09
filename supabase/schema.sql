-- Habit Tracker schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

-- Enum for habit type
create type habit_type as enum ('boolean', 'numeric');

-- Habits — the things being tracked
create table habit (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  type        habit_type not null,
  unit        text,
  goal        numeric,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- Daily logs — one row per day, created on first entry of that day
create table daily_log (
  id          uuid primary key default gen_random_uuid(),
  date        date not null unique,
  notes       text,
  created_at  timestamptz not null default now()
);

-- Habit entries — a habit's completion or measurement for a given day
create table habit_entry (
  id            uuid primary key default gen_random_uuid(),
  daily_log_id  uuid not null references daily_log(id) on delete cascade,
  habit_id      uuid not null references habit(id) on delete cascade,
  completed     boolean not null default false,
  value         numeric,
  created_at    timestamptz not null default now(),
  unique (daily_log_id, habit_id)
);
