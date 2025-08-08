// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PlanetList from "./components/PlanetList";
import PlanetDetail from "./components/PlanetDetail";
import PlanetCompare from "./components/PlanetCompare";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetList />} />
        <Route path="/planet/:name" element={<PlanetDetail />} />
        <Route path="/compare" element={<PlanetCompare />} />
      </Routes>
    </Router>
  );
}
