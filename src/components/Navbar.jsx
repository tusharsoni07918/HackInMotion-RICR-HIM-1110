import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* LOGO */}
        <a href="#home" className="navbar-logo">

          <div className="logo-box">
            <span>✦</span>
          </div>

          <span className="logo-text">
            Civic<span>Guardian</span>
          </span>

        </a>


        {/* NAVIGATION */}
        <nav className="navbar-links">

          <a href="#home" className="nav-link active">
            Home
          </a>

          <a href="#how-it-works" className="nav-link">
            How It Works
          </a>

          <a href="#about" className="nav-link">
            About
          </a>

        </nav>


        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          <button className="login-btn">
            Login
          </button>

          <button className="report-btn">
            Report an Issue
            <span>→</span>
          </button>

        </div>


        {/* MOBILE */}
        <button className="mobile-menu">
          ☰
        </button>

      </div>

    </header>
  );
}

export default Navbar;