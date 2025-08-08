import React, { useState } from 'react';
import planets from '../data/planets';
import './PlanetCompare.css';
import { Link } from 'react-router-dom';

function PlanetCompare() {
  const [firstPlanetName, setFirstPlanetName] = useState('');
  const [secondPlanetName, setSecondPlanetName] = useState('');

  const firstPlanet = planets.find(p => p.name === firstPlanetName);
  const secondPlanet = planets.find(p => p.name === secondPlanetName);

  return (
    <div className="planet-compare">
      <Link to="/" style={{ color: '#7fffd4', textDecoration: 'underline', marginBottom: '30px' }}>← Back to Planet List</Link>
      <h1 className="compare-header">Compare Planets</h1>

      <div className="selection-panel">
        <label>
          Select First Planet:
          <select value={firstPlanetName} onChange={e => setFirstPlanetName(e.target.value)}>
            <option value="">-- Choose a planet --</option>
            {planets.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </label>

        <label>
          Select Second Planet:
          <select value={secondPlanetName} onChange={e => setSecondPlanetName(e.target.value)}>
            <option value="">-- Choose a planet --</option>
            {planets.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      {(firstPlanet || secondPlanet) ? (
        <div className="comparison-grid">
          {firstPlanet ? (
            <div className="planet-card-compare">
              <img src={firstPlanet.image} alt={firstPlanet.name} className="planet-image-compare" />
              <h2 className="planet-name-compare">{firstPlanet.name} {firstPlanet.emoji}</h2>
              <p className="planet-description">{firstPlanet.description}</p>
              <h4>Facts:</h4>
              <ul className="facts-list">
                {firstPlanet.facts.map((fact, i) => <li key={i}>{fact}</li>)}
              </ul>
            </div>
          ) : (
            <div className="planet-card-compare no-selection">Select a planet to compare</div>
          )}

          {secondPlanet ? (
            <div className="planet-card-compare">
              <img src={secondPlanet.image} alt={secondPlanet.name} className="planet-image-compare" />
              <h2 className="planet-name-compare">{secondPlanet.name} {secondPlanet.emoji}</h2>
              <p className="planet-description">{secondPlanet.description}</p>
              <h4>Facts:</h4>
              <ul className="facts-list">
                {secondPlanet.facts.map((fact, i) => <li key={i}>{fact}</li>)}
              </ul>
            </div>
          ) : (
            <div className="planet-card-compare no-selection">Select a planet to compare</div>
          )}
        </div>
      ) : (
        <p className="no-selection">Please select two planets above to compare their details.</p>
      )}
    </div>
  );
}

export default PlanetCompare;