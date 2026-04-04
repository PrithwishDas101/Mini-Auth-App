/**
 * PRODUCTION-READY STORYTELLING PLATFORM
 * 
 * This document outlines the complete implementation for a minimalist,
 * high-performance React storytelling platform with editorial design.
 * 
 * ARCHITECTURE OVERVIEW:
 * ├── Frontend (React/Vite + Tailwind)
 * ├── State Management (Context API)
 * ├── API Integration (Axios service layer)
 * ├── Validation (Zod schemas)
 * └── Error Handling (Boundaries + Fallbacks)
 * 
 * FILE STRUCTURE TO CREATE:
 * 
 * src/
 * ├── components/
 * │   ├── ErrorBoundary.jsx
 * │   ├── LoadingSpinner.jsx
 * │   ├── SkeletonLoader.jsx
 * │   ├── Header.jsx
 * │   ├── Footer.jsx
 * │   ├── Navigation.jsx
 * │   ├── StoryCard.jsx
 * │   ├── StoryGrid.jsx
 * │   ├── Alert.jsx
 * │   └── FormField.jsx
 * ├── pages/
 * │   ├── Feed.jsx (All stories - public)
 * │   ├── StoryView.jsx (Single story view)
 * │   ├── CreateStory.jsx (Author only)
 * │   ├── EditStory.jsx (Author only)
 * │   ├── Profile.jsx (Authenticated)
 * │   ├── Settings.jsx (Authenticated)
 * │   ├── Login.jsx
 * │   ├── Signup.jsx
 * │   └── NotFound.jsx
 * ├── context/
 * │   ├── AuthContext.jsx
 * │   └── UserStoriesContext.jsx
 * ├── services/
 * │   ├── api.js (Axios instance)
 * │   ├── storyService.js
 * │   ├── userService.js
 * │   └── authService.js
 * ├── utils/
 * │   ├── schemas.js (Zod validation)
 * │   ├── sanitizer.js (XSS prevention)
 * │   ├── formatters.js (Date, text formatting)
 * │   └── errors.js (Error handling)
 * ├── styles/
 * │   └── globals.css (Tailwind + custom CSS)
 * ├── App.jsx
 * ├── main.jsx
 * └── globals.css
 * ├── tailwind.config.js
 * └── postcss.config.js
 * 
 * KEY FEATURES:
 * 
 * 1. PUBLIC FEED (anyone can read)
 *    - Clean multi-column grid
 *    - Story cards with title, author, excerpt
 *    - Filter/sort by date, author
 *    - Infinite scroll or pagination
 * 
 * 2. STORY VIEW (single story page)
 *    - Focused reading mode (60-70 char line length)
 *    - Editorial typography (Merriweather serif)
 *    - Author metadata
 *    - Edit/Delete buttons (owner only)
 *    - Related stories
 * 
 * 3. AUTHOR DASHBOARD (authenticated)
 *    - "My Stories" table (title, status, date, actions)
 *    - CRUD operations (Create, Read, Update, Delete)
 *    - Draft/Published status
 *    - Performance: Optimistic updates, skeleton loaders
 * 
 * 4. PROFILE & SETTINGS (authenticated)
 *    - Username management
 *    - Password change
 *    - Account details
 *    - Data validation with Zod
 * 
 * SECURITY FEATURES:
 * 
 * - Ownership validation: Edit/Delete only render if authorId === userId
 * - Input sanitization: XSS prevention via sanitizer utility
 * - Data validation: Zod schemas on all forms
 * - Error boundaries: Prevent app crashes
 * - Token-based auth: Secure API requests
 * 
 * STATE MANAGEMENT:
 * 
 * Using Context API with custom hooks:
 * - AuthContext: Manages user auth state, login/logout
 * - UserStoriesContext: Caches user's stories, optimistic updates
 * 
 * When user updates username:
 *   1. OptimisticUI: Update state immediately
 *   2. API: Send request to backend
 *   3. Callback: Invalidate story cache to reflect author name change
 *   4. Fallback: Revert on error
 * 
 * API ENDPOINTS REQUIRED:
 * 
 * Auth:
 *   POST /auth/login
 *   POST /auth/signup
 *   POST /auth/logout
 *   PATCH /auth/change-password
 * 
 * Stories:
 *   GET /stories (paginated, public)
 *   GET /stories/:id (single story)
 *   POST /stories (authenticated, create new)
 *   PATCH /stories/:id (authenticated, own stories only)
 *   DELETE /stories/:id (authenticated, own stories only)
 *   GET /stories/user/:userId (author's stories)
 * 
 * User:
 *   GET /user/profile (authenticated)
 *   PATCH /user/profile (change username)
 *   GET /user/stories (my stories)
 * 
 * IMPLEMENTATION NOTES:
 * 
 * 1. All API calls wrapped in try/catch
 * 2. Loading states managed at component level
 * 3. Skeleton loaders for async data
 * 4. Error messages displayed in Alert components
 * 5. Optimistic updates for better perceived performance
 * 6. All inputs sanitized before display/storage
 * 7. Ownership validation on UI AND backend
 * 8. No hard refreshes - React state syncs smoothly
 * 
 * PRODUCTION READINESS:
 * 
 * ✓ Type safety (JSDoc comments)
 * ✓ Error boundaries
 * ✓ Fallback components
 * ✓ Robust error handling
 * ✓ Input validation
 * ✓ XSS prevention
 * ✓ Loading states
 * ✓ Optimistic updates
 * ✓ DRY principles
 * ✓ Clean component hierarchy
 * ✓ Accessible HTML/ARIA
 * ✓ Responsive design
 * ✓ Dark/Light mode ready
 */

export const PLATFORM_CONFIG = {
  name: 'StoryVerse',
  description: 'A minimalist platform for published tales',
  apiBase: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  version: '1.0.0',
  maxStoryLength: 50000,
  maxTitleLength: 200,
  minStoryLength: 10,
  storiesPerPage: 12,
};

export const FEATURE_FLAGS = {
  enableComments: false,
  enableLikes: false,
  enableSharing: true,
  enableDrafts: true,
  enablePublishing: true,
};
