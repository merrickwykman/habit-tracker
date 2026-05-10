"use client";

import DayNotes from "@/components/DayNotes";

interface HistoryRow {
  date: string;
  notes: string | null;
  completedNames: string[];
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HistoryList({ rows }: { rows: HistoryRow[] }) {
  return (
    <ul className="flex flex-col divide-y divide-gray-100 rounded border border-gray-200">
      {rows.map((row) => (
        <li key={row.date} className="flex flex-col gap-2 px-4 py-3">
          <span className="text-sm font-medium">{formatDate(row.date)}</span>
          {row.completedNames.length > 0 ? (
            <p className="text-sm text-gray-500">
              {row.completedNames.join(" · ")}
            </p>
          ) : (
            <p className="text-sm italic text-gray-400">Nothing logged</p>
          )}
          <DayNotes date={row.date} initialNotes={row.notes} />
        </li>
      ))}
    </ul>
  );
}
