import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem("civicGuardianToken");

  const userData = localStorage.getItem("civicGuardianUser");

  /* =====================================================
     NOT LOGGED IN
  ===================================================== */

  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  /* =====================================================
     GET USER
  ===================================================== */

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    localStorage.removeItem("civicGuardianToken");
    localStorage.removeItem("civicGuardianUser");

    return <Navigate to="/login" replace />;
  }

  /* =====================================================
     ROLE CHECK
  ===================================================== */

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  /* =====================================================
     ALLOWED
  ===================================================== */

  if (children) {
    return children;
  }

  return <Outlet />;
}

export default ProtectedRoute;