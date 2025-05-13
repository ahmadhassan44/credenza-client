import apiClient from "./client";

export interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "USER" | "CREATOR" | "ADMIN";
  location?: { latitude: number; longitude: number };
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
    const response = await apiClient.post("api/v1/auth/register", params);
    const data = response.data;
    // Save user info including creatorId to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      if (data.user.creatorId) {
        localStorage.setItem("creatorId", data.user.creatorId);
      }
    }
    return data;
  },

  // Login with email and password
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post("api/v1/auth/login", params);

    return response.data;
  },

  // Refresh an expired access token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post("api/v1/auth/refresh", {
      refreshToken,
    });

    return response.data;
  },

  // Logout and invalidate tokens
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post("/api/v1/auth/logout"); 

    return response.data;
  },

  // Get the current user's profile
  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response = await apiClient.get("/api/v1/users/profile");
    return response.data;
  },

  // For test mode - always logs in with predetermined credentials
  testModeLogin: async (): Promise<AuthResponse> => {
    const response = await apiClient.post("api/v1/auth/login", {
      
      email: "test@example.com",
      password: "password123",
    });

    return response.data;
  },

  // Update the current user's profile
  updateProfile: async (updates: Partial<RegisterParams & { password?: string }>): Promise<AuthResponse["user"]> => {
    const response = await apiClient.patch("/api/v1/users/profile", updates);
    return response.data;
  },

  // Delete the current user's profile
  deleteProfile: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete("/api/v1/users/profile");
    return response.data;
  },
};

export default authApi;
