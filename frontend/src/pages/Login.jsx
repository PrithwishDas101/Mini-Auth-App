import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Alert, { FormField, Button, Card } from "../components/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signin(email, password);
      if (res.success) {
        const token = res.token;
        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          if (!decoded.username) {
            navigate("/set-username");
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sign in to your account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            message={error}
            type="error"
            dismissible
            onDismiss={() => setError("")}
            className="mb-6"
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            disabled={loading}
            name="email"
          />

          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            disabled={loading}
            name="password"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 space-y-3 text-center text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-slate-900 dark:text-white hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="font-medium text-slate-900 dark:text-white hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}