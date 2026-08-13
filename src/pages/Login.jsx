import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your CivicGuardian account
        </p>

        <form>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label>Login As</label>

            <select defaultValue="citizen">
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

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;