/**
 * Error handling utilities for consistent error management
 */

export class APIError extends Error {
  constructor(message, statusCode, originalError) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

export class ValidationError extends Error {
  constructor(message, fieldErrors = {}) {
    super(message);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

/**
 * Format Zod validation errors for display
 * @param {ZodError} zodError - Zod validation error
 * @returns {Object} Formatted errors { fieldName: errorMessage }
 */
export const formatValidationErrors = (zodError) => {
  const errors = {};
  
  if (zodError.errors) {
    zodError.errors.forEach(error => {
      const path = error.path.join('.');
      errors[path] = error.message;
    });
  }
  
  return errors;
};

/**
 * Extract user-friendly error message from various error types
 * @param {Error|AxiosError|string} error - Error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // String error
  if (typeof error === 'string') return error;
  
  // Axios error
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.status === 401) {
    return 'Unauthorized. Please log in again.';
  }
  
  if (error.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }
  
  if (error.response?.status === 404) {
    return 'Resource not found.';
  }
  
  if (error.response?.status === 409) {
    return 'This resource already exists.';
  }
  
  if (error.response?.status === 422) {
    return 'Invalid data provided.';
  }
  
  if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  // Generic error
  if (error.message) return error.message;
  
  return 'An unexpected error occurred';
};

/**
 * Log error for debugging (development only)
 * @param {Error} error - Error object
 * @param {string} context - Context/location of error
 */
export const logError = (error, context = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`❌ Error: ${context}`);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    if (error.response?.data) console.error('Response:', error.response.data);
    console.groupEnd();
  }
};

/**
 * Retry logic for failed API calls
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Max retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<any>} Result of function
 */
export const retryWithExponentialBackoff = async (
  fn,
  maxRetries = 3,
  delay = 1000
) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on 4xx errors (except 429 rate limit)
      if (error.response?.status >= 400 && error.response?.status !== 429) {
        throw error;
      }
      
      // Wait before retrying with exponential backoff
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};
