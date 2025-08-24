import React, { useState } from "react";
import "./PlanetList.css";
import { Link } from "react-router-dom";
import planets from "../data/planets";

function PlanetList() {
  const [clickedPlanet, setClickedPlanet] = useState(null);

  const handleClick = (planetName) => {
    setClickedPlanet(planetName);
    setTimeout(() => setClickedPlanet(null), 300);
  };

  return (
    <div
      className="planet-list"
      style={{
        backgroundImage: `url('/space-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      <h1 className="title">🌌 CosmoExplorer</h1>

      {/* Floating buttons */}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/compare" className="compare-btn" title="Compare Planets">
          🔍 Compare Planets
        </Link>
        <Link to="/gravity" className="gravity-btn" title="Gravity Simulator">
          ⚛ Gravity Simulator
        </Link>
        {/* Floating Pop Quiz Button */}
        <Link to="/quiz" className="quiz-btn" title="Pop Quiz">
  📝 Pop Quiz
        </Link>

      </div>

      <div className="planet-grid">
        {planets.map((planet) => (
          <Link
            key={planet.name}
            to={`/planet/${planet.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleClick(planet.name)}
          >
            <div className={`planet-card ${clickedPlanet === planet.name ? "clicked" : ""}`}>
              <span className="planet-icon">{planet.emoji}</span>
              <h2>{planet.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlanetList;
