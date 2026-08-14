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

          <span className="logo-text">
            Civic<span>Guardian</span>
          </span>

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


        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          {/* LOGIN */}
          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>


          {/* REPORT ISSUE */}
          <Link
            to="/login"
            className="report-btn"
          >
            Report an Issue
            <span>→</span>
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;