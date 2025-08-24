import React, { useRef, useEffect, useState } from "react";
import "./GravitySimulator.css";
import planets from "../data/planets";

export default function GravitySimulator() {
  const canvasRef = useRef(null);
  const [bodies, setBodies] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Function to parse mass string from planet.js to a number in kg
  const parseMass = (planet) => {
    // Example: "Mass: 5.97 × 10^24 kg"
    const massString = planet.facts.find((f) => f.startsWith("Mass:"));
    if (!massString) return null;
    const match = massString.match(/([\d.]+)\s*×?\s*10\^(\d+)/);
    if (!match) return null;
    const value = parseFloat(match[1]);
    const exponent = parseInt(match[2]);
    return value * Math.pow(10, exponent);
  };

  // Add a planet to simulation
  const addPlanet = (planet) => {
    const canvas = canvasRef.current;
    const radius = 20 + Math.random() * 15;
    const mass = 5 + Math.random() * 10;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;

    const numericMass = parseMass(planet);

    const newBody = {
      ...planet,
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius,
      mass,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      numericMass, // store parsed mass
    };

    setBodies((prev) => [...prev, newBody]);
    setSelectedPlanet(newBody);
  };

  const clearAll = () => {
    setBodies([]);            
    setSelectedPlanet(null);  

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const G = 0.05;

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bodies.forEach((a, i) => {
        bodies.forEach((b, j) => {
          if (i === j) return;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > a.radius + b.radius) {
            const force = (G * a.mass * b.mass) / (dist * dist);
            const ax = (force * dx) / dist / a.mass;
            const ay = (force * dy) / dist / a.mass;
            a.vx += ax;
            a.vy += ay;
          }
        });
      });

      bodies.forEach((body) => {
        body.x += body.vx;
        body.y += body.vy;

        if (body.x < body.radius || body.x > canvas.width - body.radius)
          body.vx *= -0.8;
        if (body.y < body.radius || body.y > canvas.height - body.radius)
          body.vy *= -0.8;

        const gradient = ctx.createRadialGradient(
          body.x,
          body.y,
          body.radius / 3,
          body.x,
          body.y,
          body.radius
        );
        gradient.addColorStop(0, body.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText(body.name, body.x - body.radius, body.y - body.radius - 5);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [bodies]);

  return (
    <div className="gravity-simulator">
      <canvas ref={canvasRef} className="gravity-canvas" />
      <div className="planet-controls">
        <h2>🌌 Gravity Simulator</h2>
        <p>Select a planet to see its surface gravity:</p>

        <div className="buttons">
          {planets.map((planet) => (
            <button key={planet.name} onClick={() => addPlanet(planet)}>
              {planet.emoji} {planet.name}
            </button>
          ))}
        </div>

        <button className="clear-btn" onClick={clearAll}>
          ❌ Clear All
        </button>

        {selectedPlanet && selectedPlanet.numericMass && (
          <div className="gravity-info">
            Surface gravity of {selectedPlanet.name}:{" "}
            {(9.8 * selectedPlanet.numericMass / 5.972e24).toFixed(2)} m/s²
          </div>
        )}
      </div>
    </div>
  );
}
