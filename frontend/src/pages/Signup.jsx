import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Alert, { FormField, Button, Card } from "../components/Alert";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required");
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
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await signup(email, username, password);
      if (res.success) {
        navigate("/verify-email", { state: { email } });
      } else {
        setError(res.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred");
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
            Create Account
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Join our community of writers
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
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john_doe123 or j.o.e-x"
            required
            disabled={loading}
            name="username"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            3-30 characters. Can include letters, numbers, dots, underscores, hyphens
          </p>

          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            disabled={loading}
            name="password"
          />

          <FormField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            disabled={loading}
            name="confirmPassword"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-slate-900 dark:text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}