interface HeatmapProps {
  data: Record<string, number>;
  totalHabits: number;
}

function cellColor(completed: number, total: number): string {
  if (total === 0 || completed === 0) return "bg-gray-100";
  const ratio = completed / total;
  if (ratio < 0.25) return "bg-green-200";
  if (ratio < 0.5) return "bg-green-300";
  if (ratio < 1) return "bg-green-500";
  return "bg-green-700";
}

export default function Heatmap({ data, totalHabits }: HeatmapProps) {
  // Use UTC midnight to avoid DST producing duplicate dates via toISOString()
  const now = new Date();
  const todayMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  // Build 365 days ending today, oldest first
  const days: string[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(todayMs - i * 86_400_000);
    days.push(d.toISOString().slice(0, 10));
  }

  // Pad start so the first day falls on Monday (weekday 0 = Mon in our grid)
  const firstDayOfWeek = (new Date(days[0] + "T00:00:00Z").getUTCDay() + 6) % 7;
  const paddedDays = [
    ...Array(firstDayOfWeek).fill(null),
    ...days,
  ];

  return (
    <div
      className="grid gap-0.5 overflow-hidden"
      style={{
        gridTemplateRows: "repeat(7, minmax(0, 1fr))",
        gridAutoFlow: "column",
        gridAutoColumns: "minmax(0, 1fr)",
      }}
    >
      {paddedDays.map((date, i) =>
        date === null ? (
          <div key={`pad-${i}`} className="h-2.5 w-2.5" />
        ) : (
          <div
            key={date}
            title={date}
            className={`h-2.5 w-2.5 rounded-sm ${cellColor(data[date] ?? 0, totalHabits)}`}
          />
        )
      )}
    </div>
  );
}
