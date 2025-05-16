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

// Get all connected platforms for a creator
export async function fetchAllPlatforms(creatorId: string) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const response = await apiClient.get(
    `/platforms/creator?creatorId=${creatorId}`,
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

// Delete a connected platform by id
export async function deletePlatform(id: string) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const response = await apiClient.delete(
    `/platforms/${id}`,
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined
  );
  return response.data;
}
