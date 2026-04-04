import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/single-post/${id}`);
        setPost(res.data.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!user) {
      setError("Please login to delete posts");
      return;
    }

    const isOwner = user.email === post.userId?.email || user._id === post.userId;
    
    if (!isOwner) {
      setError("You can only delete your own posts");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      setDeleting(true);
      try {
        await axiosInstance.delete(`/posts/delete-post/${id}`);
        navigate("/profile");
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to delete post");
        setDeleting(false);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading post...</p></div>;
  if (error) return <div className="container"><div className="error-message">{error}</div></div>;
  if (!post) return <div className="container"><p>Post not found</p></div>;

  const isOwner = user && (user.email === post.userId?.email || user._id === post.userId);

  return (
    <div className="container">
      <div className="post-detail">
        <h1>{post.title}</h1>
        <p className="post-meta">
          <strong>Author:</strong> <span className="author-name">{post.userId?.username || post.userId?.email || "Unknown"}</span>
        </p>
        <div className="post-content">
          <p>{post.description}</p>
        </div>

        {isOwner && (
          <div className="post-actions">
            <button onClick={() => navigate(`/update-post/${id}`)}>Edit</button>
            <button 
              onClick={handleDelete} 
              disabled={deleting}
              className="delete-btn"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}

        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Posts
        </button>
      </div>
    </div>
  );
};

export default SinglePost;