import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { user, signout } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user || !user._id) return;
      try {
        const res = await axiosInstance.get("/posts/all-posts");
        const userPosts = res.data.data.filter(
          (post) => post.userId?._id === user._id || post.userId === user._id
        );
        setMyPosts(userPosts);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, [user]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setChangingPassword(true);

    try {
      const res = await axiosInstance.patch("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      if (res.data.success) {
        setPasswordSuccess("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(res.data.message || "Failed to change password");
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || "An error occurred");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      window.location.href = "/login";
    } catch (err) {
      setError("Failed to logout");
    }
  };

  if (!user) return <div className="container"><h2>Please login to view your profile</h2></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Your Profile</h1>

        <div className="profile-info">
          <p><strong>Username:</strong> <span className="profile-username">{user.username || "Not set"}</span></p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.verified ? "✓ Verified" : "Unverified"}</p>
        </div>

        <div className="password-section">
          <h2>Change Password</h2>

          {passwordError && <div className="error-message">{passwordError}</div>}
          {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label htmlFor="oldPassword">Current Password:</label>
              <input
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                disabled={changingPassword}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={changingPassword}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={changingPassword}
              />
            </div>

            <button type="submit" disabled={changingPassword}>
              {changingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>

        <h2>Your Posts</h2>
        {loading ? (
          <p>Loading your posts...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : myPosts.length === 0 ? (
          <p>You have not created any posts yet. <Link to="/create">Create one now</Link></p>
        ) : (
          <div className="posts-list">
            {myPosts.map((post) => (
              <PostCard key={post._id} post={post} refreshPosts={() => window.location.reload()}>
                <Link to={`/post/${post._id}`} style={{ textDecoration: "none", color: "blue" }}>
                  <h3>{post.title}</h3>
                </Link>
              </PostCard>
            ))}
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;