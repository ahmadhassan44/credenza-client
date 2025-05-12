"use client";
import { useState } from "react";
import { Button } from "@heroui/react";

// TODO: Replace with your actual method of getting the current user's creatorId
const getCreatorId = () => {
  // Example: from localStorage, context, or props
  return localStorage.getItem("creatorId") || "";
};

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
      const res = await fetch("/platforms/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId,
          type: "YOUTUBE",
          handle,
        }),
      });
      if (!res.ok) throw new Error("Failed to link YouTube channel");
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
      <h2 className="text-2xl font-bold mb-6 text-white">Link Your YouTube Channel</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-white/80 font-medium">
          YouTube Channel Name
          <input
            type="text"
            className="mt-2 p-2 rounded bg-[#232326] text-white w-full"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            required
            placeholder="Enter your channel name"
          />
        </label>
        <Button type="submit" disabled={loading || !handle} className="mt-4">
          {loading ? "Linking..." : "Link YouTube"}
        </Button>
        {success && <div className="text-green-500 mt-2">{success}</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
