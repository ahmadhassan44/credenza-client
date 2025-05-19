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
import { dummyData } from "@/data/dummyData";

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
    rememberMe?: boolean
  ) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: "USER" | "CREATOR" | "ADMIN",
    location?: { latitude: number; longitude: number }
  ) => Promise<void>;
  logout: () => Promise<void>;
  testModeLogin: () => Promise<void>;
  guestLogin: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
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

      // Check for guest session if no token
      if (!token && typeof window !== "undefined") {
        const guestUser = localStorage.getItem("guestUser");

        if (guestUser) {
          setUser(JSON.parse(guestUser));
          setIsLoading(false);

          return;
        }
      }

      if (token) {
        try {
          // Fetch current user details using the authApi service
          const userData = await authApi.getCurrentUser();

          setUser(userData);
        } catch (error) {
          // If token is invalid or expired, clear it
          if (typeof window !== "undefined") {
            // Only remove tokens if the error is NOT a network error (i.e., actually unauthorized)
            if (
              error &&
              (error as any).response &&
              (error as any).response.status === 401
            ) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
            }
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
        localStorage.setItem("user", JSON.stringify(response.user));

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
    location?: { latitude: number; longitude: number }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the API to register the user. This step does not log the user in (no tokens returned here).
      // It stores basic user info from RegisterApiResponse to localStorage via authApi.register.
      await authApi.register({
        firstName,
        lastName,
        email,
        password,
        role,
        location,
      });

      // After successful registration, immediately call the login function.
      // This will fetch and store the accessToken and refreshToken,
      // and update the user state via setUser() inside the login function.
      await login(email, password, false); // Assuming rememberMe is false for auto-login after register

      // setIsLoading(false) is handled by the login function's success or error path.

    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "An error occurred during registration or subsequent login";

      setError(errorMessage);
      setIsLoading(false); // Ensure loading is stopped if registration or login fails
      throw error; // Re-throw the error to be handled by the calling component (e.g., form)
    }
    // Note: setIsLoading(false) should be managed within the try/catch/finally of this function
    // or within the login function if it's the last async operation.
    // Since login() handles its own setIsLoading, we only need to ensure it's false on error here.
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call logout API
      await authApi.logout();
    } catch {
      // API error during logout, continue with client-side logout
    } finally {
      // Clear tokens and user state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("guestUser"); // Clear guest session
      setUser(null);
      setIsLoading(false);

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
    // Use dummy data for guest session, matching User interface
    const [firstName, ...lastNameArr] = dummyData.user.fullName.split(" ");
    const lastName = lastNameArr.join(" ") || "Guest";
    const guestUser = {
      id: dummyData.user.id,
      email: dummyData.user.email,
      firstName,
      lastName,
      role: dummyData.user.role,
      creatorId: dummyData.creator.id,
    };

    setTimeout(() => {
      setUser(guestUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("guestUser", JSON.stringify(guestUser));
      }
      setIsLoading(false);
    }, 500);
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
    setUser,
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
