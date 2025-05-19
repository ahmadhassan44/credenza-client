"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import Sidebar from "../sidebar";

import SimpleModal from "./SimpleModal";
import YouTubeChannelCard from "./YouTubeChannelCard";
import { sidebarItems } from "./sidebarItems";
import { getPerformanceSummary } from "./helpers";

import { Input } from "@/components/ui/input";
import {
  connectPlatform,
  fetchAllPlatforms,
  deletePlatform,
} from "@/services/api/platforms";
import apiClient from "@/services/api/client";
import { usePlatform } from "@/context/platform.context";

export const getCreatorId = () => {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.creatorId || "";
  }
  return "";
};

export default function IncomeStreamsPage() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState("Income Streams");
  const [showModal, setShowModal] = useState(false);
  const [metricsQuality, setMetricsQuality] = useState<string>("");
  const [linkedChannels, setLinkedChannels] = useState<any[]>([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // for refetching
  const [hasGeneratedMock, setHasGeneratedMock] = useState<{
    [key: string]: boolean;
  }>({});
  const [allPlatforms, setAllPlatforms] = useState<any[]>([]);
  const [qualityModalOpen, setQualityModalOpen] = useState(false);
  const [qualityChannelKey, setQualityChannelKey] = useState<string | null>(
    null
  );
  const [qualityLoading, setQualityLoading] = useState(false);
  const { setSelectedPlatform } = usePlatform();
  const router = useRouter();

  // Helper: fetch metrics for a channel
  const fetchChannelMetrics = async (creatorId: string, platformId: string) => {
    try {
      const res = await apiClient.get("/metrics", {
        params: {
          creatorId,
          platformType: "YOUTUBE",
          platformId,
        },
      });

      return res.data || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      setChannelsLoading(true);
      try {
        const creatorId = getCreatorId();
        const platforms = await fetchAllPlatforms(creatorId);

        setAllPlatforms(Array.isArray(platforms) ? platforms : []);

        const youtubeChannels = Array.isArray(platforms)
          ? platforms.filter((ch) => ch.type === "YOUTUBE")
          : [];

        const channelsWithMetrics = await Promise.all(
          youtubeChannels.map(async (ch) => {
            const metrics = await fetchChannelMetrics(
              creatorId,
              ch.platformId || ch.id || ch.connectionId
            );

            let quality = ch.metricsQuality;

            if (!quality && metrics.length > 0 && metrics[0].metricsQuality) {
              quality = metrics[0].metricsQuality;
            }

            return { ...ch, metrics, metricsQuality: quality };
          })
        );

        setLinkedChannels(channelsWithMetrics);
      } catch {
        setLinkedChannels([]);
        setAllPlatforms([]);
      } finally {
        setChannelsLoading(false);
      }
    };

    fetchChannels();
  }, [refreshKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mockMetricsGenerated");

      if (stored) {
        setHasGeneratedMock(JSON.parse(stored));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const creatorId = getCreatorId();
    try {
      await connectPlatform({
        creatorId,
        type: "YOUTUBE",
        handle,
      });
      setSuccess("YouTube channel linked! Now generate mock metrics.");
      setHandle("");
      setShowModal(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      if (
        err?.response?.status === 409 &&
        err?.response?.data?.message === "Platform already connected"
      ) {
        setError("This YouTube channel is already connected.");
      } else if (err?.response?.status === 401) {
        setError("Session expired. Please log in again.");
        setTimeout(() => setRefreshKey((k) => k + 1), 2000);
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMockMetrics = async (connectionId: string) => {
    if (hasGeneratedMock[connectionId]) return;
    setQualityChannelKey(connectionId);
    setQualityModalOpen(true);
  };

  const handleGenerateWithQuality = async (quality: string) => {
    if (!qualityChannelKey) return;
    setQualityLoading(true);
    setSuccess("");
    setError("");
    const baseurl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const platform = allPlatforms.find(
      (p) =>
        p.connectionId === qualityChannelKey ||
        p.platformId === qualityChannelKey ||
        p.id === qualityChannelKey
    );
    const platformId =
      platform?.platformId || platform?.id || qualityChannelKey;
    const body = {
      creatorId: getCreatorId(),
      lastXMonths: 6,
      platformId,
      platformType: "YOUTUBE",
      metricsQuality: quality,
    };
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
    try {
      const response = await fetch(`${baseurl}/mock/metric`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Failed to generate mock metrics");
      setSuccess("Mock metrics generated!");
      setHasGeneratedMock((prev) => ({
        ...prev,
        [qualityChannelKey]: true,
      }));
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "mockMetricsGenerated",
          JSON.stringify({ ...hasGeneratedMock, [qualityChannelKey]: true })
        );
      }
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setQualityLoading(false);
      setQualityModalOpen(false);
    }
  };

  const handleDeletePlatform = async (platformId: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await deletePlatform(platformId);
      setSuccess("Platform deleted successfully.");
      setRefreshKey((k) => k + 1); // Refresh the list of channels
    } catch (err: any) {
      setError(err.message || "Failed to delete platform. Please try again.");
      if (err?.response?.status === 401) {
        setError("Session expired. Please log in again.");
        // router.push("/login"); // or trigger a re-login flow
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = (label: string) => {
    setActive(label);
    switch (label) {
      case "Profile":
        router.push("/profile");
        break;
      case "Dashboard":
        router.push("/dashboard");
        break;
      case "Income Streams":
        router.push("/income");
        break;
      case "Credit Score":
        router.push("/credit-score");
        break;
      case "Metrics & Analytics":
        router.push("/metrics");
        break;
      case "Logout":
        // Handle logout logic if needed, e.g., clear localStorage, redirect
        break;
      default:
        break;
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Show onboarding if no platforms of any type are connected
  if (!channelsLoading && allPlatforms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
        <Sidebar
          active={active}
          setActive={handleSetActive}
          sidebarItems={sidebarItems}
          sidebarWidth="15vw"
        />
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xl mx-auto">
          <div className="bg-[#18181b] rounded-xl shadow-lg p-8 w-full text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk']">
              Link Your First Platform
            </h2>
            <p className="text-lg text-white/80 mb-6 font-['Space_Grotesk']">
              Connect your YouTube or Patreon account to start tracking your
              income streams and metrics.
            </p>
            <button
              className="inline-block bg-[#9E00F9] hover:bg-[#7a00c2] px-6 py-3 rounded-xl font-bold text-lg text-white transition-colors duration-200"
              type="button"
              onClick={handleOpenModal}
            >
              Connect Platform
            </button>
          </div>
        </main>
        <SimpleModal open={showModal} onClose={() => setShowModal(false)}>
          <div className="text-2xl font-bold mb-4 text-white">
            Link Your YouTube Channel
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label
              className="text-white/80 font-medium"
              htmlFor="youtube-handle"
            >
              YouTube Channel Name
              <Input
                required
                className="mt-2 p-2 rounded bg-[#232326] text-white w-full"
                id="youtube-handle"
                placeholder="Enter your channel name"
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </label>
            <label
              className="text-white/80 font-medium"
              htmlFor="metrics-quality"
            >
              Metrics Quality
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="mt-2 w-full text-white bg-[#232326] font-['Space_Grotesk'] justify-between"
                    variant="flat"
                  >
                    {metricsQuality || "Select quality"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Metrics Quality"
                  className="bg-[#232326] text-white font-['Space_Grotesk']"
                  selectedKeys={metricsQuality ? [metricsQuality] : []}
                  variant="flat"
                  onAction={(key) => setMetricsQuality(key as string)}
                >
                  <DropdownItem key="BAD" variant="flat">
                    BAD
                  </DropdownItem>
                  <DropdownItem key="NORMAL" variant="flat">
                    NORMAL
                  </DropdownItem>
                  <DropdownItem key="GOOD" variant="flat">
                    GOOD
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </label>
            {success && <div className="text-green-500 mt-2">{success}</div>}
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="bg-gray-700"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={loading || !handle || !metricsQuality}
                type="submit"
              >
                {loading ? "Linking..." : "Link YouTube"}
              </Button>
            </div>
          </form>
        </SimpleModal>
      </div>
    );
  }

  const handleViewMetrics = (channel: any) => {
    setSelectedPlatform(channel);
    router.push("/metrics");
  };

  return (
    <div className="flex w-full bg-black min-h-screen font-['Space_Grotesk']">
      <Sidebar
        active={active}
        setActive={handleSetActive}
        sidebarItems={sidebarItems}
        sidebarWidth="15vw"
      />
      <main
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 font-['Space_Grotesk']"
        style={{ marginLeft: "15vw" }}
      >
        <h2 className="text-3xl font-bold mb-8 text-white text-center font-['Space_Grotesk']">
          Link Your Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {channelsLoading ? (
            <div className="col-span-3 flex justify-center items-center min-h-[180px]">
              <span className="text-white/70">Loading channels...</span>
            </div>
          ) : linkedChannels.length > 0 ? (
            linkedChannels.map((channel) => (
              <YouTubeChannelCard
                key={channel.platformId || channel.connectionId || channel.id}
                channel={channel}
                getPerformanceSummary={getPerformanceSummary}
                hasGeneratedMock={hasGeneratedMock}
                loading={loading || qualityLoading}
                metricsQuality={channel.metricsQuality || "-"}
                onDelete={handleDeletePlatform}
                onOpenMockMetricsModal={(connectionId) =>
                  handleGenerateMockMetrics(connectionId)
                }
                onViewMetrics={handleViewMetrics} // Add this prop
              />
            ))
          ) : (
            <div className="col-span-3 flex justify-center items-center min-h-[180px]">
              <span className="text-white/70">
                No YouTube channels linked yet.
              </span>
            </div>
          )}
          {/* Patreon Card */}
          <div className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl opacity-70 font-['Space_Grotesk']">
            <div className="mb-4">
              <div className="text-xl font-semibold mb-2">Patreon</div>
              <p className="mb-4 text-white/80">
                Patreon integration is coming soon! Soon you&apos;ll be able to
                link your Patreon account and view your supporter analytics and
                income data here.
              </p>
            </div>
            <Button disabled className="w-full bg-gray-700 cursor-not-allowed">
              Coming Soon
            </Button>
          </div>
          {/* Instagram Card */}
          <div className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl opacity-70 font-['Space_Grotesk']">
            <div className="mb-4">
              <div className="text-xl font-semibold mb-2">Instagram</div>
              <p className="mb-4 text-white/80">
                Instagram integration is coming soon! Track your Instagram
                audience, engagement, and earnings in one place.
              </p>
            </div>
            <Button disabled className="w-full bg-gray-700 cursor-not-allowed">
              Coming Soon
            </Button>
          </div>
          {/* Add Channel Card */}
          <div
            className="bg-[#18181b] text-white flex flex-col justify-center items-center shadow-lg p-6 rounded-xl cursor-pointer hover:bg-[#232326] transition-colors duration-200 min-h-[280px] md:min-h-[320px]"
            role="button"
            tabIndex={0}
            onClick={handleOpenModal}
            onKeyDown={(e) => e.key === "Enter" && handleOpenModal()}
          >
            <div className="flex flex-col items-center justify-center h-full w-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9E00F9] bg-opacity-20 mb-2">
                <svg
                  className="text-[#9E00F9]"
                  fill="none"
                  height="32"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <span className="text-[#9E00F9] font-semibold">
                Add YouTube Channel
              </span>
            </div>
          </div>
        </div>
        {/* Modal for adding YouTube channel */}
        <SimpleModal open={showModal} onClose={() => setShowModal(false)}>
          <div className="text-2xl font-bold mb-4 text-white">
            Link Your YouTube Channel
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label
              className="text-white/80 font-medium"
              htmlFor="youtube-handle"
            >
              YouTube Channel Name
              <Input
                required
                className="mt-2 p-2 rounded bg-[#232326] text-white w-full"
                id="youtube-handle"
                placeholder="Enter your channel name"
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </label>
            <label
              className="text-white/80 font-medium"
              htmlFor="metrics-quality"
            >
              Metrics Quality
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="mt-2 w-full text-white bg-[#232326] font-['Space_Grotesk'] justify-between"
                    variant="flat"
                  >
                    {metricsQuality || "Select quality"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Metrics Quality"
                  className="bg-[#232326] text-white font-['Space_Grotesk']"
                  selectedKeys={metricsQuality ? [metricsQuality] : []}
                  variant="flat"
                  onAction={(key) => setMetricsQuality(key as string)}
                >
                  <DropdownItem key="BAD" variant="flat">
                    BAD
                  </DropdownItem>
                  <DropdownItem key="NORMAL" variant="flat">
                    NORMAL
                  </DropdownItem>
                  <DropdownItem key="GOOD" variant="flat">
                    GOOD
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </label>
            {success && <div className="text-green-500 mt-2">{success}</div>}
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="bg-gray-700"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={loading || !handle || !metricsQuality}
                type="submit"
              >
                {loading ? "Linking..." : "Link YouTube"}
              </Button>
            </div>
          </form>
        </SimpleModal>
        {/* Modal for selecting metrics quality */}
        <SimpleModal
          open={qualityModalOpen}
          onClose={() => setQualityModalOpen(false)}
        >
          <div className="text-2xl font-bold mb-4 text-white">
            Select Metrics Quality
          </div>
          <div className="flex flex-col gap-4">
            {["GOOD", "NORMAL", "BAD"].map((q) => (
              <button
                key={q}
                className="bg-[#9E00F9] hover:bg-[#7a00c2] text-white px-4 py-2 rounded font-bold w-full disabled:bg-gray-700 disabled:cursor-not-allowed"
                disabled={qualityLoading}
                onClick={() => handleGenerateWithQuality(q)}
              >
                {qualityLoading ? `Generating ${q}...` : q}
              </button>
            ))}
            {qualityLoading && (
              <div className="text-white mt-2 text-center">Generating...</div>
            )}
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-500 mt-2">{success}</div>}
          </div>
        </SimpleModal>
        <div className="mt-12 max-w-3xl text-center text-white/80 font-['Space_Grotesk']">
          <h3 className="text-xl font-semibold mb-2">
            Why Link Your Accounts?
          </h3>
          <p className="mb-2">
            Linking your creator accounts allows Credenza to provide you with
            real-time analytics, income tracking, and actionable insights to
            help you grow your business. Your data is secure and only used to
            enhance your dashboard experience.
          </p>
          <p>More platforms and features are coming soon. Stay tuned!</p>
        </div>
      </main>
    </div>
  );
}
