import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {
      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link to="/" className="auth-logo">

          <div className="auth-logo-box">
            ✦
          </div>

          <span>
            Civic<span>Guardian</span>
          </span>

        </Link>


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="auth-heading">

          <h1>
            Create Account
          </h1>

          <p className="auth-subtitle">
            Join CivicGuardian and help build a better city
          </p>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        {/* =================================================
            REGISTER FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="name"
            />

          </div>


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
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
            />

          </div>


          {/* Role */}

          <div className="form-group">

            <label>
              Register As
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
              ? "Creating Account..."
              : "Create Account"}

            {!loading && (
              <span>
                →
              </span>
            )}

          </button>

        </form>


        {/* =================================================
            LOGIN
        ================================================= */}

        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>


        {/* =================================================
            BACK HOME
        ================================================= */}

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

export default Register;