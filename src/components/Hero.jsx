function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-bg-circle circle-one"></div>
      <div className="hero-bg-circle circle-two"></div>

      <div className="hero-container">

        {/* LEFT CONTENT */}

        <div className="hero-content">

          <div className="hero-badge">
            <span></span>
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
              Report an Issue
              <span>→</span>
            </button>

            <button className="hero-secondary-btn">
              Explore Issues
            </button>

          </div>


          <div className="hero-trust">

            <div className="trust-icons">

              <div>👩</div>
              <div>👨</div>
              <div>👩</div>
              <div>👨</div>

            </div>

            <div>
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
              src="/src/assets/hero.png"
              alt="CivicGuardian"
            />

          </div>


          {/* Floating Card */}

          <div className="hero-floating-card floating-one">

            <div className="floating-icon">
              ✓
            </div>

            <div>
              <strong>Issue Resolved</strong>
              <span>Street Light • Ward 8</span>
            </div>

          </div>


          <div className="hero-floating-card floating-two">

            <div className="floating-icon blue-icon">
              !
            </div>

            <div>
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