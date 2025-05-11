"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { authApi } from "@/services/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "CREATOR" | "ADMIN";
  creatorId?: string;
}

// Define a type for API errors
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: "USER" | "CREATOR" | "ADMIN",
  ) => Promise<void>;
  logout: () => Promise<void>;
  testModeLogin: () => Promise<void>;
  guestLogin: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check for existing token and fetch user data on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      if (token) {
        try {
          // Fetch current user details using the authApi service
          const userData = await authApi.getCurrentUser();

          setUser(userData);
        } catch (error) {
          // If token is invalid or expired, clear it
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          setError("Session expired. Please login again.");
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login({ email, password });

      const { accessToken, refreshToken, user } = response;

      // Store tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Store user email if remember me is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      }

      // Update user state
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "An error occurred during login";

      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "USER" | "CREATOR" | "ADMIN" = "USER",
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.register({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      const { accessToken, refreshToken, user } = response;

      // Store tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Update user state
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "An error occurred during registration";

      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call logout API
      await authApi.logout();
    } catch (error: unknown) {
      console.error("Logout API error:", error);
      // Continue with client-side logout even if API call fails
    } finally {
      // Clear tokens and user state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsLoading(false);

      // Redirect to login
      router.push("/login");
    }
  };

  // For testing purposes - logs in with a test account
  const testModeLogin = async () => {
    try {
      const response = await authApi.testModeLogin();

      const { accessToken, refreshToken, user } = response;

      // Store tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Update user state
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "An error occurred during test login";

      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  // Guest login for frontend-only development (no backend required)
  const guestLogin = async () => {
    setIsLoading(true);
    setError(null);
    // Simulate a guest user
    const guestUser = {
      id: "guest",
      email: "guest@credenza.app",
      firstName: "Guest",
      lastName: "User",
      role: "CREATOR" as const,
    };
    setTimeout(() => {
      setUser(guestUser);
      setIsLoading(false);
    }, 500); // Simulate async delay
  };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    register,
    logout,
    testModeLogin,
    guestLogin, // <-- add guestLogin to context
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
