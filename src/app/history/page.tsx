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
    <main className="mx-auto max-w-5xl px-8 py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-medium">History</h1>

        {rows.length === 0 ? (
          <p className="text-gray-500">No history yet. Start logging habits today.</p>
        ) : (
          <HistoryList rows={rows} />
        )}
      </div>
    </main>
  );
}
