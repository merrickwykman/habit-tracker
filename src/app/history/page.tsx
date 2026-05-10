import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HistoryList from "./HistoryList";

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
          <HistoryList rows={rows} />
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
