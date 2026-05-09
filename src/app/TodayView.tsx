"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import HabitCheckIn from "./HabitCheckIn";
import type { Habit, HabitEntry } from "@/types";

interface TodayViewProps {
  habits: Habit[];
  entries: HabitEntry[];
  greeting: string;
}

export default function TodayView({ habits, entries, greeting }: TodayViewProps) {
  const router = useRouter();

  const entryByHabitId = Object.fromEntries(entries.map((e) => [e.habit_id, e]));
  const completedCount = habits.filter((h) => entryByHabitId[h.id]?.completed).length;

  async function handleSave(
    habitId: string,
    completed: boolean,
    value: number | null | undefined
  ) {
    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habit_id: habitId, completed, value: value ?? null }),
    });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg font-medium">{greeting}</p>

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
          <p className="text-sm text-gray-500">
            {completedCount} of {habits.length} completed today
          </p>

          <ul className="flex flex-col divide-y divide-gray-100 rounded border border-gray-200">
            {habits.map((habit) => (
              <li key={habit.id} className="px-4 py-3">
                <HabitCheckIn
                  habit={habit}
                  entry={entryByHabitId[habit.id] ?? null}
                  onSave={handleSave}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="border-t border-gray-100 pt-4">
        <Link href="/habits" className="text-sm text-gray-400 hover:text-gray-700">
          Manage habits →
        </Link>
      </div>
    </div>
  );
}
