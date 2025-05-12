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
  color = "#9E00F9",
  description,
  barClassName = "",
}) => {
  return (
    <div className="bg-[#18181B] rounded-xl p-5 flex-1 min-w-[320px] max-w-[500px] border border-[#27272A]">
      <div className="text-white text-base font-semibold mb-2">{label}</div>
      <div className="w-full flex items-center mb-2">
        <div className="w-full">
          <div className="h-3 w-full bg-[#232329] rounded-full overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${barClassName}`}
              style={{
                width: `${(value / max) * 100}%`,
                background: color,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="text-[#A1A1AA] text-sm mt-1">
        {value} / {max}
        {description && <span> – {description}</span>}
      </div>
    </div>
  );
};

export default ScoreProgress;
