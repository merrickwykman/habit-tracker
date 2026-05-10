import { supabase } from "@/lib/supabase";
import { calculateStreak } from "@/lib/streak";
import TodayView from "./TodayView";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
  // TODO: personalise with user name once auth is added
}

export default async function Home() {
  const today = new Date().toISOString().slice(0, 10);

  const [{ data: habits }, { data: log }, { data: allLogs }] = await Promise.all([
    supabase.from("habit").select("*").order("sort_order", { ascending: true }),
    supabase.from("daily_log").select("id, notes").eq("date", today).maybeSingle(),
    supabase
      .from("daily_log")
      .select("date, habit_entry(completed)")
      .order("date", { ascending: false }),
  ]);

  const streak = calculateStreak(
    (allLogs ?? []).map((l) => String(l.date).slice(0, 10)),
    today
  );

  const heatmapData: Record<string, number> = {};
  for (const log of allLogs ?? []) {
    const date = String(log.date).slice(0, 10);
    const entries = (log.habit_entry as unknown as { completed: boolean }[]) ?? [];
    heatmapData[date] = entries.filter((e) => e.completed).length;
  }

  const entries =
    log?.id
      ? (
          await supabase
            .from("habit_entry")
            .select("*")
            .eq("daily_log_id", log.id)
        ).data ?? []
      : [];

  return (
    <main className="mx-auto max-w-5xl px-8 py-8">
      <TodayView
        habits={habits ?? []}
        entries={entries}
        greeting={greeting()}
        streak={streak}
        today={today}
        notes={log?.notes ?? null}
        heatmapData={heatmapData}
        totalHabits={habits?.length ?? 0}
      />
    </main>
  );
}
