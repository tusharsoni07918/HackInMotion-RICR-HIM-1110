import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}


        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join CivicGuardian and help improve your city
        </p>

        <form>

          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Register As</label>

            <select>
              <option value="citizen">Citizen</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;