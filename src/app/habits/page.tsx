import { supabase } from "@/lib/supabase";
import HabitList from "./HabitList";

export default async function HabitsPage() {
  const { data, error } = await supabase
    .from("habit")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <main className="mx-auto max-w-5xl px-8 py-8">
      <div className="mb-6">
        <h1 className="text-lg font-medium">Habits</h1>
      </div>

      {error && (
        <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
          {error.message}
        </p>
      )}

      <HabitList habits={data ?? []} />
    </main>
  );
}
