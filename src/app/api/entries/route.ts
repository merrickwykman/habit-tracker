import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const entrySchema = z.object({
  habit_id: z.string(),
  completed: z.boolean(),
  value: z.number().nullable().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = entrySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { habit_id, completed, value } = parsed.data;
  const today = new Date().toISOString().slice(0, 10);

  // Get or create today's daily log
  let dailyLogId: string;

  const { data: existingLog } = await supabase
    .from("daily_log")
    .select("id")
    .eq("date", today)
    .maybeSingle();

  if (existingLog) {
    dailyLogId = existingLog.id;
  } else {
    const { data: newLog, error: logError } = await supabase
      .from("daily_log")
      .insert({ date: today })
      .select("id")
      .single();

    if (logError || !newLog) {
      return NextResponse.json({ error: "Failed to create daily log." }, { status: 500 });
    }

    dailyLogId = newLog.id;
  }

  // Upsert the habit entry
  const { data, error } = await supabase
    .from("habit_entry")
    .upsert(
      { daily_log_id: dailyLogId, habit_id, completed, value: value ?? null },
      { onConflict: "daily_log_id,habit_id" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
