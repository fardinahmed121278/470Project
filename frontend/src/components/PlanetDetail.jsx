import React from 'react';
import { useParams, Link } from 'react-router-dom';
import planets from '../data/planets';
import './PlanetDetail.css';

function PlanetDetail() {
  const { name } = useParams();
  const planet = planets.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (!planet) {
    return (
      <div className="planet-detail planet-detail--notfound">
        <h2>Planet not found</h2>
        <Link to="/" className="back-link">Back to Planet List</Link>
      </div>
    );
  }

  return (
    <div
      className="planet-detail"
      style={{ backgroundImage: `url(${planet.image})` }}
    >
      <div className="overlay" />
      <div className="content">
        <Link to="/" className="back-link">← Back to Planet List</Link>
        <h1>{planet.name} {planet.emoji}</h1>
        <img 
          src={planet.image} 
          alt={planet.name} 
          className="planet-image"
        />
        <p className="description">{planet.description}</p>

        <h3>Quick Facts:</h3>
        <ul className="facts-list">
          {planet.facts.map((fact, i) => (
            <li key={i}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanetDetail;