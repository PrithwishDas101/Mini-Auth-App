import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>No email provided</h2>
          <p>Please sign up first.</p>
          <Link to="/signup">Go to Signup</Link>
        </div>
      </div>
    );
  }

  const handleSendCode = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axiosInstance.patch("/auth/send-verification-code", { email });
      if (res.data.success) {
        setSuccess("Code sent to your email");
      } else {
        setError(res.data.message || "Failed to send code");
      }
    } catch (err) {
      console.error("Send code error:", err);
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!code) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.patch("/auth/verify-verification-code", {
        email,
        providedCode: code,
      });

      if (res.data.success) {
        setSuccess("Email verified successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Verify Email</h1>
        <p>We sent a verification code to <strong>{email}</strong></p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Verification Code:</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <button 
          className="link-button" 
          onClick={handleSendCode} 
          disabled={loading}
        >
          Resend Code
        </button>

        <p className="auth-links">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
