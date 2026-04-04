# Production-Ready Storytelling Platform

A minimalist, high-performance React application for publishing and reading tales with an editorial design aesthetic.

## 🎯 Features

### Public Access
- **Story Feed**: Browse all published stories in a clean, multi-column grid
- **Story Reader**: Distraction-free reading mode optimized for long-form text
- **Author Profiles**: View all stories by a specific author (public view)

### For Authors (Authenticated)
- **Create Stories**: Write and publish new stories with rich text editor
- **Manage Stories**: Edit and delete your own published stories
- **User Dashboard**: View all your published stories in a management table
- **Account Settings**: Update username and password securely

### Technical Highlights
- **Robust Error Handling**: Try/Catch blocks, error boundaries, fallback components
- **Loading States**: Skeleton loaders and spinners for optimistic UX
- **Data Validation**: Zod schemas on all forms ensure zero malformed data
- **Ownership Validation**: Edit/Delete controls only render for story authors
- **XSS Prevention**: All user inputs sanitized before display
- **Optimistic Updates**: Immediate UI updates with automatic rollback on errors
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Ready**: Full dark mode support with CSS variables

## 📂 Project Structure

```
frontend/src/
├── api/
│   ├── storyService.js      # Story CRUD API calls
│   ├── schemas.js           # Zod validation schemas
│   ├── sanitizer.js         # XSS prevention utilities
│   ├── errors.js            # Error handling utilities
│   └── formatters.js        # Date/text formatting
├── components/
│   ├── ErrorBoundary.jsx    # Error catching component
│   ├── LoadingStates.jsx    # Skeleton loaders & spinners
│   ├── Alert.jsx            # Alert, FormField, Button, Card
│   ├── StoryCard.jsx        # Story summary card for feed
│   ├── Header.jsx           # Navigation header
│   └── Footer.jsx           # Footer
├── context/
│   └── AuthContext.jsx      # User auth state management
├── pages/
│   ├── Feed.jsx             # All stories (public)
│   ├── StoryView.jsx        # Single story reading page
│   ├── CreateStory.jsx      # Create new story
│   ├── EditStory.jsx        # Edit existing story
│   ├── Profile.jsx          # User dashboard
│   ├── Settings.jsx         # Account settings (TBD)
│   ├── Login.jsx            # Login page
│   ├── Signup.jsx           # Signup page
│   └── [other auth pages]
├── App.jsx                  # Main router
├── globals.css              # Tailwind + custom styles
├── tailwind.config.js       # Tailwind theme config
└── postcss.config.js        # PostCSS config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Backend API running on `http://localhost:5000/api`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:5173` by default (Vite).

## 🎨 Design Principles

### Typography
- **Display Headings** (h1, h2): Playfair Display serif for editorial feel
- **Body Text**: Merriweather serif for long-form readability
- **UI/Metadata**: Inter sans-serif for clarity and precision

### Color Scheme
- **Light Mode**: Clean white backgrounds with subtle slate grays
- **Dark Mode**: Deep slate with sophisticated contrast
- **Accents**: Deep navy blue for interactive elements

### Layout
- **Reading Width**: 65-70 characters per line (industry standard)
- **Typography Plugin**: Tailwind's prose styling for semantic HTML
- **Whitespace**: Generous padding and margins for breathing room
- **Borders**: Subtle 1px borders, minimal shadows for definition

## 🔐 Security Features

### Input Validation
- Zod schemas validate all form inputs
- Regex patterns prevent invalid characters
- Max length constraints prevent DoS

### XSS Prevention
- All user content sanitized before display
- HTML/script tags stripped or escaped
- Safe URL validation

### Ownership Validation
- UI: Edit/Delete buttons only render if `post.authorId === currentUser.id`
- Backend: API enforces ownership checks
- Prevents unauthorized modifications

### Token Management
- JWT tokens stored in localStorage
- Automatic refresh on 401 Unauthorized
- Logout clears token and redirects to login

## 📊 State Management

### AuthContext
```javascript
{
  user: {
    id: string,
    email: string,
    username: string,
    verified: boolean
  },
  token: string,
  login: (email, password) => Promise,
  logout: () => void,
  signup: (email, username, password) => Promise
}
```

### Component-Level State
- Each page manages its own loading/error/data states
- Optimistic updates with automatic rollback
- Loading spinners during async operations

## 🛠️ API Integration

### Story Service (`storyService.js`)
```javascript
// Public endpoints
getStories(page, limit, sort)        // GET /stories
getStoryById(id)                      // GET /stories/:id
getStoriesByAuthor(authorId)          // GET /stories/author/:id

// Authenticated endpoints
createStory(data)                     // POST /stories
updateStory(id, updates)              // PATCH /stories/:id
deleteStory(id)                       // DELETE /stories/:id
getUserStories(page, limit)           // GET /user/stories
```

### Error Handling
- Axios interceptors add auth tokens automatically
- Retry logic with exponential backoff
- User-friendly error messages
- Development-only debug logging

## 📝 Form Validation

### Zod Schemas
```javascript
// Story creation
createStorySchema
  title: 3-200 chars
  content: 10-50,000 chars

// Story update
updateStorySchema (partial)

// Username update
updateUsernameSchema
  username: 3-30 chars, /^[a-zA-Z0-9._-]+$/

// Password change
changePasswordSchema
  Validates matching confirmation
```

## ♿ Accessibility

- Semantic HTML (article, section, main)
- Proper heading hierarchy
- ARIA labels on interactive elements
- Color contrast meets WCAG AA
- Keyboard navigation support
- Loading indicators for screen readers

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Touch-friendly button sizes
- Readable font sizes on all devices
- Full-width on mobile, constrained on desktop

## 🧪 Error Handling

### Error Boundary
```javascript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```
Catches component errors and displays fallback UI

### Try/Catch Blocks
All async operations wrapped with error handling:
```javascript
try {
  const data = await getStories();
  setStories(data);
} catch (error) {
  const message = getErrorMessage(error);
  setError(message);
}
```

### Validation Errors
```javascript
const validatedData = createStorySchema.parse(formData);
// Throws ZodError with field-level errors
const errors = formatValidationErrors(zodError);
```

## ⚡ Performance

- Code splitting via Vite
- Skeleton loaders for perceived performance
- Optimistic UI updates reduce perceived latency
- Retry logic handles network failures
- Lazy loading of images and components (future)

## 🌙 Dark Mode

All components include dark mode classes:
```css
/* Light mode */
bg-white text-slate-900

/* Dark mode */
dark:bg-slate-800 dark:text-white
```

Toggle dark mode via HTML class (implement in Header):
```javascript
document.documentElement.classList.toggle('dark')
```

## 📚 Component API

### Alert
```jsx
<Alert 
  message="Error occurred"
  type="error|success|info|warning"
  dismissible={true}
  autoDismiss={3000}
  onDismiss={() => {}}
/>
```

### FormField
```jsx
<FormField
  label="Title"
  type="text|textarea|email|password"
  value={value}
  onChange={handleChange}
  error={error}
  required={true}
  maxLength={200}
/>
```

### Button
```jsx
<Button
  onClick={handleClick}
  variant="primary|secondary|danger|ghost"
  size="sm|md|lg"
  loading={false}
  disabled={false}
>
  Click Me
</Button>
```

### SkeletonCard, SkeletonGrid, LoadingSpinner
```jsx
<SkeletonCard />
<SkeletonGrid count={12} />
<LoadingSpinner message="Loading..." size="md" />
```

## 🔄 Workflow Examples

### Creating a Story
1. User clicks "Write" button
2. Navigate to `/write` (CreateStory page)
3. User fills form with validation
4. On submit: validate with Zod → API call → show spinner
5. Success: navigate to story page
6. Error: display alert, maintain form state

### Editing a Story
1. User navigates to story page
2. Ownership check: show Edit button if owner
3. Click Edit → navigate to `/edit/:id`
4. Load story (with spinner)
5. Ownership validation (redirect if not owner)
6. Form pre-filled with story content
7. On submit: validate → API call → navigate back
8. Optimistic update: show confirmation

### Deleting a Story
1. User clicks Delete on story page
2. Confirmation dialog appears
3. On confirm: API call → loading state
4. Success: redirect to feed
5. Error: display alert, keep user on page

## 🚀 Deployment

### Build
```bash
npm run build
# Output: dist/ directory
```

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=https://your-api.com/api
```

### Serve with HTTP Server
```bash
npm run preview
```

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

## 📝 License

This project is part of the Auth Platform and follows the same license.

## 🤝 Contributing

When adding new pages or components:
1. Use Error Boundary for main pages
2. Add proper error handling with try/catch
3. Implement loading states with skeletons
4. Validate all form inputs with Zod
5. Follow the established component structure
6. Add meaningful comments for complex logic
7. Test on mobile and desktop
8. Check dark mode compatibility

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
