// services/api/metrics.ts
import apiClient from "./client";

export interface MetricsRequestBody {
  creatorId: string;
  platformType: string;
  startDate: string;
  endDate: string;
}
export interface PlatformMetric {
  id: string;
  creatorId: string;
  date: string;
  views: number;
  audienceSize: number;
  postCount: number;
  avgViewDurationSec: number;
  engagementRatePct: number;
  estimatedRevenueUsd: number;
  adRevenueUsd: number;
  otherRevenueUsd: number;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}
export async function fetchYouTubeMetrics(body: MetricsRequestBody) {
  try {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    const headers: Record<string, string> = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Add header to bypass ngrok warning
    headers["ngrok-skip-browser-warning"] = "true";

    const response = await apiClient.get("/metrics", {
      params: body,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLatestCreditScore(creatorId: string) {
  try {
    const response = await apiClient.get(`/credit-scoring/latest/${creatorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCreditScoreHistory(creatorId: string) {
  try {
    const response = await apiClient.get(
      `/credit-scoring/history/${creatorId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function generateCreditScore(creatorId: string) {
  try {
    const response = await apiClient.post(
      `/credit-scoring/generate/${creatorId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchMetricsByPlatformId(platformId: string) {
  try {
    const queryParams = new URLSearchParams({
      platformId: platformId,
    });
    const response = await apiClient.get(`/metrics/?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
