import React from "react";
import ScoreProgress from "./ScoreProgress";

interface DashboardProgressBarsProps {
  consistency: number;
  engagement: number;
}

const DashboardProgressBars: React.FC<DashboardProgressBarsProps> = ({ consistency, engagement }) => (
  <div className="flex flex-row gap-6 w-full mt-2">
    <ScoreProgress
      color="#9E00F9"
      description="Based on upload frequency and schedule"
      label="Consistency Score"
      max={100}
      value={consistency}
    />
    <ScoreProgress
      color="#9E00F9"
      description="Avg engagement vs. audience size"
      label="Engagement Score"
      max={100}
      value={engagement}
    />
  </div>
);

export default DashboardProgressBars;
