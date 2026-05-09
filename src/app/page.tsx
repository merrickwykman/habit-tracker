import { supabase } from "@/lib/supabase";
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

  const [{ data: habits }, { data: log }] = await Promise.all([
    supabase.from("habit").select("*").order("sort_order", { ascending: true }),
    supabase.from("daily_log").select("id").eq("date", today).maybeSingle(),
  ]);

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
    <main className="mx-auto max-w-xl px-4 py-10">
      <TodayView
        habits={habits ?? []}
        entries={entries}
        greeting={greeting()}
      />
    </main>
  );
}
