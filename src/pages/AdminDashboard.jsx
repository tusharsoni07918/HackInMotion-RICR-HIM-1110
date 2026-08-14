import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getIssues,
  updateIssue,
  deleteIssue,
} from "../api/issues";

import "./AdminDashboard.css";

const STATUS_OPTIONS = [
  "Reported",
  "Assigned",
  "In Progress",
  "Resolved",
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");


  /* =========================================================
     ADMIN ACCESS
  ========================================================= */

  const checkAdminAccess = () => {
    const token = localStorage.getItem(
      "civicGuardianToken"
    );

    const userData = localStorage.getItem(
      "civicGuardianUser"
    );

    if (!token || !userData) {
      navigate("/login");
      return false;
    }

    try {
      const user = JSON.parse(userData);

      if (user.role !== "admin") {
        navigate("/dashboard");
        return false;
      }

      return true;

    } catch (err) {
      console.error("User data error:", err);

      localStorage.removeItem(
        "civicGuardianToken"
      );

      localStorage.removeItem(
        "civicGuardianUser"
      );

      navigate("/login");

      return false;
    }
  };


  /* =========================================================
     FETCH ISSUES
  ========================================================= */

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getIssues();

      setIssues(data.issues || []);

    } catch (err) {
      console.error(
        "Admin dashboard error:",
        err
      );

      setError(
        err.message ||
        "Unable to load civic issues."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    if (checkAdminAccess()) {
      fetchIssues();
    }
  }, []);


  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const updateStatus = async (
    issueId,
    newStatus
  ) => {
    try {
      setUpdatingId(issueId);
      setError("");

      const data = await updateIssue(
        issueId,
        {
          status: newStatus,
        }
      );

      setIssues((currentIssues) =>
        currentIssues.map((issue) =>
          issue._id === issueId
            ? {
                ...issue,
                status:
                  data.issue?.status ||
                  newStatus,
              }
            : issue
        )
      );

    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err.message ||
        "Failed to update issue status."
      );

    } finally {
      setUpdatingId(null);
    }
  };


  /* =========================================================
     DELETE ISSUE
  ========================================================= */

  const handleDelete = async (issueId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(issueId);
      setError("");

      await deleteIssue(issueId);

      setIssues((currentIssues) =>
        currentIssues.filter(
          (issue) => issue._id !== issueId
        )
      );

    } catch (err) {
      console.error(
        "Delete issue error:",
        err
      );

      setError(
        err.message ||
        "Failed to delete issue."
      );

    } finally {
      setDeletingId(null);
    }
  };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "civicGuardianToken"
    );

    localStorage.removeItem(
      "civicGuardianUser"
    );

    navigate("/login");
  };


  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalIssues = issues.length;

  const reportedIssues = issues.filter(
    (issue) =>
      issue.status === "Reported"
  ).length;

  const assignedIssues = issues.filter(
    (issue) =>
      issue.status === "Assigned"
  ).length;

  const progressIssues = issues.filter(
    (issue) =>
      issue.status === "In Progress"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) =>
      issue.status === "Resolved"
  ).length;


  /* =========================================================
     PRIORITY CLASS
  ========================================================= */

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "admin-priority-high";

      case "medium":
        return "admin-priority-medium";

      default:
        return "admin-priority-low";
    }
  };


  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Assigned":
        return "admin-status-assigned";

      case "In Progress":
        return "admin-status-progress";

      case "Resolved":
        return "admin-status-resolved";

      default:
        return "admin-status-reported";
    }
  };


  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const formattedDate =
      new Date(date);

    if (
      Number.isNaN(
        formattedDate.getTime()
      )
    ) {
      return "—";
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="admin-dashboard">

      {/* HEADER */}

      <header className="admin-header">

        <div className="admin-header-content">

          <Link
            to="/"
            className="admin-back"
          >
            ← Back to Home
          </Link>

          <div className="admin-label">
            CIVICGUARDIAN ADMIN
          </div>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Monitor civic complaints and manage
            their resolution status.
          </p>

        </div>


        <div className="admin-header-actions">

          <Link
            to="/dashboard"
            className="admin-citizen-btn"
          >
            View Citizen Dashboard
          </Link>

          <button
            type="button"
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* STATISTICS */}

      <section className="admin-stats">

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            📋
          </div>

          <div>
            <span>
              Total Issues
            </span>

            <strong>
              {totalIssues}
            </strong>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            📢
          </div>

          <div>
            <span>
              Reported
            </span>

            <strong>
              {reportedIssues}
            </strong>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            👷
          </div>

          <div>
            <span>
              Assigned
            </span>

            <strong>
              {assignedIssues}
            </strong>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🔄
          </div>

          <div>
            <span>
              In Progress
            </span>

            <strong>
              {progressIssues}
            </strong>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ✓
          </div>

          <div>
            <span>
              Resolved
            </span>

            <strong>
              {resolvedIssues}
            </strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          ADMIN ISSUE MANAGEMENT
          ONLY ONE HEADING
      ===================================================== */}

      <section className="admin-issues-section">

        <div className="admin-section-header">

          <div>

            <div className="admin-section-label">
              ISSUE MANAGEMENT
            </div>

            <h2>
              Civic Issues
            </h2>

            <p>
              Review reported complaints and manage
              their current status.
            </p>

          </div>


          <button
            type="button"
            className="admin-refresh-btn"
            onClick={fetchIssues}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "↻ Refresh"}
          </button>

        </div>


        {/* ERROR */}

        {error && (
          <div className="admin-error">

            <span>⚠</span>

            {error}

          </div>
        )}


        {/* LOADING */}

        {loading && !error && (
          <div className="admin-message">

            <div className="admin-loader"></div>

            <p>
              Loading civic issues...
            </p>

          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          issues.length === 0 && (

            <div className="admin-empty">

              <div className="admin-empty-icon">
                📋
              </div>

              <h3>
                No civic issues reported yet
              </h3>

              <p>
                New complaints will appear here
                automatically.
              </p>

              <Link
                to="/report-issue"
                className="admin-report-btn"
              >
                Report an Issue
              </Link>

            </div>
          )}


        {/* TABLE */}

        {!loading &&
          !error &&
          issues.length > 0 && (

            <div className="admin-table-container">

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>
                      <th>Issue</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Location</th>
                      <th>Reported</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                  </thead>


                  <tbody>

                    {issues.map((issue) => (

                      <tr
                        key={issue._id}
                      >

                        {/* ISSUE */}

                        <td className="admin-issue-cell">

                          <div className="admin-issue-title">
                            {issue.title ||
                              "Untitled Issue"}
                          </div>

                          <div className="admin-issue-description">
                            {issue.description ||
                              "No description provided."}
                          </div>

                        </td>


                        {/* CATEGORY */}

                        <td>

                          <span className="admin-category">
                            {issue.category ||
                              "General"}
                          </span>

                        </td>


                        {/* PRIORITY */}

                        <td>

                          <span
                            className={`admin-priority ${getPriorityClass(
                              issue.priority
                            )}`}
                          >
                            {issue.priority ||
                              "low"}
                          </span>

                        </td>


                        {/* LOCATION */}

                        <td>

                          {issue.location &&
                            issue.location.lat !==
                              undefined &&
                            issue.location.lng !==
                              undefined ? (

                            <span className="admin-location">

                              {Number(
                                issue.location.lat
                              ).toFixed(4)}

                              {", "}

                              {Number(
                                issue.location.lng
                              ).toFixed(4)}

                            </span>

                          ) : (

                            <span className="admin-no-location">
                              —
                            </span>

                          )}

                        </td>


                        {/* DATE */}

                        <td>

                          <span className="admin-date">
                            {formatDate(
                              issue.createdAt
                            )}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <div className="admin-status-wrapper">

                            <select
                              className={`admin-status-select ${getStatusClass(
                                issue.status
                              )}`}
                              value={
                                issue.status ||
                                "Reported"
                              }
                              disabled={
                                updatingId ===
                                  issue._id ||
                                deletingId ===
                                  issue._id
                              }
                              onChange={(event) =>
                                updateStatus(
                                  issue._id,
                                  event.target.value
                                )
                              }
                            >

                              {STATUS_OPTIONS.map(
                                (status) => (

                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status}
                                  </option>

                                )
                              )}

                            </select>


                            {updatingId ===
                              issue._id && (

                              <span className="admin-updating">
                                Saving...
                              </span>

                            )}

                          </div>

                        </td>


                        {/* DELETE */}

                        <td>

                          <button
                            type="button"
                            className="admin-delete-btn"
                            disabled={
                              deletingId ===
                                issue._id ||
                              updatingId ===
                                issue._id
                            }
                            onClick={() =>
                              handleDelete(
                                issue._id
                              )
                            }
                          >
                            {deletingId ===
                            issue._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </section>

    </div>
  );
}

export default AdminDashboard;