# 🚀 Quick Start Guide - Storytelling Platform

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally or cloud connection
- Git for version control

---

## 🔧 Backend Setup

### 1. Environment Variables
Create `.env` in project root:
```env
MONGODB_URI=mongodb://localhost:27017/auth-db
PORT=5000
JWT_SECRET=your_secret_key_here
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Server
```bash
npm start
```

**Expected output**:
```
mongodb connected
Server running on port 5000
```

---

## 🎨 Frontend Setup

### 1. Environment Variables
Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

**Expected output**:
```
VITE v8.0.1  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## 🌐 Access the Platform

### URLs
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
- **Story Feed**: `http://localhost:5173/feed`

### First Steps
1. **View Feed**: Navigate to `/feed` - browse existing stories
2. **Create Account**: Click signup, enter email/username/password
3. **Write Story**: Click "Write" button, create your first story
4. **Read Stories**: Click any story card to read it
5. **Edit/Delete**: Visit your story and use action buttons (author only)

---

## 📊 Test Data

### Create Sample Story via API
```bash
# 1. Get auth token (login first)
# 2. Create story
curl -X POST http://localhost:5000/api/stories \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Adventure Begins",
    "content": "Once upon a time, there was a curious explorer who decided to venture into the unknown depths of the forest..."
  }'

# 3. View all stories
curl http://localhost:5000/api/stories

# 4. Read specific story
curl http://localhost:5000/api/stories/{STORY_ID}
```

---

## 🎯 Key Features to Try

### For Readers
- ✅ Browse all stories in `/feed`
- ✅ Search stories using search bar
- ✅ Click story to read full content
- ✅ View author information
- ✅ See view count on stories

### For Authors
- ✅ Click "Write" to create new story
- ✅ Set title (3-200 characters)
- ✅ Write content (10-50,000 characters)
- ✅ See character counters
- ✅ Click "Edit" on your story to modify
- ✅ Click "Delete" to remove story
- ✅ See your stories in profile

### Editorial Features
- ✅ Playfair Display serif fonts for titles
- ✅ Merriweather serif for readability
- ✅ Optimized line length (65-70 chars)
- ✅ Generous whitespace
- ✅ Skeleton loaders while loading
- ✅ Dark mode support (toggle in settings)
- ✅ Mobile-responsive design

---

## 🔐 Security Features (See in Action)

- **Ownership**: Only authors can edit/delete their stories
- **Validation**: Try submitting invalid story (too short, too long)
- **Error Handling**: Try accessing story that doesn't exist
- **Authentication**: Protected routes redirect to login
- **Dark Mode**: Toggle with theme switcher in header

---

## 🐛 Troubleshooting

### Frontend won't connect to backend
```
Error: Failed to fetch stories
→ Check VITE_API_URL in frontend/.env.local
→ Verify backend is running on port 5000
→ Check CORS configuration in index.js
```

### MongoDB connection failed
```
Error: MongoDB Connection Error
→ Verify MongoDB is running locally
→ Check MONGODB_URI in .env
→ Create database if needed
```

### Stories not displaying
```
→ Check browser console for errors
→ Verify API returns data: curl http://localhost:5000/api/stories
→ Check MongoDB has Story collection
```

### Edit/Delete buttons not showing
```
→ Make sure you're logged in
→ Verify story.authorId matches your user.id
→ Check JWT token is valid
```

---

## 📱 Responsive Testing

### Desktop (1024px+)
```
✅ 3-column grid
✅ Full typography scaling
✅ All hover effects
```

### Tablet (768px)
```
✅ 2-column grid
✅ Scaled typography
✅ Touch-friendly buttons
```

### Mobile (< 640px)
```
✅ 1-column grid
✅ Mobile typography
✅ Full-width layout
```

---

## 🌙 Dark Mode

### Toggle Dark Mode
- Look for theme switcher in header
- Or use browser console:
```javascript
document.documentElement.classList.toggle('dark')
localStorage.setItem('theme', 'dark') // Persist
```

---

## 📈 Performance

### Typical Performance
- Story feed: < 500ms load time
- Single story: < 300ms load time
- Create story: < 1s with validation
- Search: < 800ms with results

### Optimization Techniques Used
- Skeleton loaders (perceived performance)
- Pagination (12 stories per page)
- MongoDB indexes (fast queries)
- Lean queries (read-only optimization)
- Retry logic (transient failure handling)

---

## 🧪 Unit Test Examples

### Test Story Creation
```javascript
// In browser console
const formData = {
  title: "Test Story",
  content: "This is a test story with minimum content"
};

import { createStorySchema } from './src/api/schemas.js';
const result = createStorySchema.parse(formData);
console.log(result); // Should show validated data
```

### Test Sanitization
```javascript
import { sanitizeHtml } from './src/api/sanitizer.js';
const dirty = "<script>alert('xss')</script>Safe content";
console.log(sanitizeHtml(dirty)); // Should remove script tags
```

---

## 📚 File Structure Overview

```
project/
├── backend/
│   ├── index.js (entry point)
│   ├── models/storyModel.js
│   ├── controllers/storyController.js
│   ├── routers/storyRouter.js
│   └── .env (configure this)
│
└── frontend/
    ├── src/
    │   ├── App.jsx (main router)
    │   ├── api/ (storyService, schemas, sanitizer, errors, formatters)
    │   ├── components/ (ErrorBoundary, LoadingStates, Alert, StoryCard)
    │   ├── pages/ (Feed, StoryView, CreateStory, EditStory)
    │   └── globals.css
    ├── .env.local (configure this)
    └── package.json
```

---

## 🔑 Key Endpoints Reference

```
GET    /api/stories                 → All stories (paginated)
GET    /api/stories/:id             → Single story
GET    /api/stories/search?q=term   → Search stories
POST   /api/stories                 → Create story (auth required)
PATCH  /api/stories/:id             → Update story (auth required)
DELETE /api/stories/:id             → Delete story (auth required)
```

---

## 💡 Pro Tips

1. **Character Counters**: Form fields show current/max characters
2. **Skeleton Loaders**: Show while content loads - indicates system is working
3. **Error Alerts**: All errors are user-friendly, not technical
4. **Reading Mode**: Focus on content with minimal distractions
5. **Author Info**: Click author name to see their other stories
6. **Back Navigation**: Use ← to return to feed from story
7. **Validation**: Submit form to see helpful error messages
8. **Responsive**: Works great on mobile - try it!

---

## 🚀 Next Steps

### After Getting Comfortable
1. Create multiple stories
2. Edit and delete stories
3. Search for stories
4. Browse by author
5. Test on mobile device
6. Try dark mode
7. Check error handling (submit invalid form)
8. Verify ownership (try to edit someone else's story)

### For Production Deployment
1. Set strong JWT_SECRET
2. Use MongoDB Atlas or similar
3. Deploy backend to cloud (Heroku, Railway, Vercel)
4. Deploy frontend (Vercel, Netlify)
5. Update VITE_API_URL to production backend
6. Enable HTTPS
7. Configure production CORS
8. Set up environment variables on deployment platform

---

## 📞 Need Help?

### Useful Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/stories

# Check if frontend is running
curl http://localhost:5173

# View MongoDB documents
# (In MongoDB shell or Compass)
db.stories.find()

# Clear browser cache (Ctrl+Shift+Del)
# Then refresh page

# View server logs (check terminal)
# View browser console (F12 → Console tab)
```

---

## ✅ Success Indicators

- ✅ Backend shows "mongodb connected"
- ✅ Backend shows "Server running on port 5000"
- ✅ Frontend shows "ready in XXX ms"
- ✅ Can navigate to `http://localhost:5173`
- ✅ Can see "Tales" header on feed page
- ✅ Can create account
- ✅ Can write and publish story
- ✅ Can see story in feed
- ✅ Can read full story with formatting
- ✅ Can edit/delete own story
- ✅ Dark mode toggle works
- ✅ Mobile view is responsive

---

## 🎉 You're Ready!

Your storytelling platform is now live. Start publishing! 📝

**Questions?** Check PLATFORM_README.md or STORYTELLING_PLATFORM_INTEGRATION.md

---

**Version**: 1.0.0  
**Last Updated**: [Current Date]  
**Status**: ✅ Ready to Use
