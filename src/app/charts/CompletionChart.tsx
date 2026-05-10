"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CompletionChartProps {
  data: { name: string; rate: number }[];
}

export default function CompletionChart({ data }: CompletionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 48, left: 0 }}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11 }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 11 }}
          width={36}
        />
        <Tooltip formatter={(v) => [`${v}%`, "Completion"]} />
        <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.rate === 100 ? "#22c55e" : "#111827"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
