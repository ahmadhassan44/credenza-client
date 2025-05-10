import apiClient from "./client";

export interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "USER" | "CREATOR" | "ADMIN";
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "USER" | "CREATOR" | "ADMIN";
    creatorId?: string;
  };
}

// Authentication service
const authApi = {
  // Register a new user
  register: async (params: RegisterParams): Promise<AuthResponse> => {
    const response = await apiClient.post("api/v1/auth/register", params); // Removed duplicate /api/v1
    return response.data;
  },

  // Login with email and password
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post("api/v1/auth/login", params); // Removed duplicate /api/v1
    return response.data;
  },

  // Refresh an expired access token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post("api/v1/auth/refresh", { refreshToken }); // Removed duplicate /api/v1
    return response.data;
  },

  // Logout and invalidate tokens
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post("/auth/logout"); // Removed duplicate /api/v1
    return response.data;
  },

  // Get the current user's profile
  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response = await apiClient.post("/auth/profile"); // Removed duplicate /api/v1
    return response.data;
  },

  // For test mode - always logs in with predetermined credentials
  testModeLogin: async (): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", { // Removed duplicate /api/v1
      email: "test@example.com",
      password: "password123",
    });
    return response.data;
  },
};

export default authApi;