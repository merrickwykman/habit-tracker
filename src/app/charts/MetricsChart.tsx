"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Habit } from "@/types";

interface MetricSeries {
  habit: Habit;
  points: { date: string; value: number }[];
}

function formatDate(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${parseInt(month)}/${parseInt(day)}`;
}

export default function MetricsChart({ series }: { series: MetricSeries[] }) {
  return (
    <div className="flex flex-col gap-8">
      {series.map(({ habit, points }) => (
        <div key={habit.id} className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">
            {habit.name}
            {habit.unit && (
              <span className="ml-1 font-normal text-gray-400">({habit.unit})</span>
            )}
          </p>
          {points.length === 0 ? (
            <p className="text-sm italic text-gray-400">No data logged in the last 30 days.</p>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <LineChart
                data={points.map((p) => ({ ...p, date: formatDate(p.date) }))}
                margin={{ top: 4, right: 8, bottom: 4, left: 0 }}
              >
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={36} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#111827"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      ))}
    </div>
  );
}
