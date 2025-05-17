import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAllPlatforms } from "../services/api/platforms";
import { getCreatorId } from "@/app/(dashboard)/income/income-streams";

// Define the Platform interface based on your API response
export interface Platform {
  id: string;
  type: "YOUTUBE" | "PATREON" | "INSTAGRAM";
  handle: string;
  creatorId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PlatformContextType {
  platforms: Platform[];
  loading: boolean;
  error: string | null;
  selectedPlatform: Platform | null;
  setSelectedPlatform: (platform: Platform | null) => void;
  refreshPlatforms: (creatorId: string) => Promise<void>;
}

const PlatformContext = createContext<PlatformContextType | undefined>(
  undefined
);

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPlatforms = async (creatorId: string) => {
    if (!creatorId) {
      console.log("No creator ID provided to refreshPlatforms");
      setError("No creator ID available");
      return;
    }

    try {
      setLoading(true);
      console.log(`Fetching platforms for creator: ${creatorId}`);

      const data = await fetchAllPlatforms(creatorId);
      console.log(`Fetched platforms:`, data);

      setPlatforms(data || []);

      // Select the first platform by default if one exists and none is selected
      if (data && data.length > 0 && !selectedPlatform) {
        setSelectedPlatform(data[0]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching platforms:", err);
      setError(err instanceof Error ? err.message : "Failed to load platforms");
    } finally {
      setLoading(false);
    }
  };

  // Load platforms when the component mounts
  useEffect(() => {
    const creatorId = getCreatorId();
    console.log("Extracted creator ID from localStorage:", creatorId);

    if (creatorId) {
      refreshPlatforms(creatorId);
    } else {
      console.warn("No valid creator ID found in localStorage");
      setError("No creator ID found. Please log in again.");
    }
  }, []);

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        loading,
        error,
        selectedPlatform,
        setSelectedPlatform,
        refreshPlatforms,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
};
