import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUsernameForUser } = useAuth();

  useEffect(() => {
    // If user doesn't exist, redirect to login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const validateUsername = () => {
    if (!username || username.trim().length === 0) {
      setError("Username is required");
      return false;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (username.length > 30) {
      setError("Username must not exceed 30 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      setError("Username can only contain letters, numbers, dots (.), underscores (_), and hyphens (-)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateUsername()) return;

    setLoading(true);

    try {
      const res = await axiosInstance.patch("/auth/set-username", { username });
      
      if (res.data.success) {
        // Update user context with username
        setUsernameForUser(username);
        navigate("/");
      } else {
        setError(res.data.message || "Failed to set username");
      }
    } catch (err) {
      console.error("Set username error:", err);
      setError(err.response?.data?.message || "An error occurred. Username might already be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Set Your Username</h1>
        <p style={{ color: "var(--text)", marginBottom: "1.5rem" }}>
          To get started, please choose a unique username.
        </p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., john_doe123, g.o.l_d.r.o_g.e.r, user-name"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Setting username..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUsername;
