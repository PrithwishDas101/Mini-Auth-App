import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, signout } = useAuth();

  const handleLogout = async () => {
    await signout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            📖 Tales
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              {/* Username Warning */}
              {!user.username && (
                <Link
                  to="/set-username"
                  className="px-3 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition animate-pulse"
                >
                  ⚠️ Set Username
                </Link>
              )}

              {/* Story Links */}
              <Link
                to="/feed"
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              >
                📚 Stories
              </Link>

              <Link
                to="/write"
                className="px-3 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition"
              >
                ✍️ Write
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                title={user.email}
              >
                👤 {user.username || user.email.split('@')[0]}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}