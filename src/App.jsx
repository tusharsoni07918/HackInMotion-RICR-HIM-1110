import { BrowserRouter, Route, Routes } from "react-router-dom";

import Hero from "./components/Hero";
import HomeSections from "./components/HomeSections";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportIssue from "./pages/ReportIssue";

import "./App.css";


/* ================= HOME PAGE ================= */

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeSections />
    </>
  );
}


/* ================= APP ================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Report Issue Form */}
        <Route
          path="/report-issue"
          element={<ReportIssue />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;