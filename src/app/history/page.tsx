import Link from "next/link";
import { supabase } from "@/lib/supabase";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function HistoryPage() {
  const { data: logs } = await supabase
    .from("daily_log")
    .select("id, date, notes, habit_entry(completed, habit(name))")
    .order("date", { ascending: false });

  const rows = (logs ?? []).map((log) => {
    const completedNames = (log.habit_entry ?? [])
      .filter((e) => e.completed)
      .map((e) => (e.habit as unknown as { name: string } | null)?.name)
      .filter((n): n is string => Boolean(n));
    return { date: log.date, notes: log.notes, completedNames };
  });

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">History</h1>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-700">
            ← Today
          </Link>
        </div>

        {rows.length === 0 ? (
          <p className="text-gray-500">No history yet. Start logging habits today.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-gray-100 rounded border border-gray-200">
            {rows.map((row) => (
              <li key={row.date} className="flex flex-col gap-1 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{formatDate(row.date)}</span>
                  {row.notes && (
                    <span className="text-xs text-gray-400">Note</span>
                  )}
                </div>
                {row.completedNames.length > 0 ? (
                  <p className="text-sm text-gray-500">
                    {row.completedNames.join(" · ")}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-400">Nothing logged</p>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-gray-100 pt-4">
          <Link href="/habits" className="text-sm text-gray-400 hover:text-gray-700">
            Manage habits →
          </Link>
        </div>
      </div>
    </main>
  );
}
