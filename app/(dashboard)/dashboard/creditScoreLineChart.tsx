"use client";

import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  const router = useRouter();

  const getRawDataForDate = (date: string) => {
    const [monthStr, yearStr] = date.split(" ");

    if (!monthStr || !yearStr) {
      return undefined;
    }
    const month = new Date(`${monthStr} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr, 10);

    return creditScoreHistory.find((item) => {
      const itemDate = new Date(item.timestamp || item.date);
      return itemDate.getFullYear() === year && itemDate.getMonth() === month;
    });
  };

  const handleDotClick = (payload: any) => {
    const raw = getRawDataForDate(payload?.date);

    if (raw) {
      localStorage.setItem("selectedCreditScoreMonth", JSON.stringify(raw));

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

    return (
      <circle
        cx={cx}
        cy={cy}
        fill="#fff"
        r={6}
        stroke="#9E00F9"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onClick={() => handleDotClick(payload)}
      />
    );
  };

  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;

    return (
      <circle
        cx={cx}
        cy={cy}
        fill="#9E00F9"
        r={8}
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
                angle: -90,
                dx: -10,
                dy: 40,
                fill: "#F4F4F5",
                fontFamily: "Space Grotesk",
                fontSize: 14,
                position: "insideLeft",
                style: {
                  fill: "#F4F4F5",
                  fontFamily: "Space Grotesk",
                  fontSize: 14,
                },
                value: "Credit Score",
              }}
              tick={{
                fill: "#F4F4F5",
                fontFamily: "Space Grotesk",
                fontSize: 12,
              }}
              ticks={[100, 90, 80, 60, 40, 20, 0]}
            />
            <XAxis
              dataKey="date"
              label={{
                dy: 16,
                fill: "#F4F4F5",
                fontFamily: "Space Grotesk",
                fontSize: 14,
                position: "insideBottom",
                style: {
                  fill: "#F4F4F5",
                  fontFamily: "Space Grotesk",
                  fontSize: 14,
                },
                value: "Month",
              }}
              tick={{
                fill: "#F4F4F5",
                fontFamily: "Space Grotesk",
                fontSize: 12,
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
              activeDot={<CustomActiveDot />}
              dataKey="score"
              dot={<CustomDot />}
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
