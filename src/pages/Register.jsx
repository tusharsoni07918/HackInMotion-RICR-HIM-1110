function Register() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p>Join CivicGuardian and help improve your city</p>

        <form>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

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
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>
  );
}

export default Register;