import React from "react";
import { Button } from "@heroui/react";

interface YouTubeChannelCardProps {
  channel: any;
  loading: boolean;
  hasGeneratedMock: { [key: string]: boolean };
  metricsQuality: string;
  onOpenMockMetricsModal: (connectionId: string) => void;
  getPerformanceSummary: (channel: any) => React.ReactNode;
  onDelete: (platformId: string) => void;
}

const YouTubeChannelCard: React.FC<YouTubeChannelCardProps> = ({
  channel,
  loading,
  hasGeneratedMock,
  // metricsQuality, // This prop was unused, consider removing if not needed
  onOpenMockMetricsModal,
  getPerformanceSummary,
  onDelete,
}) => {
  const hasMetrics = channel.metrics && channel.metrics.length > 0;
  const channelKey = channel.platformId || channel.connectionId || channel.id;

  return (
    <div className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl font-['Space_Grotesk']">
      <div>
        <div className="text-lg font-bold mb-2">
          {channel.handle || channel.name || "YouTube Channel"}
        </div>
        <div className="mb-2 text-sm text-gray-400">
          Metrics Quality:{" "}
          <span className="font-semibold text-[#9E00F9]">
            {channel.metricsQuality || "-"}
          </span>
        </div>
        <div className="mb-2 text-sm text-gray-400">
          {hasMetrics ? "Metrics generated" : "No metrics yet"}
        </div>
        <div className="mb-2 text-sm">{getPerformanceSummary(channel)}</div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {!hasMetrics && !hasGeneratedMock[channelKey] ? (
          <button
            className="bg-[#9E00F9] hover:bg-[#7a00c2] text-white px-4 py-2 rounded font-bold w-full"
            disabled={loading}
            onClick={() =>
              onOpenMockMetricsModal(
                channel.platformId || channel.connectionId || channel.id,
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
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold w-full"
          disabled={loading}
          onClick={() =>
            onDelete(channel.platformId || channel.id || channel.connectionId)
          }
        >
          Delete Channel
        </button>
      </div>
    </div>
  );
};

export default YouTubeChannelCard;
