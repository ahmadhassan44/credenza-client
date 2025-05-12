"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { connectPlatform } from "@/services/api/platforms";

// Get the user's id from localStorage user object (set after login/signup)
const getCreatorId = () => localStorage.getItem("creatorId") || "";

export default function IncomeStreamsPage() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-[#18181b] rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Link Your YouTube Channel
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-white/80 font-medium">
          YouTube Channel Name
          <input
            className="mt-2 p-2 rounded bg-[#232326] text-white w-full"
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter your channel name"
            required
            type="text"
            value={handle}
          />
        </label>
        <Button className="mt-4" disabled={loading || !handle} type="submit">
          {loading ? "Linking..." : "Link YouTube"}
        </Button>
        {success && <div className="text-green-500 mt-2">{success}</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
