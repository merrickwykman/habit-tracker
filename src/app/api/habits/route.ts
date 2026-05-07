import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { habitSchema } from "@/lib/validations/habit";

export async function GET() {
  const { data, error } = await supabase
    .from("habit")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = habitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { name, type, unit } = parsed.data;

  // Place new habit at the end
  const { count } = await supabase
    .from("habit")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("habit")
    .insert({ name, type, unit: unit ?? null, sort_order: count ?? 0 })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
