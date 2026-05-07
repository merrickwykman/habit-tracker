"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HabitForm from "@/components/HabitForm";
import type { Habit } from "@/types";
import type { HabitFormValues } from "@/lib/validations/habit";

type Mode =
  | { type: "idle" }
  | { type: "adding" }
  | { type: "editing"; habit: Habit };

export default function HabitList({ habits }: { habits: Habit[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>({ type: "idle" });
  const [error, setError] = useState<string | null>(null);

  function refresh() {
    router.refresh();
    setMode({ type: "idle" });
  }

  async function handleAdd(values: HabitFormValues) {
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Failed to create habit.");
    refresh();
  }

  async function handleEdit(habit: Habit, values: HabitFormValues) {
    const res = await fetch(`/api/habits/${habit.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Failed to update habit.");
    refresh();
  }

  async function handleDelete(habit: Habit) {
    const confirmed = window.confirm(
      `Delete "${habit.name}"? This will also remove all logged entries for this habit.`
    );
    if (!confirmed) return;

    const res = await fetch(`/api/habits/${habit.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete habit.");
      return;
    }
    refresh();
  }

  async function handleMove(habit: Habit, direction: "up" | "down") {
    const index = habits.findIndex((h) => h.id === habit.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= habits.length) return;

    const other = habits[swapIndex];

    const results = await Promise.all([
      fetch(`/api/habits/${habit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: other.sort_order }),
      }),
      fetch(`/api/habits/${other.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: habit.sort_order }),
      }),
    ]);

    if (results.some((r) => !r.ok)) {
      setError("Failed to reorder habits.");
      return;
    }

    router.refresh();
  }

  return (
    <>
      {error && (
        <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {habits.length === 0 && mode.type === "idle" && (
        <p className="mb-6 text-gray-500">
          No habits yet.{" "}
          <button
            onClick={() => setMode({ type: "adding" })}
            className="underline hover:text-gray-800"
          >
            Add your first habit
          </button>
          .
        </p>
      )}

      {habits.length > 0 && (
        <ul className="mb-6 divide-y divide-gray-100 rounded border border-gray-200">
          {habits.map((habit, index) => (
            <li key={habit.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex flex-col gap-0.5">
                <button
                  aria-label="Move up"
                  disabled={index === 0}
                  onClick={() => handleMove(habit, "up")}
                  className="text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  aria-label="Move down"
                  disabled={index === habits.length - 1}
                  onClick={() => handleMove(habit, "down")}
                  className="text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
                >
                  ▼
                </button>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">{habit.name}</p>
                <p className="text-xs text-gray-500">
                  {habit.type === "boolean"
                    ? "Boolean"
                    : `Numeric${habit.unit ? ` · ${habit.unit}` : ""}`}
                </p>
              </div>

              <button
                onClick={() => setMode({ type: "editing", habit })}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(habit)}
                className="text-sm text-red-400 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {mode.type === "idle" && habits.length > 0 && (
        <button
          onClick={() => setMode({ type: "adding" })}
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          Add habit
        </button>
      )}

      {mode.type === "adding" && (
        <div className="rounded border border-gray-200 p-4">
          <h2 className="mb-4 text-sm font-semibold">New habit</h2>
          <HabitForm
            onSave={handleAdd}
            onCancel={() => setMode({ type: "idle" })}
          />
        </div>
      )}

      {mode.type === "editing" && (
        <div className="rounded border border-gray-200 p-4">
          <h2 className="mb-4 text-sm font-semibold">Edit habit</h2>
          <HabitForm
            initial={mode.habit}
            onSave={(values) => handleEdit(mode.habit, values)}
            onCancel={() => setMode({ type: "idle" })}
          />
        </div>
      )}
    </>
  );
}
