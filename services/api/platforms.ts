import apiClient from "./client";

export interface ConnectPlatformPayload {
  creatorId: string;
  type: "YOUTUBE" | "PATREON" | "INSTAGRAM";
  handle: string;
}

export async function connectPlatform(payload: ConnectPlatformPayload) {
  // Attach access token from localStorage if present
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const response = await apiClient.post(
    "/platforms/connect",
    payload,
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined
  );
  return response.data;
}

// Get all connected platforms (ADMIN only)
export async function fetchAllPlatforms() {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const response = await apiClient.get(
    "/platforms",
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined
  );
  return response.data;
}

// Manually trigger metrics refresh for a platform (CREATOR or ADMIN)
export async function refreshPlatform(id: string) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const response = await apiClient.post(
    `/platforms/${id}/refresh`,
    {},
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined
  );
  return response.data;
}
