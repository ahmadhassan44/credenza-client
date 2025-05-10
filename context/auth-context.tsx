'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/services/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'CREATOR' | 'ADMIN';
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
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  testModeLogin: () => Promise<void>;
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
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      if (token) {
        try {
          // Get the user from the API
          const userData = await authApi.getProfile();
          // If successful, set the authenticated state
          setUser(userData);
        } catch {
          // If not authenticated, clear the user data
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // No need to include user as it's not being read, only set

  // Register function
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.register({ firstName, lastName, email, password });
      
      // In this case, we're not logging in automatically after registration
      // The user will be redirected to the login page
      setIsLoading(false);
      router.push('/login?registered=true');
    } catch (error: unknown) {
      setIsLoading(false);
      const apiError = error as ApiError;
      setError(apiError.response?.data?.message || 'Failed to register. Please try again.');
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login({ email, password });
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      // Update user state
      setUser(response.user);
      setIsLoading(false);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error: unknown) {
      setIsLoading(false);
      const apiError = error as ApiError;
      setError(apiError.response?.data?.message || 'Invalid email or password. Please try again.');
      throw error;
    }
  };

  // Test Mode Login (for development)
  const testModeLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.testModeLogin();
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      // Update user state
      setUser(response.user);
      setIsLoading(false);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error: unknown) {
      setIsLoading(false);
      const apiError = error as ApiError;
      setError(apiError.response?.data?.message || 'Failed to login with test account.');
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call logout API
      await authApi.logout();
    } catch (error: unknown) {
      console.error('Logout API error:', error);
      // Continue with client-side logout even if API call fails
    } finally {
      // Clear tokens and user state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsLoading(false);
      
      // Redirect to login
      router.push('/login');
    }
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
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;