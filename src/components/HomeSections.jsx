import { Link } from "react-router-dom";

function HomeSections() {
  return (
    <>
      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="stats-section">
        <div className="stats-container">

          <div className="stat-item">
            <span className="stat-number">1,240+</span>
            <span className="stat-label">Issues Reported</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">890+</span>
            <span className="stat-label">Issues Resolved</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">32</span>
            <span className="stat-label">City Wards</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">94%</span>
            <span className="stat-label">Citizen Satisfaction</span>
          </div>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="how-section" id="how-it-works">

        <div className="how-container">

          <div className="section-header how-header">

            <div className="section-eyebrow">
              HOW IT WORKS
            </div>

            <h2 className="section-title">
              Report. Track. <span>Resolve.</span>
            </h2>

            <p className="section-description">
              CivicGuardian connects citizens with city
              administrators to solve civic problems faster.
            </p>

          </div>


          <div className="steps-grid">

            {/* STEP 1 */}
            <div className="step-card">

              <div className="step-top">
                <span className="step-number">01</span>
                <div className="step-icon">📸</div>
              </div>

              <h3>Report an Issue</h3>

              <p>
                Report potholes, garbage, broken streetlights,
                water leakage and other civic problems.
              </p>

              <Link to="/report-issue" className="step-link">
                Report now →
              </Link>

            </div>


            {/* STEP 2 */}
            <div className="step-card">

              <div className="step-top">
                <span className="step-number">02</span>
                <div className="step-icon">🎯</div>
              </div>

              <h3>Smart Routing</h3>

              <p>
                Your complaint is automatically categorized
                and routed to the responsible department.
              </p>

              <span className="step-link">
                Automated process →
              </span>

            </div>


            {/* STEP 3 */}
            <div className="step-card">

              <div className="step-top">
                <span className="step-number">03</span>
                <div className="step-icon">📊</div>
              </div>

              <h3>Track Progress</h3>

              <p>
                Track your complaint from reporting to
                resolution with complete transparency.
              </p>

              <span className="step-link">
                Real-time tracking →
              </span>

            </div>


            {/* STEP 4 */}
            <div className="step-card">

              <div className="step-top">
                <span className="step-number">04</span>
                <div className="step-icon">✓</div>
              </div>

              <h3>Verify Resolution</h3>

              <p>
                Citizens can verify whether the reported
                issue has actually been resolved.
              </p>

              <span className="step-link">
                Citizen verified →
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CIVIC ISSUES
      ===================================================== */}
      <section className="issues-section" id="issues">

        <div className="issues-container">

          <div className="section-header">

            <div className="section-eyebrow">
              CIVIC ISSUES
            </div>

            <h2 className="section-title">
              What Can You <span>Report?</span>
            </h2>

            <p className="section-description">
              Help your city identify and resolve everyday
              problems affecting your community.
            </p>

          </div>


          <div className="issues-grid">

            {/* ROADS */}
            <div className="issue-category">

              <div className="category-icon">
                🛣️
              </div>

              <h3>Roads & Potholes</h3>

              <p>
                Damaged roads, potholes and unsafe streets.
              </p>

              <Link to="/report-issue" className="category-link">
                Report issue →
              </Link>

            </div>


            {/* WASTE */}
            <div className="issue-category">

              <div className="category-icon">
                🗑️
              </div>

              <h3>Waste Management</h3>

              <p>
                Garbage collection and waste disposal problems.
              </p>

              <Link to="/report-issue" className="category-link">
                Report issue →
              </Link>

            </div>


            {/* STREET LIGHT */}
            <div className="issue-category">

              <div className="category-icon">
                💡
              </div>

              <h3>Street Lights</h3>

              <p>
                Broken or non-functional street lights.
              </p>

              <Link to="/report-issue" className="category-link">
                Report issue →
              </Link>

            </div>


            {/* WATER */}
            <div className="issue-category">

              <div className="category-icon">
                💧
              </div>

              <h3>Water & Drainage</h3>

              <p>
                Water leakage, drainage and flooding issues.
              </p>

              <Link to="/report-issue" className="category-link">
                Report issue →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CIVICGUARDIAN
      ===================================================== */}
      <section className="why-section" id="about">

        <div className="why-container">

          {/* LEFT */}
          <div className="why-content">

            <div className="section-eyebrow">
              WHY CIVICGUARDIAN?
            </div>

            <h2 className="section-title">
              Your voice can
              <br />
              <span>change your city.</span>
            </h2>

            <p>
              CivicGuardian makes civic participation simple,
              transparent and actionable. Every report creates
              a direct connection between citizens and the
              people responsible for improving the city.
            </p>


            <div className="feature-list">

              <div className="feature-item">

                <div className="feature-check">
                  ✓
                </div>

                <div>
                  <strong>Easy Reporting</strong>
                  <span>
                    Report problems in just a few clicks.
                  </span>
                </div>

              </div>


              <div className="feature-item">

                <div className="feature-check">
                  ✓
                </div>

                <div>
                  <strong>Complete Transparency</strong>
                  <span>
                    Know what happens to your complaint.
                  </span>
                </div>

              </div>


              <div className="feature-item">

                <div className="feature-check">
                  ✓
                </div>

                <div>
                  <strong>Citizen Verification</strong>
                  <span>
                    Citizens help confirm successful resolutions.
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* RIGHT - STATUS CARD */}
          <div className="status-card">

            <div className="status-header">

              <div>
                <div className="status-title">
                  REPORT STATUS
                </div>

                <div className="status-name">
                  Street Light Issue
                </div>
              </div>

              <div className="status-badge">
                Resolved
              </div>

            </div>


            <div className="status-progress">

              <div className="status-step">

                <div className="status-dot">
                  ✓
                </div>

                <span>Reported</span>

              </div>


              <div className="status-step">

                <div className="status-dot">
                  ✓
                </div>

                <span>Assigned</span>

              </div>


              <div className="status-step">

                <div className="status-dot">
                  ✓
                </div>

                <span>In Progress</span>

              </div>


              <div className="status-step">

                <div className="status-dot">
                  ✓
                </div>

                <span>Resolved</span>

              </div>

            </div>


            <div className="status-details">

              <div className="status-detail">
                <span>Reported</span>
                <strong>12 Aug 2026</strong>
              </div>

              <div className="status-detail">
                <span>Department</span>
                <strong>Municipal Services</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="cta-section" id="report">

        <div className="cta-container">

          <div className="cta-content">

            <div className="cta-eyebrow">
              BUILD A BETTER CITY
            </div>

            <h2 className="cta-title">
              See a problem?
              <span>Report it.</span>
            </h2>

            <p className="cta-description">
              Your small action can make a big difference
              in your community.
            </p>

          </div>


          <Link to="/report-issue" className="primary-btn">
            Report an Issue
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-grid">

            {/* BRAND */}
            <div className="footer-brand">

              <div className="footer-logo">

                <div className="footer-logo-icon">
                  ✦
                </div>

                <span>
                  Civic<span>Guardian</span>
                </span>

              </div>

              <p>
                Empowering citizens to build cleaner,
                safer and smarter cities.
              </p>

            </div>


            {/* PLATFORM */}
            <div className="footer-column">

              <h4>Platform</h4>

              <Link to="/report-issue">
                Report an Issue
              </Link>

              <a href="#how-it-works">
                How It Works
              </a>

              <a href="#issues">
                Civic Issues
              </a>

            </div>


            {/* COMPANY */}
            <div className="footer-column">

              <h4>Company</h4>

              <a href="#about">
                About
              </a>

              <a href="#about">
                Contact
              </a>

              <a href="#about">
                Privacy
              </a>

            </div>


            {/* FOR CITIES */}
            <div className="footer-column">

              <h4>For Cities</h4>

              <a href="#about">
                City Dashboard
              </a>

              <a href="#about">
                Administration
              </a>

              <a href="#about">
                Partners
              </a>

            </div>

          </div>


          <div className="footer-bottom">

            <span>
              © 2026 CivicGuardian. All rights reserved.
            </span>

            <span>
              Smart City • Civic Technology
            </span>

          </div>

        </div>

      </footer>

    </>
  );
}

export default HomeSections;