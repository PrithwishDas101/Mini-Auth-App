/**
 * Centralized XSS prevention and sanitization utilities
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes any script tags and dangerous attributes
 * @param {string} dirty - Unsanitized HTML string
 * @returns {string} Safe HTML string
 */
export const sanitizeHtml = (dirty) => {
  if (!dirty) return '';
  
  const container = document.createElement('div');
  container.textContent = dirty;
  return container.innerHTML;
};

/**
 * Sanitize user input by removing special characters
 * Use for username, title, etc.
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  // Remove leading/trailing whitespace
  return input.trim();
};

/**
 * Escape special HTML characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML
 */
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text?.replace(/[&<>"']/g, (char) => map[char]) || '';
};

/**
 * Sanitize URL to prevent javascript: protocol
 * @param {string} url - URL to sanitize
 * @returns {string} Safe URL
 */
export const sanitizeUrl = (url) => {
  if (!url) return '';
  
  // Reject javascript: and data: protocols
  if (url.match(/^(javascript:|data:|vbscript:)/i)) {
    return '';
  }
  
  return url;
};

/**
 * Remove markdown from text for plain text display
 * @param {string} markdown - Markdown string
 * @returns {string} Plain text
 */
export const stripMarkdown = (markdown) => {
  if (!markdown) return '';
  
  return markdown
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
};

/**
 * Validate story content for safety
 * @param {string} content - Story content to validate
 * @returns {boolean} True if content is safe
 */
export const isContentSafe = (content) => {
  if (!content) return false;
  
  // Check for suspicious patterns
  const dangerousPatterns = [
    /<script/gi,
    /on\w+\s*=/gi, // Event handlers like onclick=
    /javascript:/gi,
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(content));
};
