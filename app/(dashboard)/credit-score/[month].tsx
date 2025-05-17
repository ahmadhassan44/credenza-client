"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@heroui/react";
import { useRouter, useParams } from "next/navigation";

export default function CreditScoreMonthPage() {
  const [creditScore, setCreditScore] = useState<any>(null);
  const router = useRouter();
  const params = useParams();
  const { month } = params;

  useEffect(() => {
    // Retrieve the selected credit score from localStorage
    const raw = localStorage.getItem("selectedCreditScoreMonth");
    if (raw) {
      setCreditScore(JSON.parse(raw));
    }
  }, [month]);

  if (!creditScore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
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
    <div className="min-h-screen bg-black flex flex-col items-center py-8 px-2">
      <Card className="w-full max-w-2xl bg-[#18181b] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Credit Score Details - {monthYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="text-lg font-semibold">Overall Score: <span className="text-[#9E00F9]">{creditScore.overallScore}</span></div>
          </div>
          {creditScore.platformScores && creditScore.platformScores.map((platform: any, idx: number) => (
            <div key={platform.platformId || idx} className="mb-6">
              <div className="text-md font-semibold mb-2">Platform: {platform.platformType}</div>
              <div className="mb-2">Platform Score: <span className="text-[#9E00F9]">{platform.score}</span></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platform.factors.map((factor: any, fidx: number) => (
                  <div key={fidx} className="bg-[#232326] rounded p-4">
                    <div className="font-semibold">{factor.factor}</div>
                    <div>Score: <span className="text-[#9E00F9]">{factor.score}</span></div>
                    <div>Weight: {Math.round(factor.weight * 100)}%</div>
                    <div className="text-xs text-gray-400 mt-1">{factor.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <button
        className="mt-8 px-6 py-3 bg-[#9E00F9] text-white rounded-lg font-bold hover:bg-[#7a00c2] transition"
        onClick={() => router.back()}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
