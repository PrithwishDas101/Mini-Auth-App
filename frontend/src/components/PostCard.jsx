import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";

const PostCard = ({ post, refreshPosts, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/update-post/${post._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axiosInstance.delete(`/posts/delete-post/${post._id}`);
        refreshPosts();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting post");
      }
    }
  };

  const isOwner = user && (user.email === post.userId?.email || user._id === post.userId);
  const authorUsername = post.userId?.username || post.userId?.email || "Unknown";

  return (
    <div className="post-card">
      {children || <h3>{post.title}</h3>}
      <p className="post-excerpt">{post.description?.substring(0, 150)}...</p>
      <p className="post-author">By: <span className="author-name">{authorUsername}</span></p>

      {isOwner && (
        <div className="post-actions">
          <button onClick={handleEdit} className="edit-btn">Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;