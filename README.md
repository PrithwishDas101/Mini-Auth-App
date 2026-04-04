# 📖 Tales: A Production-Ready Storytelling Platform

> A minimalist, high-performance React application for publishing and reading stories. Clean, distraction-free environment with editorial design aesthetic and enterprise-grade security.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-success)

---

## 🎯 Project Overview

**Tales** is a full-stack storytelling platform that combines:
- **Frontend**: React 19 + Vite with Tailwind CSS
- **Backend**: Express.js with MongoDB
- **Design**: Editorial aesthetic with Playfair Display and Merriweather fonts
- **Security**: JWT authentication, bcrypt hashing, CORS protection, XSS prevention
- **Features**: Story CRUD, user profiles, responsive design, dark mode

Perfect for writers, blogs, and content platforms that prioritize clarity and user experience.

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- ✅ Email/password authentication with JWT tokens
- ✅ Secure password hashing (bcryptjs)
- ✅ Username system with special character support
- ✅ Protected routes and ownership-based access control
- ✅ CORS security with dynamic port handling
- ✅ Helmet.js security headers

### 📝 **Story Management**
- ✅ Create, read, update, delete (CRUD) operations
- ✅ Rich story metadata (author, timestamps, title, content)
- ✅ Story feed with pagination and filtering
- ✅ Single-story reading mode (optimized for long-form text)
- ✅ Author-only edit/delete permissions
- ✅ Public story discovery

### 👤 **User Features**
- ✅ User profiles with story history
- ✅ Account settings (change username, password)
- ✅ Author information with story count
- ✅ Profile data persistence

### 🎨 **Design & UX**
- ✅ Editorial design aesthetic (serif headings, clean typography)
- ✅ Dark mode support throughout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Skeleton loaders for perceived performance
- ✅ Error boundaries and fallback components
- ✅ Smooth transitions and professional polish

### 🛡️ **Data Validation & Security**
- ✅ Zod schema validation on all forms
- ✅ XSS prevention and HTML sanitization
- ✅ Input validation (email, username, passwords)
- ✅ Secure error messages (no data leaks)
- ✅ Rate limiting ready (configurable)

### ⚡ **Performance**
- ✅ Optimistic UI updates with rollback
- ✅ Skeleton loaders reduce perceived load time
- ✅ Efficient MongoDB queries with indexes
- ✅ Vite hot module replacement (HMR)
- ✅ Production build optimization

---

## 🏗️ Architecture

### **Directory Structure**

```
auth-project/
├── .env                          # Environment variables
├── index.js                      # Express server entry point
├── package.json                  # Backend dependencies
│
├── controllers/                  # Business logic
│   ├── authController.js         # Auth operations
│   └── storyController.js        # Story operations
│
├── models/                       # MongoDB schemas
│   ├── userModel.js              # User schema
│   └── storyModel.js             # Story schema
│
├── routers/                      # API route definitions
│   ├── authRouter.js             # /api/auth routes
│   └── storyRouter.js            # /api/stories routes
│
├── middlewares/                  # Express middlewares
│   └── authMiddleware.js         # JWT verification
│
├── utils/                        # Utility functions
│   └── (helper functions)
│
└── frontend/                     # React Vite app
    ├── .env.local                # Frontend environment
    ├── vite.config.js            # Vite configuration
    ├── tailwind.config.js        # Tailwind design tokens
    ├── postcss.config.js         # PostCSS plugins
    ├── package.json              # Frontend dependencies
    │
    ├── src/
    │   ├── main.jsx              # React entry point
    │   ├── App.jsx               # Main app component
    │   ├── index.css             # Global styles
    │   ├── AuthContext.jsx       # Auth state management
    │   │
    │   ├── components/           # Reusable components
    │   │   ├── Header.jsx        # Navigation bar
    │   │   ├── Alert.jsx         # Alerts, forms, buttons
    │   │   ├── ErrorBoundary.jsx # Error handling
    │   │   ├── LoadingStates.jsx # Skeletons & spinners
    │   │   └── StoryCard.jsx     # Story preview cards
    │   │
    │   ├── pages/                # Page components
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Auth page
    │   │   ├── Signup.jsx        # Registration page
    │   │   ├── Feed.jsx          # Story feed
    │   │   ├── StoryView.jsx     # Read story
    │   │   ├── CreateStory.jsx   # Write story
    │   │   ├── EditStory.jsx     # Edit story
    │   │   ├── Profile.jsx       # User profile
    │   │   └── SetUsername.jsx   # Setup username
    │   │
    │   └── utils/                # Frontend utilities
    │       ├── storyService.js   # API calls
    │       ├── schemas.js        # Zod validation schemas
    │       ├── sanitizer.js      # XSS prevention
    │       ├── errors.js         # Error definitions
    │       └── formatters.js     # Date/text formatting
    │
    └── public/                   # Static assets
```

### **Technology Stack**

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | React | 19.2.4 |
| **Frontend Build** | Vite | 8.0.1 |
| **Styling** | Tailwind CSS | 3.3.6 |
| **Routing** | React Router | 6.30.3 |
| **HTTP Client** | Axios | 1.14.0 |
| **Validation** | Zod | 3.22.4 |
| **Backend Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB | Latest |
| **Authentication** | JWT + bcryptjs | 9.0.3 + 3.0.3 |
| **Security** | Helmet.js | 8.1.0 |
| **Email** | Nodemailer | 8.0.4 |

### **API Architecture**

```
Backend (Express on port 5000)
├── /api/auth              # Authentication routes
│   ├── POST /signup       # Create account
│   ├── POST /signin       # Login
│   ├── GET /me            # Get current user
│   ├── POST /logout       # Logout
│   └── POST /refresh      # Refresh token
│
└── /api/stories           # Story routes
    ├── GET /              # List all stories (paginated)
    ├── GET /:id           # Get single story
    ├── POST /             # Create story (auth required)
    ├── PATCH /:id         # Update story (owner only)
    └── DELETE /:id        # Delete story (owner only)
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js >= 18.0.0
- npm or yarn
- MongoDB (local or Atlas)

### **Backend Setup**

#### 1. Clone and Install
```bash
git clone <repository-url>
cd auth-project
npm install
```

#### 2. Configure Environment
Create `.env` file in project root:
```env
MONGODB_URI=mongodb://localhost:27017/tales-db
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

#### 3. Start Backend
```bash
npm start
# or for development with watch mode
npm run dev
```

Backend will run on `http://localhost:5000`

### **Frontend Setup**

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Configure Environment
Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 3. Start Development Server
```bash
npm run dev
# Vite will start on http://localhost:5173 (or next available port)
```

Frontend will run on `http://localhost:5173` or `http://localhost:5174` (if 5173 is in use)

### **Verify Installation**

1. **Backend**: Visit `http://localhost:5000` (you'll see "cannot GET /", which is normal)
2. **Frontend**: Visit `http://localhost:5174` - You should see the Tales landing page
3. **Try Login**: Test authentication flow
4. **Create Story**: Write your first story

---

## 📖 Usage Guide

### **Creating an Account**

1. Click **"Sign Up"** on the login page
2. Enter email, password, and username
3. Username must be 3-20 characters (can include letters, numbers, dots, underscores, hyphens)
4. Click **"Create Account"**
5. You'll be logged in automatically

### **Publishing a Story**

1. Click **"Write Story"** in header (after login)
2. Enter story title
3. Write your story content
4. Click **"Publish Story"**
5. Story appears in feed immediately

### **Reading Stories**

1. Click **"All Stories"** to browse public feed
2. Click any story card to read full story
3. See author name and publish date
4. Only story author sees edit/delete buttons

### **Managing Your Stories**

1. Click **"My Profile"** in header
2. See all your published stories
3. Click **"Edit"** to modify a story
4. Click **"Delete"** to remove a story (confirmation required)

### **Account Settings**

1. Click **"My Profile"** → **"Account Settings"**
2. Change your username or password
3. Changes apply immediately

---

## 🔒 Security Features

### **Authentication**
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 7-day expiration
- Refresh token mechanism for seamless re-auth
- Secure cookie handling

### **Authorization**
- Ownership-based access control (only post owners can edit/delete)
- Protected routes (redirect to login if not authenticated)
- Role-based permissions (user-level only currently)

### **Data Protection**
- CORS headers prevent cross-origin attacks
- Helmet.js adds security headers
- XSS prevention with HTML sanitization
- Input validation with Zod schemas
- SQL injection prevention (using MongoDB with proper queries)

### **Error Handling**
- Generic error messages (no database structure leaks)
- Stack traces only in development
- Error boundaries prevent app crashes
- Try/catch blocks on all async operations

---

## 🎨 Design System

### **Typography**
- **Headings** (h1-h4): Playfair Display (serif)
- **Body Text**: Default sans-serif (Inter via Tailwind)
- **UI/Metadata**: Inter (sans-serif)

### **Color Palette**
- **Light Mode**: White backgrounds, slate grays
- **Dark Mode**: Slate-900 backgrounds, light text
- **Accents**: Blue (primary), Red (destructive)

### **Components**
- `<Alert />` - Error/success/info messages
- `<FormField />` - Input wrapper with label
- `<Button />` - Primary/secondary/danger variants
- `<Card />` - Container with border
- `<SkeletonCard />` - Loading placeholder
- `<ErrorBoundary />` - Crash prevention

---

## 🛠️ Development

### **Frontend Build**
```bash
cd frontend
npm run build
# Output: dist/ folder (ready for deployment)
```

### **Frontend Preview**
```bash
cd frontend
npm run preview
# Test production build locally
```

### **Linting**
```bash
cd frontend
npm run lint
# Check code quality
```

### **Backend Endpoints Testing**

Test authentication:
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","username":"testuser"}'

# Login
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

---

## 📦 Deployment

### **Frontend Deployment (Vercel, Netlify, etc.)**

```bash
# Build
cd frontend
npm run build

# Deploy dist/ folder to your hosting service
```

Environment variables:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### **Backend Deployment (Heroku, Render, Railway, etc.)**

Ensure these environment variables are set:
```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=generate_a_random_string
NODE_ENV=production
PORT=5000
```

---

## 🐛 Troubleshooting

### **CORS Error**
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**: 
- Backend CORS is configured to allow both ports 5173 and 5174
- Check `index.js` line 14-19
- Frontend must be on `http://localhost:5173` or `http://localhost:5174`

### **Port Already in Use**
**Problem**: "Port 5000 already in use"

**Solution**:
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### **MongoDB Connection Error**
**Problem**: "Cannot connect to MongoDB"

**Solution**:
- Ensure MongoDB is running locally: `mongod`
- Or update `.env` to use MongoDB Atlas connection string
- Check MONGODB_URI format

### **Tailwind Styles Not Applying**
**Problem**: Styles not showing in frontend

**Solution**:
```bash
cd frontend
npm install
npm run dev
# Vite HMR will reload with proper styles
```

### **Auth Token Expired**
**Problem**: "Unauthorized" after some time

**Solution**:
- Tokens expire after 7 days
- Use refresh token endpoint `/api/auth/refresh` (automatic in login)
- User will be logged out, prompting re-authentication

---

## 📚 API Documentation

### **Authentication Endpoints**

#### `POST /api/auth/signup`
Create new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "johndoe"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

#### `POST /api/auth/signin`
Authenticate user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** Same as signup

#### `GET /api/auth/me`
Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "username": "johndoe"
}
```

### **Story Endpoints**

#### `GET /api/stories`
List all stories (paginated).

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `author` (optional: filter by author ID)

**Response:**
```json
{
  "stories": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "My First Story",
      "content": "Once upon a time...",
      "author": "johndoe",
      "authorId": "507f1f77bcf86cd799439011",
      "createdAt": "2026-04-04T16:00:00Z",
      "updatedAt": "2026-04-04T16:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

#### `GET /api/stories/:id`
Get single story.

**Response:** Story object (same as above)

#### `POST /api/stories`
Create new story (authenticated).

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "title": "My First Story",
  "content": "Once upon a time..."
}
```

**Response:** Created story object

#### `PATCH /api/stories/:id`
Update story (owner only).

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Response:** Updated story object

#### `DELETE /api/stories/:id`
Delete story (owner only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Story deleted successfully"
}
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** pull request

### **Code Style**
- Use ESLint configuration (run `npm run lint`)
- Format with prettier (configured in eslint)
- Follow React hooks best practices
- Add comments for complex logic
- Write descriptive commit messages

---

## 📄 License

This project is licensed under the **ISC License** - see LICENSE file for details.

---

## 👤 Author

**Prithwish**

---

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Guide](https://jwt.io/introduction)

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues on GitHub
2. Create detailed bug report with steps to reproduce
3. Include environment info (Node version, OS, etc.)

---

## 🎉 Changelog

### v1.0.0 (Latest)
- ✅ Complete storytelling platform implementation
- ✅ Editorial design with Playfair Display
- ✅ Full authentication system with JWT
- ✅ Story CRUD operations
- ✅ Responsive design and dark mode
- ✅ Production-ready security features
- ✅ Comprehensive error handling
- ✅ Zod validation on all forms

---

**Made with ❤️ for writers and storytellers**

[⬆ back to top](#-tales-a-production-ready-storytelling-platform)
