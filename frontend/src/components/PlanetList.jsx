// src/components/PlanetList.jsx
import React, { useState } from "react";
import { Link} from "react-router-dom"; 
import planets from "../data/planets";
import "./PlanetList.css";

function PlanetList() {
  const [clickedPlanet, setClickedPlanet] = useState(null);
  

  const handleClick = (planetName) => {
    setClickedPlanet(planetName);
    setTimeout(() => setClickedPlanet(null), 300);
  };
  


  // Dummy news
  const newsItems = [
    { title: "NASA discovers new exoplanet!", date: "2025-09-09" },
    { title: "Mars rover sends stunning photos of Olympus Mons.", date: "2025-09-08" },
    { title: "Astronomers detect unusual comet trajectory.", date: "2025-09-07" },
  ];

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
        overflow: "hidden",
      }}
    >
      <h1 className="title">🌌 CosmoExplorer</h1>


      {/* Floating Buttons */}
      <div className="floating-btn-container">
        <Link to="/compare" className="floating-btn compare-btn">
          🔍 Compare Planets
        </Link>
        <Link to="/gravity" className="floating-btn gravity-btn">
          ⚛ Gravity Simulator
        </Link>
        <Link to="/quiz" className="floating-btn quiz-btn">
          📝 Pop Quiz
        </Link>
        <Link to="/news" className="floating-btn news-btn">
          📰 News Feed
        </Link>
        <Link to="/launches" className="floating-btn launch-btn">
          🚀 Launch Tracker
        </Link>
        <Link to="/meteor" className="floating-btn meteor-btn">
          🌠 Meteor Shower
        </Link>
        <Link to="/orbit" className="floating-btn orbit-btn">
  🪐       Orbit Simulator
        </Link>

      </div>

      {/* Planet Grid */}
      <div className="planet-grid">
        {planets.map((planet) => (
          <Link
            key={planet.name}
            to={`/planet/${planet.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleClick(planet.name)}
          >
            <div
              className={`planet-card ${
                clickedPlanet === planet.name ? "clicked" : ""
              }`}
            >
              <span className="planet-icon">{planet.emoji}</span>
              <h2>{planet.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* News Section */}
      <div className="news-section">
        <h2>📰 Space News</h2>
        {newsItems.map((item, idx) => (
          <div key={idx} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanetList;
