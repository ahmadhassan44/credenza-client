"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { useRouter, useParams } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const PIE_COLORS = ["#9E00F9", "#303030"]; // Purple for score, dark grey for track
const FACTOR_WEIGHT_COLORS = ['#9E00F9', '#00A9F9', '#F9A000', '#00F955', '#7F00AD', '#5F0081', '#400055', '#20002B']; // Reordered for more initial visual distinction

export default function CreditScoreMonthPage() {
  const [creditScore, setCreditScore] = useState<any>(null);
  const router = useRouter();
  const params = useParams();
  const { month } = params;

  useEffect(() => {
    const raw = localStorage.getItem("selectedCreditScoreMonth");

    if (raw) {
      setCreditScore(JSON.parse(raw));
    }
  }, [month]);

  if (!creditScore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>No credit score data found for this month.</p>
        <button
          className="mt-4 px-4 py-2 bg-[#9E00F9] rounded text-white"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  const date = new Date(creditScore.timestamp || creditScore.date);
  const monthYear = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Overall Score Card */}
      <Card className="w-full bg-[#080808] text-white rounded-lg shadow-xl overflow-hidden"> {/* Changed bg */}
        <div className="p-6 bg-opacity-50 bg-black">
          <h2 className="text-3xl font-bold text-white text-center">
            Credit Score Details - {monthYear}
          </h2>
        </div>
        <div className="p-8 text-center">
          <p className="text-xl text-gray-300 mb-2">Overall Score</p>
          <p className="text-6xl font-bold text-white">
            {creditScore.overallScore}
          </p>
        </div>
      </Card>

      {/* Platform Scores Section */}
      {creditScore.platformScores &&
        creditScore.platformScores.map((platform: any, idx: number) => {
          const weightPieData = platform.factors.map((factor: any) => ({
            name: factor.factor,
            value: factor.weight * 100, // Assuming weight is 0-1, convert to percentage
          }));

          return (
            <Card
              key={platform.platformId || idx}
              className="w-full bg-[#080808] text-white rounded-lg shadow-xl overflow-hidden p-6 space-y-6" // Changed bg
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-100 mb-1">
                  Platform:{" "}
                  <span className="font-bold">{platform.platformType}</span>
                </h3>
                <p className="text-xl font-bold text-[#9E00F9]">
                  Platform Score: {platform.score}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platform.factors.map((factor: any, fidx: number) => {
                  const pieData = [
                    { name: factor.factor, value: factor.score },
                    { name: "Remaining", value: Math.max(0, 100 - factor.score) },
                  ];

                  return (
                    <Card
                      key={fidx}
                      className="bg-[#080808] rounded-lg p-4 shadow-md flex flex-col items-center text-center" // Changed bg
                    >
                      <h4 className="text-lg font-semibold text-gray-100 mb-3">
                        {factor.factor}
                      </h4>
                      <div style={{ width: "100%", height: 150 }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              cx="50%"
                              cy="50%"
                              data={pieData}
                              dataKey="value"
                              fill="#8884d8"
                              labelLine={false}
                              outerRadius={60}
                              innerRadius={45} // Doughnut style
                              cornerRadius={8} // Rounded ends
                            >
                              {pieData.map((entry, index) => (
                                <Cell
                                  key={`cell-factor-${fidx}-${index}`}
                                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                                  stroke="none" // Remove stroke
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#18181b",
                                border: "1px solid #333333",
                                borderRadius: "4px",
                              }}
                              itemStyle={{ color: "#fff" }}
                              formatter={(value: number, name: string) => {
                                if (name === "Remaining") return null; // Don't show 'Remaining' in tooltip
                                return [value, name];
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-3 w-full">
                        <p className="text-sm text-gray-300">Score</p>
                        <p className="text-3xl font-bold text-[#9E00F9] mb-2">
                          {factor.score}
                        </p>
                        <p className="text-sm text-gray-300">
                          Weight:{" "}
                          <span className="font-semibold">
                            {Math.round(factor.weight * 100)}%
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {factor.description}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* New Factor Weight Distribution Pie Chart */}
              {platform.factors && platform.factors.length > 0 && (
                <div className="mt-8 p-6 bg-[#080808] rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold text-gray-100 mb-4 text-center">
                    Factor Weight Distribution
                  </h4>
                  <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={weightPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          fill="#8884d8"
                          dataKey="value"
                          labelLine={false}
                          cornerRadius={5}
                        >
                          {weightPieData.map((entry, index) => (
                            <Cell
                              key={`cell-weight-${idx}-${index}`}
                              fill={FACTOR_WEIGHT_COLORS[index % FACTOR_WEIGHT_COLORS.length]}
                              stroke="none" // Remove stroke
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333333', borderRadius: '4px' }}
                          itemStyle={{ color: '#fff' }}
                          formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
                        />
                        <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{color: '#fff'}} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
    </div>
  );
}
