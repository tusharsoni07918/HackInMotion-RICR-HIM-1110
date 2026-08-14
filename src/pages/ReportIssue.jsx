import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import { Link, useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";

/* =========================================================
   LOCATION MARKER
========================================================= */

function LocationMarker({ setLocation, disabled }) {
  useMapEvents({
    click(e) {
      if (disabled) return;

      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

/* =========================================================
   REPORT ISSUE
========================================================= */

function ReportIssue() {
  const navigate = useNavigate();

  /* =======================================================
     STATES
  ======================================================= */

  const [location, setLocation] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* =======================================================
     CHECK LOGIN
  ======================================================= */

  useEffect(() => {
    const token = localStorage.getItem("civicGuardianToken");
    const user = localStorage.getItem("civicGuardianUser");

    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /* =======================================================
     LOGIN REDIRECT
  ======================================================= */

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  /* =======================================================
     PHOTO HANDLING
  ======================================================= */

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Photo size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPhoto(previewUrl);
  };

  /* =======================================================
     REMOVE PHOTO
  ======================================================= */

  const removePhoto = () => {
    if (photo) {
      URL.revokeObjectURL(photo);
    }

    setPhoto(null);
    setPhotoFile(null);
  };

  /* =======================================================
     CLEAN PHOTO URL
  ======================================================= */

  useEffect(() => {
    return () => {
      if (photo) {
        URL.revokeObjectURL(photo);
      }
    };
  }, [photo]);

  /* =======================================================
     SUBMIT ISSUE
  ======================================================= */

  const handleSubmit = async () => {
    /* =====================================================
       CHECK AUTHENTICATION
    ===================================================== */

    const token = localStorage.getItem("civicGuardianToken");
    const userData = localStorage.getItem("civicGuardianUser");

    if (!token || !userData) {
      alert(
        "Please login or register before reporting an issue."
      );

      navigate("/login");
      return;
    }

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!title.trim()) {
      alert("Please enter issue title.");
      return;
    }

    if (!category) {
      alert("Please select an issue category.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe the issue.");
      return;
    }

    if (description.trim().length < 10) {
      alert(
        "Please provide at least 10 characters in the description."
      );
      return;
    }

    if (!location) {
      alert("Please select the issue location on the map.");
      return;
    }

    /* =====================================================
       SEND REQUEST
    ===================================================== */

    try {
      setLoading(true);
      setSubmitted(false);

      const response = await fetch(
        "http://localhost:5000/api/issues",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: title.trim(),
            category,
            description: description.trim(),

            location: {
              lat: Number(location.lat),
              lng: Number(location.lng),
            },

            priority,
          }),
        }
      );

      const data = await response.json();

      /* ===================================================
         AUTHENTICATION ERROR
      =================================================== */

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("civicGuardianToken");
        localStorage.removeItem("civicGuardianUser");

        setIsLoggedIn(false);

        const message =
          data.message ||
          "Your login session is invalid or expired.";

        alert(`${message} Please login again.`);

        navigate("/login");
        return;
      }

      /* ===================================================
         BACKEND ERROR
      =================================================== */

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to submit the issue. Please try again."
        );

        return;
      }

      /* ===================================================
         SUCCESS
      =================================================== */

      console.log(
        "Issue created successfully:",
        data
      );

      setSubmitted(true);

      /* ===================================================
         RESET FORM
      =================================================== */

      setTitle("");
      setCategory("");
      setDescription("");
      setPriority("low");
      setLocation(null);

      removePhoto();

    } catch (error) {
      console.error(
        "Error reporting issue:",
        error
      );

      alert(
        "Unable to connect to the server. Please check that the backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     NOT LOGGED IN UI
  ========================================================= */

  if (!isLoggedIn) {
    return (
      <div className="report-page">

        <div className="report-header">

          <Link
            to="/"
            className="back-link"
          >
            ← Back to Home
          </Link>

          <div className="section-label">
            CIVIC REPORTING
          </div>

          <h1>
            Report a Civic Issue
          </h1>

          <p>
            Please login or register before reporting
            a civic issue.
          </p>

        </div>

        <div className="report-card">

          <div className="login-required">

            <div className="success-icon">
              🔐
            </div>

            <h2>
              Login Required
            </h2>

            <p>
              Only registered and logged-in citizens
              can report civic issues.
            </p>

            <button
              type="button"
              className="submit-issue-btn"
              onClick={handleLoginRedirect}
            >
              Login to Report Issue
            </button>

            <p>
              Don't have an account?{" "}

              <Link to="/register">
                Register here
              </Link>
            </p>

          </div>

        </div>

      </div>
    );
  }

  /* =========================================================
     LOGGED-IN USER UI
  ========================================================= */

  return (
    <div className="report-page">

      {/* HEADER */}

      <div className="report-header">

        <Link
          to="/"
          className="back-link"
        >
          ← Back to Home
        </Link>

        <div className="section-label">
          CIVIC REPORTING
        </div>

        <h1>
          Report a Civic Issue
        </h1>

        <p>
          Help make your city better by reporting
          civic issues.
        </p>

      </div>

      {/* FORM CARD */}

      <div className="report-card">

        {/* ISSUE TITLE */}

        <div className="form-group">

          <label>
            Issue Title
          </label>

          <input
            type="text"
            placeholder="e.g. Large pothole on main road"
            value={title}
            maxLength={100}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            disabled={loading}
          />

          <p className="character-count">
            {title.length}/100 characters

            {title.length >= 90 &&
              title.length < 100 && (
                <span>
                  {" "}— Almost at the limit
                </span>
              )}

            {title.length === 100 && (
              <span>
                {" "}— Maximum limit reached
              </span>
            )}
          </p>

        </div>

        {/* CATEGORY */}

        <div className="form-group">

          <label>
            Issue Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            disabled={loading}
          >

            <option value="">
              Select category
            </option>

            <option value="Road">
              Road & Potholes
            </option>

            <option value="Electricity">
              Electricity
            </option>

            <option value="Water">
              Water Supply
            </option>

            <option value="Garbage">
              Garbage & Waste
            </option>

            <option value="Street Light">
              Street Lights
            </option>

            <option value="Drainage">
              Drainage
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Describe the issue in detail..."
            value={description}
            maxLength={500}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            disabled={loading}
          />

          <p className="character-count">
            {description.length}/500 characters
          </p>

        </div>

        {/* MAP */}

        <div className="form-group">

          <label>
            Issue Location
          </label>

          <div className="map-wrapper">

            <MapContainer
              center={[
                23.2599,
                77.4126,
              ]}
              zoom={13}
              className="issue-map"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <LocationMarker
                setLocation={setLocation}
                disabled={loading}
              />

              {location && (
                <Marker
                  position={[
                    location.lat,
                    location.lng,
                  ]}
                />
              )}

            </MapContainer>

          </div>

          {location ? (
            <p className="location-text">
              📍 Location selected:{" "}
              {location.lat.toFixed(5)}
              {", "}
              {location.lng.toFixed(5)}
            </p>
          ) : (
            <p className="location-hint">
              Click on the map to select the
              issue location.
            </p>
          )}

        </div>

        {/* PHOTO EVIDENCE */}

        <div className="form-group">

          <label>
            Photo Evidence
          </label>

          <div className="upload-box">

            {!photo ? (
              <>

                <span className="upload-icon">
                  📷
                </span>

                <p>
                  Upload a photo of the issue
                </p>

                <label className="upload-btn">

                  Choose Photo

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={loading}
                    onChange={handlePhotoChange}
                  />

                </label>

              </>
            ) : (

              <div className="photo-preview">

                <img
                  src={photo}
                  alt="Issue preview"
                />

                <button
                  type="button"
                  className="remove-photo"
                  onClick={removePhoto}
                  disabled={loading}
                >
                  Remove Photo
                </button>

              </div>

            )}

          </div>

        </div>

        {/* PRIORITY */}

        <div className="form-group">

          <label>
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            disabled={loading}
          >

            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>

          </select>

        </div>

        {/* SUBMIT */}

        <button
          type="button"
          className="submit-issue-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Issue"}
        </button>

        {/* SUCCESS MESSAGE */}

        {submitted && (
          <div className="success-message">

            <div className="success-icon">
              ✓
            </div>

            <div>

              <h3>
                Issue Reported Successfully!
              </h3>

              <p>
                Your civic issue has been submitted.
                You can track its progress from your
                dashboard.
              </p>

              <Link to="/dashboard">
                Go to Dashboard →
              </Link>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ReportIssue;