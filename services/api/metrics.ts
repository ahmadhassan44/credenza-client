// services/api/metrics.ts
import apiClient from "./client";

export interface MetricsRequestBody {
  creatorId: string;
  platformType: string;
  startDate: string;
  endDate: string;
}

export async function fetchYouTubeMetrics(body: MetricsRequestBody) {
  try {
    const response = await apiClient.get("/api/v1/metrics", { params: body });
    return response.data;
  } catch (error) {
    console.error("Error fetching YouTube metrics:", error);
    throw error;
  }
}
