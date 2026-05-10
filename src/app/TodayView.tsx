"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import HabitCheckIn from "./HabitCheckIn";
import DayNotes from "@/components/DayNotes";
import type { Habit, HabitEntry } from "@/types";

interface TodayViewProps {
  habits: Habit[];
  entries: HabitEntry[];
  greeting: string;
  streak: number;
  today: string;
  notes: string | null;
}

export default function TodayView({ habits, entries, greeting, streak, today, notes }: TodayViewProps) {
  const router = useRouter();

  const entryByHabitId = Object.fromEntries(entries.map((e) => [e.habit_id, e]));
  const completedCount = habits.filter((h) => entryByHabitId[h.id]?.completed).length;
  const total = habits.length;
  const progressPct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const allDone = total > 0 && completedCount === total;

  async function handleSave(
    habitId: string,
    completed: boolean,
    value: number | null | undefined
  ) {
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habit_id: habitId, completed, value: value ?? null }),
    });
    if (!res.ok) throw new Error("Failed to save entry.");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <p className="text-lg font-medium">{greeting}</p>
        {streak > 0 && (
          <span className="text-sm text-gray-500">
            {streak}-day streak
          </span>
        )}
      </div>

      {/* Heatmap placeholder — built in Task 10 */}
      <div className="flex h-16 items-center justify-center rounded border border-dashed border-gray-200 text-sm text-gray-400">
        Activity heatmap coming soon
      </div>

      {habits.length === 0 ? (
        <p className="text-gray-500">
          No habits yet.{" "}
          <Link href="/habits" className="underline hover:text-gray-800">
            Add your first habit →
          </Link>
        </p>
      ) : (
        <>
          {/* Progress indicator */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className={allDone ? "font-medium text-green-600" : "text-gray-500"}>
                {allDone ? "All done today! 🎉" : `${completedCount} of ${total} completed`}
              </span>
              <span className="text-gray-400">{progressPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-300 ${allDone ? "bg-green-500" : "bg-gray-900"}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Habit list */}
          <ul className="flex flex-col divide-y divide-gray-100 rounded border border-gray-200">
            {habits.map((habit) => {
              const entry = entryByHabitId[habit.id] ?? null;
              const done = entry?.completed ?? false;
              return (
                <li
                  key={habit.id}
                  className={`px-4 py-3 transition-colors ${done ? "bg-green-50" : "bg-white"}`}
                >
                  <HabitCheckIn habit={habit} entry={entry} onSave={handleSave} />
                </li>
              );
            })}
          </ul>
        </>
      )}

      <DayNotes date={today} initialNotes={notes} />

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <Link href="/history" className="text-sm text-gray-400 hover:text-gray-700">
          History →
        </Link>
        <Link href="/habits" className="text-sm text-gray-400 hover:text-gray-700">
          Manage habits →
        </Link>
      </div>
    </div>
  );
}
