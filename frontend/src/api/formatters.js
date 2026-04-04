/**
 * Formatting utilities for consistent display of dates, numbers, and text
 */

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'time', 'relative'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  const formats = {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    time: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  if (format === 'relative') {
    return formatRelativeTime(dateObj);
  }

  return dateObj.toLocaleDateString('en-US', formats[format] || formats.short);
};

/**
 * Format relative time (e.g., "2 days ago")
 * @param {Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(date, 'short');
};

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.slice(0, length).concat('...') : text;
};

/**
 * Extract excerpt from content (removes HTML, limits length)
 * @param {string} content - Full content
 * @param {number} length - Max length
 * @returns {string} Excerpt
 */
export const createExcerpt = (content, length = 150) => {
  if (!content) return '';
  
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  // Remove extra whitespace
  const normalized = plainText.replace(/\s+/g, ' ').trim();
  
  return truncateText(normalized, length);
};

/**
 * Format word count
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
export const getWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

/**
 * Format reading time
 * @param {string} text - Text to estimate
 * @param {number} wordsPerMinute - Average reading speed (default 200)
 * @returns {string} Estimated reading time
 */
export const getReadingTime = (text, wordsPerMinute = 200) => {
  const wordCount = getWordCount(text);
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes < 1) return 'Less than 1 min';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};

/**
 * Format large numbers with abbreviations
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1.2K", "3.5M")
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  return (num / 1000000).toFixed(1) + 'M';
};

/**
 * Capitalize first letter of string
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert text to URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slug
 */
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default {
  formatDate,
  formatRelativeTime,
  truncateText,
  createExcerpt,
  getWordCount,
  getReadingTime,
  formatNumber,
  capitalize,
  slugify,
};
