import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Define API base URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

console.log("API URL: ", process.env.NEXT_PUBLIC_API_URL);

// Define a custom type for the request with _retry property
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Safe check if originalRequest exists and response status is 401
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });

          // Update stored tokens
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Retry the original request with the new token
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          return api(originalRequest);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_: unknown) {
        // Clear tokens on refresh failure and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

// User interfaces
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "CREATOR" | "ADMIN";
  creatorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "USER" | "CREATOR" | "ADMIN";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return !!token;
}

// Login user
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/v1/auth/login", {
    email: data.email,
    password: data.password,
    rememberMe: data.rememberMe || false,
  });

  // Store tokens and user data
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
}

// Register user
export async function register(
  data: RegisterData,
): Promise<{ message: string; user: User }> {
  const response = await api.post<{ message: string; user: User }>(
    "/api/v1/auth/register",
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role || "USER",
    },
  );

  return response.data;
}

// Get user profile
export async function getProfile(): Promise<User | null> {
  try {
    const response = await api.get<User>("/auth/profile");

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return null;
  }
}

// Refresh tokens
export async function refreshTokens(): Promise<AuthResponse | null> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return null;
    }

    const response = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    // Clear tokens on refresh failure
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    return null;
  }
}

// Logout user
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error: unknown) {
    console.error("Logout error:", error);
  } finally {
    // Always clear tokens and user data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

// Reset password
export async function resetPassword(
  token: string,
  password: string,
): Promise<void> {
  try {
    await api.post("/auth/reset-password", { token, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    throw new Error(
      "Password reset failed. The link may be invalid or expired.",
    );
  }
}

// Helper to get user from localStorage
export function getUser(): User | null {
  const userJson =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return null;
  }
}

// Export a consolidated auth service object
export const authService = {
  login,
  register,
  logout,
  getProfile,
  refreshTokens,
  isAuthenticated,
  getUser,
  getCurrentUser: getProfile, // Alias for compatibility with auth.context.tsx
  resetPassword,
};

export { api };
