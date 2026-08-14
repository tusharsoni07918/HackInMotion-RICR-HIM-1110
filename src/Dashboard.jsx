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

      setError(
        err.message || "Unable to load reported issues."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";

      case "medium":
        return "priority-medium";

      default:
        return "priority-low";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "—";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <header className="dashboard-header">

        <div>
          <Link
            to="/"
            className="dashboard-back"
          >
            ← Back to Home
          </Link>

          <div className="dashboard-label">
            CIVICGUARDIAN
          </div>

          <h1>
            Issue Dashboard
          </h1>

          <p>
            Track and monitor civic issues reported by citizens.
          </p>
        </div>

        <Link
          to="/report-issue"
          className="dashboard-report-btn"
        >
          + Report Issue
        </Link>

      </header>


      {/* STATISTICS */}

      <section className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">📋</div>

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
          <div className="stat-icon">📢</div>

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
          <div className="stat-icon">🔄</div>

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
          <div className="stat-icon">✓</div>

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


      {/* RECENT ISSUES */}

      <section className="issues-section">

        <div className="issues-section-header">

          <div>
            <div className="section-label">
              CIVIC ISSUE TRACKING
            </div>

            <h2>
              Recent Issues
            </h2>

            <p>
              View the latest civic complaints reported by citizens.
            </p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchIssues}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>

        </div>


        {/* ERROR */}

        {error && (
          <div className="dashboard-message error">
            {error}
          </div>
        )}


        {/* LOADING */}

        {loading && !error && (
          <div className="dashboard-message">
            Loading reported issues...
          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          issues.length === 0 && (
            <div className="empty-issues">

              <div className="empty-icon">
                📋
              </div>

              <h3>
                No issues reported yet
              </h3>

              <p>
                Civic issues reported by citizens will appear here.
              </p>

              <Link
                to="/report-issue"
                className="empty-report-btn"
              >
                Report First Issue
              </Link>

            </div>
          )}


        {/* ISSUE GRID */}

        {!loading &&
          !error &&
          issues.length > 0 && (
            <div className="issues-grid">

              {issues.map((issue) => (

                <article
                  className="issue-card"
                  key={issue._id}
                >

                  <div className="issue-card-top">

                    <span className="issue-category">
                      {issue.category || "General"}
                    </span>

                    <span
                      className={`issue-priority ${getPriorityClass(
                        issue.priority
                      )}`}
                    >
                      {issue.priority || "low"}
                    </span>

                  </div>


                  <h3>
                    {issue.title || "Untitled Issue"}
                  </h3>


                  <p className="issue-description">
                    {issue.description ||
                      "No description provided."}
                  </p>


                  {issue.location &&
                    issue.location.lat !== undefined &&
                    issue.location.lng !== undefined && (
                      <div className="issue-location">
                        📍{" "}
                        {Number(issue.location.lat).toFixed(5)}
                        {", "}
                        {Number(issue.location.lng).toFixed(5)}
                      </div>
                    )}


                  <div className="issue-card-bottom">

                    <span
                      className={`issue-status ${getStatusClass(
                        issue.status
                      )}`}
                    >
                      {issue.status || "Reported"}
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