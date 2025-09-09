// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages / Components
import PlanetList from "./components/PlanetList";
import PlanetDetail from "./components/PlanetDetail";
import PlanetCompare from "./components/PlanetCompare";
import GravitySimulator from "./components/GravitySimulator";
import PopQuiz from "./components/PopQuiz";
import QuizResultTracker from "./components/QuizResultTracker";
import News from "./components/News";
import LaunchTracker from "./components/LaunchTracker";
import MeteorShower from "./components/MeteorShower";
import SolarSystem from "./components/SolarSystem";


function App() {
  const [quizResults, setQuizResults] = useState([]);

  const handleQuizComplete = (result) => {
    setQuizResults((prev) => [...prev, result]);
  };

  return (
    <Router>
      <Routes>
        {/* Default Route: show PlanetList */}
        <Route path="/" element={<PlanetList />} />
        <Route
          path="/planet/:name"
          element={<PlanetDetail />}
        />
        <Route path="/compare" element={<PlanetCompare />} />
        <Route path="/gravity" element={<GravitySimulator />} />
        <Route path="/quiz" element={<PopQuiz onComplete={handleQuizComplete} />} />
        <Route
          path="/quiz-results"
          element={<QuizResultTracker results={quizResults} />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/launches" element={<LaunchTracker />} />
        <Route path="/meteor" element={<MeteorShower />} />
        <Route path="/orbit" element={<SolarSystem />} />


        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <h1 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
