import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing, Login, Register
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Artist
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import UploadArtwork from "./pages/artist/UploadArtwork";
import Reports from "./pages/artist/Reports";

// Collector
import CollectorDashboard from "./pages/collector/CollectorDashboard";
import Explore from "./pages/collector/Explore";
import ArtworkDetail from "./pages/collector/ArtworkDetails"; // singular, default export

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Artist */}
        <Route path="/artist-dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/upload-artwork" element={<UploadArtwork />} />
        <Route path="/artist/reports" element={<Reports />} />

        {/* Collector */}
        <Route path="/collector-dashboard" element={<CollectorDashboard />} />
        <Route path="/collector/explore" element={<Explore />} />
        <Route path="/collector/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
