"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface CreditScoreLineChartProps {
  data: Array<{ date: string; score: number }>;
}

export default function CreditScoreLineChart({ data }: CreditScoreLineChartProps) {
  return (
    <div className="bg-[#080808] rounded-xl w-[1014px] h-[373px] flex flex-col items-center justify-center mt-8">
      <div className="w-full flex flex-col items-start px-8 pt-8">
        <span className="text-[#F4F4F5] font-['Space_Grotesk'] text-base mb-2">
          Credit score over the last month (May)
        </span>
      </div>
      <div className="w-full h-[240px] flex flex-row">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart
            data={data}
            margin={{ left: 40, right: 40, top: 20, bottom: 20 }}
          >
            <YAxis
              domain={[60, 100]}
              label={{
                value: "Credit Score",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#F4F4F5",
                  fontSize: 14,
                  fontFamily: "Space Grotesk",
                },
                dx: -10,
                dy: 40,
              }}
              tick={{
                fill: "#F4F4F5",
                fontSize: 12,
                fontFamily: "Space Grotesk",
              }}
              ticks={[100, 90, 80, 60, 40, 20, 0]}
            />
            <XAxis
              dataKey="date"
              label={{
                value: "Day",
                position: "insideBottom",
                style: {
                  fill: "#F4F4F5",
                  fontSize: 14,
                  fontFamily: "Space Grotesk",
                },
                dy: 16,
              }}
              tick={{
                fill: "#F4F4F5",
                fontSize: 12,
                fontFamily: "Space Grotesk",
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "none",
                color: "#F4F4F5",
              }}
            />
            <Line
              dataKey="score"
              dot={{
                r: 6,
                fill: "#fff",
                stroke: "#9E00F9",
                strokeWidth: 2,
              }}
              stroke="#9E00F9"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
