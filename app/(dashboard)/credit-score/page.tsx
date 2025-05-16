"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../sidebar";
import { sidebarItems } from "../income/income-streams";
import SkeletonLoader from "../skeleton-loader";
import CreditScoreDashboard from "./CreditScoreDashboard";

const mockCreditScoreData = {
  "0": {
    creatorId: "e0583f69-0220-4ccd-8cac-154b1f4b0b85",
    overallScore: 30,
    platformScores: [
      {
        platformId: "828be5f3-f8d3-427a-8365-fa8602edd5b3",
        platformType: "YOUTUBE",
        score: 30,
        factors: [
          { factor: "Audience Size", score: 40, weight: 0.2, description: "Based on audience of 3648" },
          { factor: "Engagement", score: 30, weight: 0.3, description: "Based on engagement rate of 0.9%" },
          { factor: "Income Level", score: 10, weight: 0.2, description: "Based on monthly revenue of $2.00" },
          { factor: "Income Stability", score: 0, weight: 0.15, description: "Strong declining trend (-20%) (CV: 81.9%)" },
          { factor: "View Duration", score: 70, weight: 0.15, description: "Based on avg view duration of 3 minutes" },
        ],
      },
    ],
    timestamp: "2025-05-01T00:00:00.000Z",
  },
};

export default function CreditScorePage() {
  const [active, setActive] = useState("Credit Score");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetActive = (label: string) => {
    setActive(label);
    setLoading(true);
    switch (label) {
      case "Profile":
        router.push("/profile");
        break;
      case "Dashboard":
        router.push("/dashboard");
        break;
      case "Income Streams":
        router.push("/income");
        break;
      case "Credit Score":
        router.push("/credit-score");
        break;
      case "Metrics & Analytics":
        router.push("/metrics");
        break;
      case "Fintech Tools":
        router.push("/fintech-tools");
        break;
      case "Settings":
        router.push("/settings");
        break;
      case "Logout":
        break;
      default:
        break;
    }
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="flex w-full bg-black min-h-screen" style={{
      // Default sidebar width, can be changed for collapsibility
      ['--sidebar-width' as any]: '15vw',
    }}>
      <DashboardSidebar
        active={active}
        setActive={handleSetActive}
        sidebarItems={sidebarItems}
      />
      <div className="flex-1 min-w-0">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <CreditScoreDashboard data={mockCreditScoreData} />
        )}
      </div>
    </div>
  );
}
