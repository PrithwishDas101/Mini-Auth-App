import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Both title and description are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("/posts/create-posts", { title, description });
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="container"><h2>Please login to create a post</h2></div>;

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Create a New Post</h1>
        <p className="creating-as">Creating as <span className="username-badge">{user.username || user.email}</span></p>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter post description"
              rows={8}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;