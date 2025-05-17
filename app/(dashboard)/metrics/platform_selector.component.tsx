import { usePlatform } from "@/context/platform.context";
import React, { useEffect, useState } from "react";

interface PlatformSelectorProps {
  className?: string;
}

const Spinner = () => (
  <div
    className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
);

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ className }) => {
  const {
    platforms,
    selectedPlatform,
    setSelectedPlatform,
    loading,
    error,
    isInitialized,
  } = usePlatform();
  // Add local loading state to prevent flickering
  const [initializing, setInitializing] = useState(true);

  // Set initializing to false once we've done the initial fetch
  useEffect(() => {
    if (isInitialized || (!loading && platforms.length === 0)) {
      // Either we've fully initialized or we've completed loading with no platforms
      setInitializing(false);
    }
  }, [isInitialized, loading, platforms]);

  // Show loading state during first load
  if (initializing || loading) {
    return (
      <div className="bg-gray-800 border border-gray-700 h-10 rounded w-48 flex items-center justify-center gap-2 px-3">
        <Spinner />
        <span className="text-sm text-gray-300">Loading platforms...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-gray-800 border border-gray-700 rounded px-3 py-2">
        Error: {error}
      </div>
    );
  }

  if (platforms.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-400 text-sm flex items-center h-10">
        No platforms connected
      </div>
    );
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
