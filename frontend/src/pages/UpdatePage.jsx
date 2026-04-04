import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/single-post/${id}`);
        const post = res.data.data;

        const isOwner = user && (user.email === post.userId?.email || user._id === post.userId);
        if (!isOwner) {
          setError("You are not authorized to edit this post");
          return;
        }

        setTitle(post.title);
        setDescription(post.description);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching post");
        setLoading(false);
      }
    };

    if (user) {
      fetchPost();
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      await axiosInstance.put(`/posts/update-post/${id}`, { title, description });
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating post");
      setUpdating(false);
    }
  };

  if (loading) return <div className="container"><p>Loading post...</p></div>;
  if (error) return <div className="container"><div className="error-message">{error}</div></div>;

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Update Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={updating}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              placeholder="Post description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={updating}
              rows={8}
            />
          </div>

          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Post"}
          </button>

          <button 
            type="button" 
            className="link-button"
            onClick={() => navigate(`/post/${id}`)}
            disabled={updating}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;