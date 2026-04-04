import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axiosInstance.patch(
        "/auth/send-forgot-password-Code",
        { email }
      );
      if (res.data.success) {
        setSuccess("Code sent to your email");
        setStep(2);
      } else {
        setError(res.data.message || "Failed to send code");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axiosInstance.patch(
        "/auth/verify-forgot-password-Code",
        {
          email,
          providedCode: code,
          newPassword,
        }
      );

      if (res.data.success) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        setError(res.data.message || "Verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordValidation = () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Forgot Password</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendCode}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <div className="form-group">
              <label htmlFor="code">Verification Code:</label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code from email"
                required
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !handlePasswordValidation()}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              className="link-button"
              onClick={() => {
                setStep(1);
                setCode("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
              }}
              disabled={loading}
            >
              Back
            </button>
          </form>
        )}

        <p className="auth-links">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
