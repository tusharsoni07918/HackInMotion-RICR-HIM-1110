import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: email.trim(),
        password,
        role,
      });

      // Save JWT token
      localStorage.setItem(
        "civicGuardianToken",
        data.token
      );

      // Save logged-in user
      localStorage.setItem(
        "civicGuardianUser",
        JSON.stringify(data.user)
      );

      alert("Login successful!");

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}
        <Link to="/" className="auth-logo">

          <div className="auth-logo-box">
            ✦
          </div>

          <span>
            Civic<span>Guardian</span>
          </span>

        </Link>


        {/* Heading */}
        <div className="auth-heading">

          <h1>
            Welcome Back
          </h1>

          <p className="auth-subtitle">
            Login to your CivicGuardian account
          </p>

        </div>


        {/* Error */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
            />

          </div>


          {/* Password */}
          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
            />

          </div>


          {/* Role */}
          <div className="form-group">

            <label>
              Login As
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >

              <option value="citizen">
                Citizen
              </option>

              <option value="admin">
                Administrator
              </option>

            </select>

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

            {!loading && (
              <span>
                →
              </span>
            )}

          </button>

        </form>


        {/* Register */}
        <p className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>


        {/* Back Home */}
        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;