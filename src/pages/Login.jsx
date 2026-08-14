import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // User is now logged in
    localStorage.setItem("civicguardian_logged_in", "true");

    // After login → Report Issue
    navigate("/report-issue");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

       

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your CivicGuardian account
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Login As</label>

            <select>
              <option value="citizen">
                Citizen
              </option>

              <option value="admin">
                Administrator
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;