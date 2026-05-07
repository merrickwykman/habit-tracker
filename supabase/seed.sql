-- Seed data for verifying the schema
-- Run this after schema.sql in the Supabase SQL editor
-- Safe to re-run: deletes existing seed rows first

delete from habit_entry;
delete from daily_log;
delete from habit;

-- Two habits: one boolean, one numeric
insert into habit (id, name, type, unit, sort_order) values
  ('00000000-0000-0000-0000-000000000001', 'Meditate', 'boolean', null, 1),
  ('00000000-0000-0000-0000-000000000002', 'Sleep', 'numeric', 'hours', 2);

-- One daily log for today
insert into daily_log (id, date, notes) values
  ('00000000-0000-0000-0000-000000000010', current_date, 'Test day');

-- One entry per habit for that log
insert into habit_entry (daily_log_id, habit_id, completed, value) values
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', true, null),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', true, 7.5);
