const API_BASE_URL = "http://localhost:5000/api/issues";

/* =========================================================
   GET TOKEN
========================================================= */

const getToken = () => {
  return localStorage.getItem("civicGuardianToken");
};


/* =========================================================
   AUTH HEADERS
========================================================= */

const getAuthHeaders = () => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


/* =========================================================
   GET ALL ISSUES
========================================================= */

export const getIssues = async () => {
  const token = getToken();

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch issues."
    );
  }

  return data;
};


/* =========================================================
   CREATE ISSUE
========================================================= */

export const createIssue = async (issueData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",

    headers: getAuthHeaders(),

    body: JSON.stringify(issueData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create issue."
    );
  }

  return data;
};


/* =========================================================
   UPDATE ISSUE
========================================================= */

export const updateIssue = async (
  issueId,
  issueData
) => {
  const response = await fetch(
    `${API_BASE_URL}/${issueId}`,
    {
      method: "PUT",

      headers: getAuthHeaders(),

      body: JSON.stringify(issueData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update issue."
    );
  }

  return data;
};


/* =========================================================
   DELETE ISSUE
========================================================= */

export const deleteIssue = async (issueId) => {
  const response = await fetch(
    `${API_BASE_URL}/${issueId}`,
    {
      method: "DELETE",

      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete issue."
    );
  }

  return data;
};