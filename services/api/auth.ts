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

// Existing AuthResponse for login, refreshToken, etc.
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

// New interfaces for the register endpoint's response
interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "CREATOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

interface RegisteredUserData {
  user: UserDetails;
  creatorId?: string;
}

export interface RegisterApiResponse {
  message: string;
  user: RegisteredUserData;
  // Note: accessToken and refreshToken are not part of this response structure
}

// Authentication service
const authApi = {
  // Register a new user
  register: async (params: RegisterParams): Promise<RegisterApiResponse> => {
    const response = await apiClient.post("/auth/register", params);
    const data: RegisterApiResponse = response.data;
    // Save user info including creatorId to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user.user)); // Adjusted to access nested user object
      if (data.user.creatorId) {
        localStorage.setItem("creatorId", data.user.creatorId); // Adjusted to access nested creatorId
      }
      // accessToken and refreshToken are not expected in this response, so lines setting them are removed.
      // If tokens are needed immediately after registration, the API or client flow needs to handle that.
    }
    return data;
  },

  // Login with email and password
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", params);

    return response.data;
  },

  // Refresh an expired access token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/refresh", {
      refreshToken,
    });

    return response.data;
  },

  // Logout and invalidate tokens
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post("/auth/logout"); 

    return response.data;
  },

  // Get the current user's profile
  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  // For test mode - always logs in with predetermined credentials
  testModeLogin: async (): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", {
      
      email: "test@example.com",
      password: "password123",
    });

    return response.data;
  },

  // Update the current user's profile
  updateProfile: async (updates: Partial<RegisterParams & { password?: string }>): Promise<AuthResponse["user"]> => {
    const response = await apiClient.patch("/users/profile", updates);
    return response.data;
  },

  // Delete the current user's profile
  deleteProfile: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete("/users/profile");
    return response.data;
  },
};

export default authApi;
