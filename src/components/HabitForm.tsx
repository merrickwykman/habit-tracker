"use client";

import { useState } from "react";
import type { Habit } from "@/types";
import type { HabitFormValues } from "@/lib/validations/habit";

interface HabitFormProps {
  initial?: Habit;
  onSave: (values: HabitFormValues) => Promise<void>;
  onCancel: () => void;
}

export default function HabitForm({ initial, onSave, onCancel }: HabitFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [type, setType] = useState<"boolean" | "numeric">(initial?.type ?? "boolean");
  const [unit, setUnit] = useState(initial?.unit ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        type,
        unit: type === "numeric" && unit.trim() ? unit.trim() : null,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="habit-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="habit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Meditate"
          maxLength={100}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Type</span>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="habit-type"
              value="boolean"
              checked={type === "boolean"}
              onChange={() => setType("boolean")}
            />
            Boolean (done / not done)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="habit-type"
              value="numeric"
              checked={type === "numeric"}
              onChange={() => setType("numeric")}
            />
            Numeric (measured value)
          </label>
        </div>
      </div>

      {type === "numeric" && (
        <div className="flex flex-col gap-1">
          <label htmlFor="habit-unit" className="text-sm font-medium">
            Unit <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="habit-unit"
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="e.g. hours, km, 1–10"
            maxLength={20}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
