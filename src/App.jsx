import { BrowserRouter, Routes, Route } from "react-router-dom";


import ReportIssue from "./pages/ReportIssue";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeSections from "./components/HomeSections";

import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeSections />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/report-issue" element={<ReportIssue />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;