"use client";

import { useMemo } from "react";
import { Card } from "@heroui/react";
import CreditScoreLineChart from "../dashboard/creditScoreLineChart";

interface CreditScoreFactor {
  factor: string;
  score: number;
  weight: number;
  description: string;
}

interface PlatformScore {
  platformId: string;
  platformType: string;
  score: number;
  factors: CreditScoreFactor[];
}

interface CreditScoreEntry {
  creatorId: string;
  overallScore: number;
  platformScores: PlatformScore[];
  timestamp: string;
}

interface CreditScoreDashboardProps {
  data: Record<string, CreditScoreEntry>;
}

export default function CreditScoreDashboard({ data }: CreditScoreDashboardProps) {
  // Prepare data for line chart and table
  const chartData = useMemo(() =>
    Object.values(data)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((entry) => ({
        date: new Date(entry.timestamp).toLocaleString("default", { month: "short", year: "numeric" }),
        score: entry.overallScore,
      })),
    [data]
  );

  const latest = useMemo(() => {
    const arr = Object.values(data);
    return arr.length > 0 ? arr[arr.length - 1] : null;
  }, [data]);

  return (
    <div
      className="flex flex-col gap-8 bg-black min-h-screen p-8 transition-all duration-300"
      style={{
        marginLeft: 'var(--sidebar-width, 15vw)',
        width: 'calc(100vw - var(--sidebar-width, 15vw))',
        minWidth: 0,
      }}
    >
      <h1 className="text-white text-4xl font-['Space_Grotesk'] font-bold mb-2">Credit Score Dashboard</h1>
      <p className="text-[#D4D4D8] text-lg mb-4">Overview of your credit score and contributing factors over time.</p>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <Card className="bg-[#9E00F9] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
          <div className="flex flex-col h-full justify-between p-3">
            <div>
              <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">Current Credit Score</p>
              <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                {latest?.overallScore ?? "-"}
              </p>
            </div>
            <p className="text-[#F4F4F5] text-sm font-['Inter'] leading-[14px]">Based on your audience, engagement, income, and more</p>
          </div>
        </Card>
        <Card className="bg-[#080808] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
          <div className="flex flex-col h-full justify-between p-3">
            <div>
              <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">Latest Platform</p>
              <p className="text-[#F4F4F5] text-lg font-['Space_Grotesk'] font-medium leading-7">
                {latest?.platformScores?.[0]?.platformType ?? "-"}
              </p>
            </div>
            <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">Platform-specific breakdown available below</p>
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-[#080808] rounded-xl p-6">
          <h2 className="text-[#F4F4F5] text-xl font-['Space_Grotesk'] mb-4">Credit Score Over Time</h2>
          <CreditScoreLineChart data={chartData} />
        </div>
        <div className="bg-[#080808] rounded-xl p-6">
          <h2 className="text-[#F4F4F5] text-xl font-['Space_Grotesk'] mb-4">Detailed Factor Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-[#F4F4F5]">
              <thead>
                <tr className="border-b border-[#222]"><th className="px-4 py-2">Month</th><th className="px-4 py-2">Platform</th><th className="px-4 py-2">Factor</th><th className="px-4 py-2">Score</th><th className="px-4 py-2">Weight</th><th className="px-4 py-2">Description</th></tr>
              </thead>
              <tbody>
                {Object.values(data)
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .flatMap((entry) =>
                    entry.platformScores.flatMap((platform) =>
                      platform.factors.map((factor, i) => (
                        <tr key={entry.timestamp + platform.platformId + i} className="border-b border-[#222]">
                          <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleString("default", { month: "short", year: "numeric" })}</td>
                          <td className="px-4 py-2">{platform.platformType}</td>
                          <td className="px-4 py-2">{factor.factor}</td>
                          <td className="px-4 py-2">{factor.score}</td>
                          <td className="px-4 py-2">{(factor.weight * 100).toFixed(0)}%</td>
                          <td className="px-4 py-2">{factor.description}</td>
                        </tr>
                      ))
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
