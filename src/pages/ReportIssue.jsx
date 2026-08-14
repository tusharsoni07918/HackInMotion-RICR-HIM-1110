import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import "./ReportIssue.css";


/* ================= LOCATION MARKER ================= */

function LocationMarker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}


/* ================= REPORT ISSUE ================= */

function ReportIssue() {
  const navigate = useNavigate();

  /* ================= STATES ================= */

  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  /* ================= REMOVE PHOTO ================= */

  const removePhoto = () => {
    if (photo) {
      URL.revokeObjectURL(photo);
    }

    setPhoto(null);
  };


  /* ================= PHOTO CHANGE ================= */

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (photo) {
      URL.revokeObjectURL(photo);
    }

    setPhoto(URL.createObjectURL(file));
  };


  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
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

    if (!location) {
      alert("Please select the issue location on the map.");
      return;
    }


    /* ================= GET TOKEN ================= */

    const token = localStorage.getItem("civicGuardianToken");

    if (!token) {
      alert("Please login before reporting an issue.");
      navigate("/login");
      return;
    }


    setLoading(true);
    setSubmitted(false);


    try {
      /* ================= API REQUEST ================= */

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


      /* ================= AUTHENTICATION ERROR ================= */

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("civicGuardianToken");
        localStorage.removeItem("civicGuardianUser");

        alert(
          `${data.message || "Your login session is invalid or expired."} Please login again.`
        );

        navigate("/login");
        return;
      }


      /* ================= BACKEND ERROR ================= */

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to submit the issue. Please try again."
        );

        return;
      }


      /* ================= SUCCESS ================= */

      console.log(
        "Issue created successfully:",
        data
      );

      setSubmitted(true);


      /* ================= RESET FORM ================= */

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


  return (
    <div className="report-page">

      <div className="report-container">

        {/* ================= HEADER ================= */}

        <div className="report-header">

          <Link
            to="/"
            className="back-link"
          >
            ← Back to Home
          </Link>

          <p className="section-label">
            CITIZEN REPORT
          </p>

          <h1>
            Report a Civic Issue
          </h1>

          <p>
            Help your city identify and resolve problems faster.
          </p>

        </div>


        {/* ================= FORM CARD ================= */}

        <div className="report-card">

          {/* ================= ISSUE TITLE ================= */}

          <div className="form-group">

            <label>
              Issue Title
            </label>

            <input
              type="text"
              placeholder="e.g. Large pothole near main road"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          {/* ================= CATEGORY ================= */}

          <div className="form-group">

            <label>
              Issue Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="">
                Select a category
              </option>

              <option value="roads">
                Roads
              </option>

              <option value="sanitation">
                Sanitation
              </option>

              <option value="electricity">
                Electricity
              </option>

              <option value="water">
                Water
              </option>

              <option value="public-property">
                Public Property
              </option>

              <option value="drainage">
                Drainage
              </option>

            </select>

          </div>


          {/* ================= DESCRIPTION ================= */}

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
            />

          </div>


          {/* ================= MAP ================= */}

          <div className="form-group">

            <label>
              Issue Location
            </label>

            <div className="map-wrapper">

              <MapContainer
                center={[23.2599, 77.4126]}
                zoom={13}
                className="issue-map"
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                  setLocation={setLocation}
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


            {/* ================= LOCATION INFO ================= */}

            {location ? (

              <p className="location-text">
                📍 Location selected:{" "}
                {location.lat.toFixed(5)}
                {", "}
                {location.lng.toFixed(5)}
              </p>

            ) : (

              <p className="location-hint">
                Click on the map to select the issue location.
              </p>

            )}

          </div>


          {/* ================= PHOTO ================= */}

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


          {/* ================= PRIORITY ================= */}

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


          {/* ================= SUBMIT ================= */}

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


          {/* ================= SUCCESS MESSAGE ================= */}

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
                  You can track its progress from your dashboard.
                </p>

                <Link to="/dashboard">
                  Go to Dashboard →
                </Link>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


export default ReportIssue;