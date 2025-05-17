"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useRouter } from "next/navigation";

interface CreditScoreLineChartProps {
  data: Array<{ date: string; score: number; rawData?: any }>;
  creditScoreHistory?: any[];
}

export default function CreditScoreLineChart({
  data,
  creditScoreHistory = [],
}: CreditScoreLineChartProps) {
  console.log("CREDIT SCORE HISTORY", creditScoreHistory);
  const router = useRouter();

  const getRawDataForDate = (date: string) => {
    // Try to parse "May 2025" to month and year
    const [monthStr, yearStr] = date.split(" ");
    if (!monthStr || !yearStr) return undefined;
    const month = new Date(`${monthStr} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr, 10);

    return creditScoreHistory.find((item) => {
      const itemDate = new Date(item.timestamp || item.date);
      return (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month
      );
    });
  };

  const handleDotClick = (payload: any) => {
    // Debug: log payload
    console.log("handleDotClick payload:", payload);
    const raw = getRawDataForDate(payload?.date);
    console.log("Raw data for clicked date:", raw);
    if (raw) {
      console.log("IN RAW");
      const d = new Date(raw.timestamp || raw.date);
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      router.push(`/credit-score/${monthStr}`);
    }
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    // Debug: log payload to see what you get
    console.log("CustomDot payload:", payload);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#fff"
        stroke="#9E00F9"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onClick={() => handleDotClick(payload)}
      />
    );
  };

  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    // Debug: log payload to see what you get
    console.log("CustomActiveDot payload:", payload);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="#9E00F9"
        stroke="#fff"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onClick={() => handleDotClick(payload)}
      />
    );
  };

  return (
    <div className="bg-[#080808] rounded-xl w-full h-[373px] flex flex-col items-center justify-center mt-8">
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
                value: "Month",
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
              stroke="#9E00F9"
              strokeWidth={2}
              type="monotone"
              dot={<CustomDot />}
              activeDot={<CustomActiveDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
