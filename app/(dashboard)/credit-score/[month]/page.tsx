"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { useRouter, useParams } from "next/navigation";

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
  const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <Card className="w-full max-w-2xl bg-[#18181b] text-white rounded-lg shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            Credit Score Details - {monthYear}
          </h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="text-lg font-semibold">
              Overall Score:{" "}
              <span className="text-[#9E00F9]">{creditScore.overallScore}</span>
            </div>
          </div>
          {creditScore.platformScores &&
            creditScore.platformScores.map((platform: any, idx: number) => (
              <div key={platform.platformId || idx} className="mb-6">
                <div className="text-md font-semibold mb-2 text-gray-300">
                  Platform:{" "}
                  <span className="text-gray-100">
                    {platform.platformType}
                  </span>
                </div>
                <div className="mb-4">
                  Platform Score:{" "}
                  <span className="text-[#9E00F9]">{platform.score}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platform.factors.map((factor: any, fidx: number) => (
                    <div
                      key={fidx}
                      className="bg-[#232326] rounded-lg p-4 shadow"
                    >
                      <div className="font-semibold text-gray-100">
                        {factor.factor}
                      </div>
                      <div className="text-sm">
                        Score:{" "}
                        <span className="text-[#9E00F9]">{factor.score}</span>
                      </div>
                      <div className="text-sm">
                        Weight:{" "}
                        <span className="text-gray-300">
                          {Math.round(factor.weight * 100)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {factor.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
