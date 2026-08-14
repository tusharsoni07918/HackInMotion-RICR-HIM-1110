import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="hero" id="home">

      {/* BACKGROUND DECORATION */}
      <div className="hero-bg-circle circle-one"></div>
      <div className="hero-bg-circle circle-two"></div>

      <div className="hero-container">

        {/* =========================
            LEFT CONTENT
        ========================= */}
        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            SMART CITY • CIVIC TECHNOLOGY
          </div>

          <h1 className="hero-title">
            Make Your City
            <span>Better.</span>
          </h1>

          <p className="hero-description">
            Report civic issues, track their progress and help
            create a cleaner, safer and smarter city.
          </p>

          {/* ACTION BUTTONS */}
          <div className="hero-actions">

            <Link to="/report-issue" className="hero-primary">
              Report an Issue
              <span>→</span>
            </Link>

            <a href="#issues" className="hero-secondary">
              Explore Issues
              <span>↗</span>
            </a>

          </div>

          {/* TRUST SECTION */}
          <div className="hero-citizens">

            <div className="citizen-avatars">
              <div className="citizen-avatar">👩</div>
              <div className="citizen-avatar">👨</div>
              <div className="citizen-avatar">👩</div>
              <div className="citizen-avatar">👨</div>
            </div>

            <div className="citizen-text">
              <strong>Built for citizens</strong>
              <span>Together we can improve our city</span>
            </div>

          </div>

        </div>

        {/* =========================
            RIGHT VISUAL
        ========================= */}
        <div className="hero-visual">

          <div className="hero-card">

            <img
              src={heroImage}
              alt="Citizens improving their city"
              className="hero-main-image"
            />

          </div>

          {/* RESOLVED ISSUE */}
          <div className="issue-card resolved">

            <div className="issue-icon">
              ✓
            </div>

            <div className="issue-info">
              <strong>Issue Resolved</strong>
              <span>Street Light • Ward 8</span>
            </div>

          </div>

          {/* NEW ISSUE */}
          <div className="issue-card new-issue">

            <div className="issue-icon">
              !
            </div>

            <div className="issue-info">
              <strong>New Issue</strong>
              <span>Pothole • Ward 12</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;