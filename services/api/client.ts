import axios from "axios";

// Create an Axios instance with the base URL and default settings
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage if available
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    // If the token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from localStorage
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // No refresh token available, redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }

          return Promise.reject(error);
        }

        // Call the refresh token endpoint
        const response = await apiClient.post("/auth/refresh", {
          refreshToken,
        });

        // Get the new tokens
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update localStorage with new tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
