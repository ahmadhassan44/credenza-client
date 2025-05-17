import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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
  isInitialized: boolean;
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
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshPlatforms = useCallback(
    async (creatorId: string) => {
      if (!creatorId) {
        console.log("No creator ID provided to refreshPlatforms");
        setError("No creator ID available");
        return;
      }

      // Check if we have an access token before making the request
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!accessToken) {
        console.log("No access token available, skipping platform fetch");
        setError("Authentication required");
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
        setIsInitialized(true);
      } catch (err) {
        console.error("Error fetching platforms:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load platforms"
        );
      } finally {
        setLoading(false);
      }
    },
    [selectedPlatform]
  );

  // Don't automatically fetch on mount - this will be triggered by individual pages
  // when they need platforms data and can confirm the user is authenticated

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        loading,
        error,
        selectedPlatform,
        setSelectedPlatform,
        refreshPlatforms,
        isInitialized,
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
