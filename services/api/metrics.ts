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
    const response = await apiClient.get("/metrics", { params: body });
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
      `/credit-scoring/history/${creatorId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function generateCreditScore(creatorId: string) {
  try {
    const response = await apiClient.post(`/credit-scoring/generate/${creatorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
