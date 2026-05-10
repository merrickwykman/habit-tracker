"use client";

import { useState } from "react";

interface DayNotesProps {
  date: string;
  initialNotes: string | null;
}

export default function DayNotes({ date, initialNotes }: DayNotesProps) {
  const [notes, setNotes] = useState(initialNotes ?? "");

  async function handleBlur() {
    await fetch("/api/logs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, notes }),
    });
  }

  return (
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      onBlur={handleBlur}
      placeholder="Add a note for this day…"
      rows={2}
      className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  );
}
