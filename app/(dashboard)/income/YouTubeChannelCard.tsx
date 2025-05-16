import React from "react";
import { Button } from "@heroui/react";

interface YouTubeChannelCardProps {
  channel: any;
  loading: boolean;
  hasGeneratedMock: { [key: string]: boolean };
  metricsQuality: string;
  onGenerateMockMetrics: (connectionId: string, quality: string) => void;
  getPerformanceSummary: (channel: any) => React.ReactNode;
}

const YouTubeChannelCard: React.FC<YouTubeChannelCardProps> = ({
  channel,
  loading,
  hasGeneratedMock,
  metricsQuality,
  onGenerateMockMetrics,
  getPerformanceSummary,
}) => {
  const hasMetrics = channel.metrics && channel.metrics.length > 0;
  const channelKey = channel.connectionId || channel.platformId || channel.id;
  return (
    <div className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl font-['Space_Grotesk']">
      <div>
        <div className="text-lg font-bold mb-2">
          {channel.handle || channel.name || "YouTube Channel"}
        </div>
        <div className="mb-2 text-sm text-gray-400">
          Metrics Quality: <span className="font-semibold text-[#9E00F9]">{channel.metricsQuality || "-"}</span>
        </div>
        <div className="mb-2 text-sm text-gray-400">
          {hasMetrics ? `Metrics generated` : `No metrics yet`}
        </div>
        <div className="mb-2 text-sm">{getPerformanceSummary(channel)}</div>
      </div>
      <div className="mt-4">
        {!hasMetrics && !hasGeneratedMock[channelKey] ? (
          <button
            className="bg-[#9E00F9] hover:bg-[#7a00c2] text-white px-4 py-2 rounded font-bold w-full"
            disabled={loading || !channel.metricsQuality}
            onClick={() =>
              onGenerateMockMetrics(
                channelKey,
                channel.metricsQuality || metricsQuality,
              )
            }
          >
            Generate Mock Metrics
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-700 text-gray-400 px-4 py-2 rounded w-full cursor-not-allowed"
          >
            Metrics Generated
          </button>
        )}
      </div>
    </div>
  );
};

export default YouTubeChannelCard;
