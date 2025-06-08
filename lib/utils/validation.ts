/**
 * Validation utility functions
 */

export const validation = {
  /**
   * Check if email is valid
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Check if string is not empty after trimming
   */
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0;
  },

  /**
   * Check if string meets minimum length requirement
   */
  hasMinLength: (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  },

  /**
   * Check if string meets maximum length requirement
   */
  hasMaxLength: (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
  },

  /**
   * Validate URL format
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
}; 