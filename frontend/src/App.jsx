import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PlanetList from "./components/PlanetList";
import PlanetDetail from "./components/PlanetDetail";
import PlanetCompare from "./components/PlanetCompare";
import GravitySimulator from "./components/GravitySimulator";
import PopQuiz from "./components/PopQuiz";
import QuizResultTracker from "./components/QuizResultTracker";

export default function App() {
  const [quizResults, setQuizResults] = useState([]);

  const handleQuizComplete = (result) => {
    setQuizResults((prev) => [...prev, result]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetList />} />
        <Route path="/planet/:name" element={<PlanetDetail />} />
        <Route path="/compare" element={<PlanetCompare />} />
        <Route path="/gravity" element={<GravitySimulator />} />
        <Route
          path="/quiz"
          element={<PopQuiz onComplete={handleQuizComplete} />}
        />
        <Route
          path="/quiz-results"
          element={<QuizResultTracker results={quizResults} />}
        />
      </Routes>
    </Router>
  );
}
