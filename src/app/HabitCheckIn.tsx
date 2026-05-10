"use client";

import { useState } from "react";
import type { Habit, HabitEntry } from "@/types";

interface HabitCheckInProps {
  habit: Habit;
  entry: HabitEntry | null;
  onSave: (habitId: string, completed: boolean, value?: number | null) => Promise<void>;
}

export default function HabitCheckIn({ habit, entry, onSave }: HabitCheckInProps) {
  const [saving, setSaving] = useState(false);
  const [numericValue, setNumericValue] = useState<string>(
    entry?.value != null ? String(entry.value) : ""
  );
  const [inputError, setInputError] = useState<string | null>(null);

  const isCompleted = entry?.completed ?? false;

  async function handleBooleanChange(checked: boolean) {
    setSaving(true);
    try {
      await onSave(habit.id, checked, null);
    } finally {
      setSaving(false);
    }
  }

  async function handleNumericSave() {
    // Bug 1 fix: validate before proceeding — empty input was falling through
    // and creating a completed=false entry, which looked like nothing happened.
    if (numericValue.trim() === "") {
      setInputError("Please enter a value.");
      return;
    }
    const parsed = Number(numericValue);
    if (isNaN(parsed)) {
      setInputError("Please enter a valid number.");
      return;
    }

    setInputError(null);
    setSaving(true);
    const completed = habit.goal != null ? parsed >= habit.goal : true;
    try {
      await onSave(habit.id, completed, parsed);
    } catch {
      setInputError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (habit.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          disabled={saving}
          onChange={(e) => handleBooleanChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-gray-900"
        />
        <span className={isCompleted ? "text-gray-400 line-through" : "text-gray-900"}>
          {habit.name}
        </span>
        {saving && <span className="ml-auto text-xs text-gray-400">Saving…</span>}
      </label>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <span className={`flex-1 ${isCompleted ? "text-gray-400" : "text-gray-900"}`}>
          {habit.name}
        </span>
        <input
          type="number"
          value={numericValue}
          onChange={(e) => {
            setNumericValue(e.target.value);
            setInputError(null);
          }}
          placeholder="—"
          className={`w-20 rounded border bg-white px-2 py-1 text-right text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
            inputError ? "border-red-400" : "border-gray-300"
          }`}
        />
        {habit.unit && (
          <span className="w-12 text-sm text-gray-500">{habit.unit}</span>
        )}
        <button
          onClick={handleNumericSave}
          disabled={saving}
          className="rounded bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? "…" : isCompleted ? "Update" : "Save"}
        </button>
      </div>
      {inputError && (
        <p className="text-right text-xs text-red-500">{inputError}</p>
      )}
      {habit.goal != null && (
        <p className="text-right text-xs text-gray-400">
          Goal: {habit.goal}{habit.unit ? ` ${habit.unit}` : ""}
        </p>
      )}
    </div>
  );
}
