"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  ModalContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "../dashboard/sidebar";

import { Input } from "@/components/ui/input";
import { connectPlatform } from "@/services/api/platforms";

const getCreatorId = () => localStorage.getItem("creatorId") || "";

export const sidebarItems = [
  { label: "Profile" },
  { label: "Dashboard" },
  { label: "Income Streams", active: true },
  { label: "Credit Score" },
  { label: "Metrics & Analytics" },
  { label: "Fintech Tools" },
  { label: "Settings" },
  { label: "Logout" },
];

export default function IncomeStreamsPage() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState("Income Streams");
  const [showModal, setShowModal] = useState(false);
  const [metricsQuality, setMetricsQuality] = useState<string>("");
  const [hasMockData, setHasMockData] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("mockMetricsData");

    setHasMockData(!!data);
  }, []);

  const handleMockMetrics = async (creatorId: string, quality: string) => {
    const baseurl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/v1";

    const body = {
      creatorId,
      lastXMonths: 6,
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

    const response = await fetch(`${baseurl}/api/v1/mock/metric`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to generate mock metrics");

    const data = await response.json();

    localStorage.setItem("mockMetricsData", JSON.stringify(data));
    setHasMockData(true);

    // Store the fetched data in the data directory (server-side file)
    try {
      await fetch("/api/write-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics: data }),
      });
    } catch (e) {
      // Ignore file write errors in dev
      console.error("Failed to write metrics to file:", e);
    }

    return data;
  };

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
      await handleMockMetrics(creatorId, metricsQuality);
      setSuccess("YouTube channel linked and mock metrics generated!");
      setHandle("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
      case "Fintech Tools":
        router.push("/fintech-tools");
        break;
      case "Settings":
        router.push("/settings");
        break;
      case "Logout":
        break;
      default:
        break;
    }
  };

  const handleOpenModal = () => {
    if (hasMockData) {
      setShowConfirm(true);
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmReplace = () => {
    setShowConfirm(false);
    setShowModal(true);
  };

  const handleCancelReplace = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex w-full bg-black min-h-screen font-['Space_Grotesk']">
      <DashboardSidebar
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
          <Card className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl font-['Space_Grotesk']">
            <div className="mb-4">
              <div className="text-xl font-semibold mb-2">YouTube</div>
              <p className="mb-4 text-white/80">
                Connect your YouTube channel to start tracking your income,
                views, and audience growth. Get personalized insights and
                analytics for your creator journey.
              </p>
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleOpenModal}
            >
              Link YouTube Account
            </Button>
          </Card>
          <Card className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl opacity-70 font-['Space_Grotesk']">
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
          </Card>
          <Card className="bg-[#18181b] text-white flex flex-col justify-between shadow-lg p-6 rounded-xl opacity-70 font-['Space_Grotesk']">
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
          </Card>
        </div>
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalContent>
              <div className="bg-[#18181b] p-8 rounded-xl w-full max-w-md mx-auto font-['Space_Grotesk']">
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
                  {success && (
                    <div className="text-green-500 mt-2">{success}</div>
                  )}
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
              </div>
            </ModalContent>
          </Modal>
        )}
        {showConfirm && (
          <Modal isOpen={showConfirm} onClose={handleCancelReplace}>
            <ModalContent>
              <div className="bg-[#18181b] p-8 rounded-xl w-full max-w-md mx-auto font-['Space_Grotesk'] text-white">
                <div className="text-xl font-bold mb-4">
                  Replace Metrics Data?
                </div>
                <p className="mb-6">
                  Are you sure you want to disconnect the old data and retrieve
                  new data?
                </p>
                <div className="flex justify-end gap-2">
                  <Button className="bg-gray-700" onClick={handleCancelReplace}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleConfirmReplace}
                  >
                    Yes, Replace
                  </Button>
                </div>
              </div>
            </ModalContent>
          </Modal>
        )}
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
