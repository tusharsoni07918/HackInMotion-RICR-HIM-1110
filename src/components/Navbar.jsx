import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <div className="logo-box">
            <span>✦</span>
          </div>

          <div className="logo-text">
            Civic<span>Guardian</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="navbar-links">
          <Link to="/" className="nav-link active">
            Home
          </Link>

          <a href="#how-it-works" className="nav-link">
            How It Works
          </a>

          <a href="#about" className="nav-link">
            About
          </a>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="navbar-actions">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/report-issue" className="report-btn">
            Report an Issue
            <span className="report-arrow">→</span>
          </Link>

        </div>

        {/* MOBILE MENU */}
        <button
          type="button"
          className="mobile-menu"
          aria-label="Open menu"
        >
          ☰
        </button>

      </div>
    </header>
  );
}

export default Navbar;