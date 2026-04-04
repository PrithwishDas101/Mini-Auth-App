/**
 * Story Service - API abstraction layer for story CRUD operations
 * Handles all story-related API calls with error handling and loading states
 */

import axios from 'axios';
import { retryWithExponentialBackoff, logError } from './errors.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Get all published stories (paginated, public)
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Stories per page
 * @param {string} sort - Sort field (date, title)
 * @returns {Promise<Object>} { stories, total, page, pages }
 */
export const getStories = async (page = 1, limit = 12, sort = '-createdAt') => {
  try {
    const response = await retryWithExponentialBackoff(() =>
      api.get('/stories', {
        params: { page, limit, sort },
      })
    );
    return response.data;
  } catch (error) {
    logError(error, 'getStories');
    throw error;
  }
};

/**
 * Get a single story by ID
 * @param {string} storyId - Story ID
 * @returns {Promise<Object>} Story object
 */
export const getStoryById = async (storyId) => {
  try {
    const response = await api.get(`/stories/${storyId}`);
    return response.data;
  } catch (error) {
    logError(error, 'getStoryById');
    throw error;
  }
};

/**
 * Get all stories by a specific author (public)
 * @param {string} authorId - Author user ID
 * @param {number} page - Page number
 * @param {number} limit - Stories per page
 * @returns {Promise<Object>} Author's stories
 */
export const getStoriesByAuthor = async (authorId, page = 1, limit = 12) => {
  try {
    const response = await api.get(`/stories/author/${authorId}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    logError(error, 'getStoriesByAuthor');
    throw error;
  }
};

/**
 * Create a new story (authenticated only)
 * @param {Object} storyData - { title, content }
 * @returns {Promise<Object>} Created story
 */
export const createStory = async (storyData) => {
  try {
    const response = await api.post('/stories', storyData);
    return response.data;
  } catch (error) {
    logError(error, 'createStory');
    throw error;
  }
};

/**
 * Update a story (authenticated, author only)
 * @param {string} storyId - Story ID
 * @param {Object} updates - { title?, content? }
 * @returns {Promise<Object>} Updated story
 */
export const updateStory = async (storyId, updates) => {
  try {
    const response = await api.patch(`/stories/${storyId}`, updates);
    return response.data;
  } catch (error) {
    logError(error, 'updateStory');
    throw error;
  }
};

/**
 * Delete a story (authenticated, author only)
 * @param {string} storyId - Story ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteStory = async (storyId) => {
  try {
    const response = await api.delete(`/stories/${storyId}`);
    return response.data;
  } catch (error) {
    logError(error, 'deleteStory');
    throw error;
  }
};

/**
 * Get current user's stories (authenticated)
 * @param {number} page - Page number
 * @param {number} limit - Stories per page
 * @returns {Promise<Object>} User's stories with metadata
 */
export const getUserStories = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/user/stories', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    logError(error, 'getUserStories');
    throw error;
  }
};

export default api;
