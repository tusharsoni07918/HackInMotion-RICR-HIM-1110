function HomeSections() {
  return (
    <>
      <section className="stats-section">
        <div className="stats-container">

          <div className="stat-item">
            <div className="stat-number">1,240+</div>
            <div className="stat-label">Issues Reported</div>
          </div>

          <div className="stat-item">
            <div className="stat-number">890+</div>
            <div className="stat-label">Issues Resolved</div>
          </div>

          <div className="stat-item">
            <div className="stat-number">32</div>
            <div className="stat-label">City Wards</div>
          </div>

          <div className="stat-item">
            <div className="stat-number">94%</div>
            <div className="stat-label">Citizen Satisfaction</div>
          </div>

        </div>
      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-container">

          <div className="section-heading">

            <span>HOW IT WORKS</span>

            <h2>
              Report. Track. <b>Resolve.</b>
            </h2>

            <p>
              CivicGuardian connects citizens with city
              administrators to solve civic problems faster.
            </p>

          </div>


          <div className="steps-grid">

            {/* STEP 01 */}

            <div className="step-card">

              <div className="step-top">
                <span>01</span>

                <div className="step-icon">
                  📍
                </div>
              </div>

              <h3>Report an Issue</h3>

              <p>
                Report potholes, garbage, broken streetlights,
                water leakage and other civic problems.
              </p>

              <a href="#report">
                Report now →
              </a>

            </div>


            {/* STEP 02 */}

            <div className="step-card">

              <div className="step-top">
                <span>02</span>

                <div className="step-icon">
                  🧭
                </div>
              </div>

              <h3>Smart Routing</h3>

              <p>
                Your complaint is automatically categorized
                and routed to the responsible department.
              </p>

              <a href="#how-it-works">
                Automated process →
              </a>

            </div>


            {/* STEP 03 */}

            <div className="step-card">

              <div className="step-top">
                <span>03</span>

                <div className="step-icon">
                  📈
                </div>
              </div>

              <h3>Track Progress</h3>

              <p>
                Track your complaint from reporting to
                resolution with complete transparency.
              </p>

              <a href="#how-it-works">
                Real-time tracking →
              </a>

            </div>


            {/* STEP 04 */}

            <div className="step-card">

              <div className="step-top">
                <span>04</span>

                <div className="step-icon">
                  🛡️
                </div>
              </div>

              <h3>Verify Resolution</h3>

              <p>
                Citizens can verify whether the reported
                issue has actually been resolved.
              </p>

              <a href="#how-it-works">
                Citizen verified →
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CIVIC ISSUES
      ========================================= */}

      <section className="issues-section">

        <div className="section-container">

          <div className="section-heading center">

            <span>CIVIC ISSUES</span>

            <h2>
              What Can You <b>Report?</b>
            </h2>

            <p>
              Help your city identify and resolve everyday
              problems affecting your community.
            </p>

          </div>


          <div className="issues-grid">

            <div className="issue-card">

              <div className="issue-icon">
                🛣️
              </div>

              <h3>Roads & Potholes</h3>

              <p>
                Damaged roads, potholes and unsafe streets.
              </p>

              <a href="#report">
                Report issue →
              </a>

            </div>


            <div className="issue-card">

              <div className="issue-icon green">
                🗑️
              </div>

              <h3>Waste Management</h3>

              <p>
                Garbage collection and waste disposal problems.
              </p>

              <a href="#report">
                Report issue →
              </a>

            </div>


            <div className="issue-card">

              <div className="issue-icon yellow">
                💡
              </div>

              <h3>Street Lights</h3>

              <p>
                Broken or non-functional street lights.
              </p>

              <a href="#report">
                Report issue →
              </a>

            </div>


            <div className="issue-card">

              <div className="issue-icon purple">
                💧
              </div>

              <h3>Water & Drainage</h3>

              <p>
                Water leakage, drainage and flooding issues.
              </p>

              <a href="#report">
                Report issue →
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          ABOUT
      ========================================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-container">

          <div className="about-content">

            <span className="section-label">
              WHY CIVICGUARDIAN?
            </span>

            <h2>
              Your voice can
              <br />
              <b>change your city.</b>
            </h2>

            <p>
              CivicGuardian makes civic participation simple,
              transparent and actionable. Every report creates
              a direct connection between citizens and the
              people responsible for improving the city.
            </p>


            <div className="about-points">

              <div>
                <span>✓</span>

                <div>
                  <strong>Easy Reporting</strong>

                  <small>
                    Report problems in just a few clicks.
                  </small>
                </div>
              </div>


              <div>
                <span>✓</span>

                <div>
                  <strong>Complete Transparency</strong>

                  <small>
                    Know what happens to your complaint.
                  </small>
                </div>
              </div>


              <div>
                <span>✓</span>

                <div>
                  <strong>Citizen Verification</strong>

                  <small>
                    Citizens help confirm successful resolutions.
                  </small>
                </div>
              </div>

            </div>

          </div>


          {/* Dashboard visual */}

          <div className="dashboard">

            <div className="dashboard-header">

              <div>
                <small>REPORT STATUS</small>

                <h3>
                  Street Light Issue
                </h3>
              </div>

              <span>
                Resolved
              </span>

            </div>


            <div className="progress">

              <div className="progress-item done">
                <span>✓</span>
                <div></div>
              </div>

              <div className="progress-item done">
                <span>✓</span>
                <div></div>
              </div>

              <div className="progress-item done">
                <span>✓</span>
                <div></div>
              </div>

              <div className="progress-item done">
                <span>✓</span>
              </div>

            </div>


            <div className="progress-labels">

              <span>Reported</span>

              <span>Assigned</span>

              <span>In Progress</span>

              <span>Resolved</span>

            </div>


            <div className="dashboard-info">

              <div>
                <small>Reported</small>

                <strong>
                  12 Aug 2026
                </strong>
              </div>

              <div>
                <small>Department</small>

                <strong>
                  Municipal Services
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section
        className="cta-section"
        id="report"
      >

        <div className="cta-container">

          <div>

            <span>
              BUILD A BETTER CITY
            </span>

            <h2>
              See a problem?
              <br />
              <b>Report it.</b>
            </h2>

            <p>
              Your small action can make a big difference
              in your community.
            </p>

          </div>


          <button className="cta-button">

            Report an Issue

            <span>→</span>

          </button>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <div className="footer-logo">

              <span>✦</span>

              Civic<span>Guardian</span>

            </div>

            <p>
              Empowering citizens to build cleaner,
              safer and smarter cities.
            </p>

          </div>


          <div className="footer-column">

            <h4>
              Platform
            </h4>

            <a href="#report">
              Report an Issue
            </a>

            <a href="#how-it-works">
              How It Works
            </a>

            <a href="#home">
              Track Issues
            </a>

          </div>


          <div className="footer-column">

            <h4>
              Company
            </h4>

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


          <div className="footer-column">

            <h4>
              For Cities
            </h4>

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

      </footer>

    </>
  );
}

export default HomeSections;