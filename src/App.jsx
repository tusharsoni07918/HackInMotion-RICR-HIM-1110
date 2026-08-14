import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeSections from "./components/HomeSections";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportIssue from "./pages/ReportIssue";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";


/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  return (
    <div className="app">

      <Navbar />

      <main>
        <Hero />
        <HomeSections />
      </main>

    </div>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            LOGGED-IN CITIZEN ROUTES
        ================================================= */}

        <Route
          element={
            <ProtectedRoute allowedRole="citizen" />
          }
        >

          {/* REPORT ISSUE */}

          <Route
            path="/report-issue"
            element={<ReportIssue />}
          />

          {/* CITIZEN DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>


        {/* =================================================
            ADMIN ROUTES
        ================================================= */}

        <Route
          element={
            <ProtectedRoute allowedRole="admin" />
          }
        >

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

        </Route>


      </Routes>

    </BrowserRouter>
  );
}


export default App;