import apiClient from "./client";

export interface ConnectPlatformPayload {
  creatorId: string;
  type: "YOUTUBE" | "PATREON" | "INSTAGRAM";
  handle: string;
}

export async function connectPlatform(payload: ConnectPlatformPayload) {
  // Use axios for consistent headers and CORS handling
  const response = await apiClient.post("/api/v1/platforms/connect", payload);
  return response.data;
}
