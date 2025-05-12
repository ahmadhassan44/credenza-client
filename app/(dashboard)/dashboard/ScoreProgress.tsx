import { Progress } from "@heroui/react";
import React from "react";

interface ScoreProgressProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  description?: string;
  barClassName?: string;
}

const ScoreProgress: React.FC<ScoreProgressProps> = ({
  label,
  value,
  max = 100,
  color = "#181C23",
  description,
  barClassName = "",
}) => {
  return (
    <div className="bg-white rounded-xl p-4 flex-1 min-w-[320px] max-w-[500px] shadow-sm border border-[#E5E7EB]">
      <div className="font-semibold text-gray-900 text-base mb-2">{label}</div>
      <Progress
        value={value}
        max={max}
        className="h-3 rounded-full bg-[#F1F3F6]"
        barClassName={`rounded-full transition-all duration-500 ${barClassName}`}
        style={{ backgroundColor: "#F1F3F6" }}
        barStyle={{ backgroundColor: color }}
      />
      <div className="mt-2 text-sm text-gray-600">
        {value} / {max}
        {description && <span> – {description}</span>}
      </div>
    </div>
  );
};

export default ScoreProgress;
