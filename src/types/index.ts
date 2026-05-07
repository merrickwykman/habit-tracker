export type HabitType = "boolean" | "numeric";

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  unit: string | null;
  sort_order: number;
  created_at: string;
}

export interface DailyLog {
  id: string;
  date: string;
  notes: string | null;
  created_at: string;
}

export interface HabitEntry {
  id: string;
  daily_log_id: string;
  habit_id: string;
  completed: boolean;
  value: number | null;
  created_at: string;
}
