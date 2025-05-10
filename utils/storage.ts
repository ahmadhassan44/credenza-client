/**
 * Utility functions for working with localStorage in a Next.js environment.
 * These functions handle the case where localStorage is not available
 * during server-side rendering.
 */

/**
 * Get an item from localStorage
 */
export function getLocalStorage(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);

    return null;
  }
}

/**
 * Set an item in localStorage
 */
export function setLocalStorage(key: string, value: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
}

/**
 * Remove an item from localStorage
 */
export function removeLocalStorage(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearLocalStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
