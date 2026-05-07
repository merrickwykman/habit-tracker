import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HabitList from "./HabitList";

export default async function HabitsPage() {
  const { data, error } = await supabase
    .from("habit")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Habits</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← Home
        </Link>
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
