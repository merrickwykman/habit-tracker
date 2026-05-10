import { supabase } from "@/lib/supabase";
import type { Habit } from "@/types";
import CompletionChart from "./CompletionChart";
import MetricsChart from "./MetricsChart";

export default async function ChartsPage() {
  const since = new Date();
  since.setDate(since.getDate() - 29);
  const sinceStr = since.toISOString().slice(0, 10);

  const [{ data: habits }, { data: logs }] = await Promise.all([
    supabase.from("habit").select("*").order("sort_order"),
    supabase
      .from("daily_log")
      .select("date, habit_entry(habit_id, completed, value)")
      .gte("date", sinceStr)
      .order("date", { ascending: true }),
  ]);

  const allHabits: Habit[] = habits ?? [];
  const booleanHabits = allHabits.filter((h) => h.type === "boolean");
  const numericHabits = allHabits.filter((h) => h.type === "numeric");

  // Build habitId -> entries lookup from nested daily_log data
  const entryMap: Record<
    string,
    { date: string; completed: boolean; value: number | null }[]
  > = {};

  for (const log of logs ?? []) {
    const date = String(log.date).slice(0, 10);
    const entries = (
      log.habit_entry as unknown as {
        habit_id: string;
        completed: boolean;
        value: number | null;
      }[]
    ) ?? [];
    for (const entry of entries) {
      if (!entryMap[entry.habit_id]) entryMap[entry.habit_id] = [];
      entryMap[entry.habit_id].push({ date, completed: entry.completed, value: entry.value });
    }
  }

  const completionData = booleanHabits.map((h) => {
    const completed = (entryMap[h.id] ?? []).filter((e) => e.completed).length;
    return { name: h.name, rate: Math.round((completed / 30) * 100) };
  });

  const metricSeries = numericHabits.map((h) => ({
    habit: h,
    points: (entryMap[h.id] ?? [])
      .filter((e) => e.value !== null)
      .map((e) => ({ date: e.date, value: e.value as number })),
  }));

  const noHabits = allHabits.length === 0;

  return (
    <main className="mx-auto max-w-5xl px-8 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Charts</h1>
          <p className="text-xs text-gray-400">Last 30 days</p>
        </div>

        {noHabits ? (
          <p className="text-gray-500">No habits yet. Add some habits to see charts.</p>
        ) : (
          <>
            {booleanHabits.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-medium text-gray-700">Completion rate</h2>
                <CompletionChart data={completionData} />
              </section>
            )}

            {numericHabits.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-medium text-gray-700">Metrics over time</h2>
                <MetricsChart series={metricSeries} />
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
