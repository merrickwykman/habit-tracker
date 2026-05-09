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

  async function handleBooleanChange(checked: boolean) {
    setSaving(true);
    try {
      await onSave(habit.id, checked, null);
    } finally {
      setSaving(false);
    }
  }

  async function handleNumericSave() {
    const parsed = numericValue.trim() === "" ? null : Number(numericValue);
    if (numericValue.trim() !== "" && isNaN(parsed as number)) return;
    setSaving(true);
    try {
      await onSave(habit.id, parsed !== null, parsed);
    } finally {
      setSaving(false);
    }
  }

  if (habit.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={entry?.completed ?? false}
          disabled={saving}
          onChange={(e) => handleBooleanChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-gray-900"
        />
        <span className={entry?.completed ? "text-gray-400 line-through" : ""}>
          {habit.name}
        </span>
      </label>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="flex-1">{habit.name}</span>
      <input
        type="number"
        value={numericValue}
        onChange={(e) => setNumericValue(e.target.value)}
        placeholder="—"
        className="w-20 rounded border border-gray-300 px-2 py-1 text-right text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      {habit.unit && (
        <span className="w-12 text-sm text-gray-500">{habit.unit}</span>
      )}
      <button
        onClick={handleNumericSave}
        disabled={saving}
        className="rounded bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
      >
        {saving ? "…" : "Save"}
      </button>
    </div>
  );
}
