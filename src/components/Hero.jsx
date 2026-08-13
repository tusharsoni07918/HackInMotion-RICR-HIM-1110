import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="hero" id="home">
      {/* BACKGROUND DECORATION */}
      <div className="hero-bg-circle circle-one"></div>
      <div className="hero-bg-circle circle-two"></div>

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            SMART CITY • CIVIC TECHNOLOGY
          </div>

          <h1>
            Make Your City
            <br />
            <span>Better.</span>
          </h1>

          <p>
            Report civic issues, track their progress and help
            create a cleaner, safer and smarter city.
          </p>

          <div className="hero-buttons">

            <button className="hero-primary-btn">
              <span>Report an Issue</span>
              <span className="hero-arrow">→</span>
            </button>

            <button className="hero-secondary-btn">
              Explore Issues
              <span>↗</span>
            </button>

          </div>

          {/* TRUST SECTION */}
          <div className="hero-trust">

            <div className="trust-icons">
              <div>👩</div>
              <div>👨</div>
              <div>👩</div>
              <div>👨</div>
            </div>

            <div className="trust-text">
              <strong>Built for citizens</strong>

              <small>
                Together we can improve our city
              </small>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image-wrapper">

          <div className="hero-image-card">

            <img
              src={heroImage}
              alt="Citizens improving their city"
            />

          </div>

          {/* RESOLVED ISSUE CARD */}
          <div className="hero-floating-card floating-one">

            <div className="floating-icon">
              ✓
            </div>

            <div className="floating-content">
              <strong>Issue Resolved</strong>
              <span>Street Light • Ward 8</span>
            </div>

          </div>

          {/* NEW ISSUE CARD */}
          <div className="hero-floating-card floating-two">

            <div className="floating-icon blue-icon">
              !
            </div>

            <div className="floating-content">
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