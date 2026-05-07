import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.enum(["boolean", "numeric"]),
  unit: z.string().max(20).nullable().optional(),
});

export type HabitFormValues = z.infer<typeof habitSchema>;
