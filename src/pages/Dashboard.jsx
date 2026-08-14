import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getIssues } from "../api/issues";
import "./Dashboard.css";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getIssues();

      setIssues(data.issues || []);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
      setError("Unable to load reported issues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  /* =========================
     STATISTICS
  ========================= */

  const totalIssues = issues.length;

  const reportedIssues = issues.filter(
    (issue) => issue.status === "Reported"
  ).length;

  const inProgressIssues = issues.filter(
    (issue) =>
      issue.status === "Assigned" ||
      issue.status === "In Progress"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Assigned":
        return "status-assigned";

      case "In Progress":
        return "status-progress";

      case "Resolved":
        return "status-resolved";

      default:
        return "status-reported";
    }
  };

  /* =========================
     FORMAT DATE
  ========================= */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="dashboard-header">

        <div>

          <Link
            to="/"
            className="dashboard-back"
          >
            ← Back to Home
          </Link>

          <div className="dashboard-label">
            CIVICGUARDIAN DASHBOARD
          </div>

          <h1>
            Shape Your City
          </h1>

          <p>
            Track civic issues, monitor their progress, and make a difference in your community.
          </p>

        </div>

        <Link
          to="/report-issue"
          className="dashboard-report-btn"
        >
          + Report New Issue
        </Link>

      </header>


      {/* =========================
          STATISTICS
      ========================= */}

      <section className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <span className="stat-label">
              Total Issues
            </span>

            <strong>
              {totalIssues}
            </strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📢
          </div>

          <div>
            <span className="stat-label">
              Reported
            </span>

            <strong>
              {reportedIssues}
            </strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🔄
          </div>

          <div>
            <span className="stat-label">
              In Progress
            </span>

            <strong>
              {inProgressIssues}
            </strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>
            <span className="stat-label">
              Resolved
            </span>

            <strong>
              {resolvedIssues}
            </strong>
          </div>

        </div>

      </section>


      {/* =========================
          ISSUES SECTION
      ========================= */}

      <section className="issues-section">

        <div className="issues-section-header">

          <div>

            <div className="section-label">
              RECENT REPORTS
            </div>

            <h2>
              Reported Civic Issues
            </h2>

          </div>

          <button
            className="refresh-btn"
            onClick={fetchIssues}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>

        </div>


        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <div className="dashboard-message">
            Loading reported issues...
          </div>
        )}


        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (
          <div className="dashboard-message error">
            {error}
          </div>
        )}


        {/* =========================
            EMPTY STATE
        ========================= */}

        {!loading && !error && issues.length === 0 && (

          <div className="empty-issues">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No issues reported yet
            </h3>

            <p>
              Be the first citizen to report a civic issue
              in your area.
            </p>

            <Link
              to="/report-issue"
              className="empty-report-btn"
            >
              Report an Issue
            </Link>

          </div>

        )}


        {/* =========================
            ISSUE CARDS
        ========================= */}

        {!loading && !error && issues.length > 0 && (

          <div className="issues-grid">

            {issues.map((issue) => (

              <article
                className="issue-card"
                key={issue._id}
              >

                {/* CARD TOP */}

                <div className="issue-card-top">

                  <span className="issue-category">
                    {issue.category}
                  </span>

                  <span
                    className={`issue-priority priority-${issue.priority}`}
                  >
                    {issue.priority}
                  </span>

                </div>


                {/* TITLE */}

                <h3>
                  {issue.title}
                </h3>


                {/* DESCRIPTION */}

                <p className="issue-description">
                  {issue.description}
                </p>


                {/* LOCATION */}

                {issue.location && (
                  <div className="issue-location">
                    📍{" "}
                    {Number(issue.location.lat).toFixed(5)}
                    {", "}
                    {Number(issue.location.lng).toFixed(5)}
                  </div>
                )}


                {/* CARD BOTTOM */}

                <div className="issue-card-bottom">

                  <span
                    className={`issue-status ${getStatusClass(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>

                  <span className="issue-date">
                    {formatDate(issue.createdAt)}
                  </span>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Dashboard;