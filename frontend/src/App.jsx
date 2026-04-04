import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import UpdatePage from "./pages/UpdatePage";
import SetUsername from "./pages/SetUsername";

// Storytelling Platform Pages
import Feed from "./pages/Feed";
import StoryView from "./pages/StoryView";
import CreateStory from "./pages/CreateStory";
import EditStory from "./pages/EditStory";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/set-username" element={<SetUsername />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/update-post/:id" element={<UpdatePage />} />
            
            {/* Storytelling Platform Routes */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/story/:id" element={<StoryView />} />
            <Route path="/write" element={<CreateStory />} />
            <Route path="/edit/:id" element={<EditStory />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;