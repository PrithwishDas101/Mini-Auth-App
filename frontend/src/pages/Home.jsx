import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { SkeletonGrid } from "../components/LoadingStates";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/posts/all-posts");
      setPosts(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Discover stories and share your thoughts with our community
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/feed"
              className="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition"
            >
              📖 Explore Stories
            </Link>
            <Link
              to="/write"
              className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              ✍️ Write Story
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Latest Posts
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Community posts and discussions</p>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            dismissible
            onDismiss={() => setError("")}
            className="mb-8"
          />
        )}

        {loading ? (
          <SkeletonGrid count={6} />
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              No posts available yet
            </p>
            <Link
              to="/create"
              className="inline-block px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition"
            >
              Be the first to create a post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post._id}`}
                className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 h-full flex flex-col"
              >
                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                  {post.content?.substring(0, 150)}...
                </p>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <PostCard post={post} refreshPosts={fetchPosts} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;