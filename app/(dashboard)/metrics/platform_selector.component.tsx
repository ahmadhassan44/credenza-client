import { usePlatform } from "@/context/platform.context";
import React from "react";

interface PlatformSelectorProps {
  className?: string;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ className }) => {
  const { platforms, selectedPlatform, setSelectedPlatform, loading, error } =
    usePlatform();

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-700 h-10 rounded w-48">
        Loading platforms...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (platforms.length === 0) {
    return <div className="text-gray-400">No platforms connected</div>;
  }

  const getPlatformIcon = (type: string) => {
    switch (type) {
      case "YOUTUBE":
        return "🎥";
      case "PATREON":
        return "🎭";
      case "INSTAGRAM":
        return "📷";
      default:
        return "📊";
    }
  };

  return (
    <div className={className}>
      <label
        htmlFor="platform-selector"
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        Select Platform
      </label>
      <select
        id="platform-selector"
        value={selectedPlatform?.id || ""}
        onChange={(e) => {
          const platform =
            platforms.find((p) => p.id === e.target.value) || null;
          setSelectedPlatform(platform);
        }}
        className="bg-gray-800 border border-gray-600 text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {getPlatformIcon(platform.type)}{" "}
            {platform.type.charAt(0) + platform.type.slice(1).toLowerCase()}:{" "}
            {platform.handle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformSelector;
