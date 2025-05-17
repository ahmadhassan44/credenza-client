"use client";

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CreditScoreSummaryProps {
  scoreData: {
    overallScore: number;
    timestamp: string;
  };
}

const CreditScoreSummary: React.FC<CreditScoreSummaryProps> = ({ scoreData }) => {
  const { overallScore, timestamp } = scoreData;
  
  // Format the timestamp
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4ADE80'; // Green for high scores
    if (score >= 60) return '#FACC15'; // Yellow for medium scores
    return '#F87171'; // Red for low scores
  };

  const scoreColor = getScoreColor(overallScore);

  return (
    <div className="bg-[#18181b] rounded-xl p-6 mb-6 shadow-lg">
      <h2 className="text-white text-xl font-['Space_Grotesk'] font-bold mb-4">Credit Score Summary</h2>
      
      <div className="flex flex-col items-center my-6">
        <div className="w-48 h-48">
          <CircularProgressbar
            value={overallScore}
            maxValue={100}
            text={`${overallScore}`}
            styles={buildStyles({
              textSize: '22px',
              textColor: 'white',
              pathColor: scoreColor,
              trailColor: '#27272A'
            })}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-[#D4D4D8] text-sm">Last Updated: {formattedDate}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-[#A1A1AA] text-sm">Poor</span>
          <span className="text-[#A1A1AA] text-sm">Excellent</span>
        </div>
        <div className="h-2 w-full bg-[#27272A] rounded-full">
          <div 
            className="h-full rounded-full" 
            style={{ 
              width: `${overallScore}%`,
              background: `linear-gradient(90deg, #6E21DB 0%, #9E00F9 100%)` 
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[#A1A1AA] text-xs">0</span>
          <span className="text-[#A1A1AA] text-xs">100</span>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreSummary;
