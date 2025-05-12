"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Modal, ModalContent } from "@heroui/react";

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
  const router = useRouter();

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
      setSuccess("YouTube channel linked successfully!");
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
              onClick={() => setShowModal(true)}
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
                      disabled={loading || !handle}
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
