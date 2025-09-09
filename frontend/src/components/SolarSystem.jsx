// src/components/SolarSystem.jsx
import React, { useRef, useEffect, useState } from "react";
import "./SolarSystem.css";

const planetsData = [
  { name: "Mercury", radius: 60, size: 6, color: "#a9a9a9", speed: 0.008 },
  { name: "Venus", radius: 100, size: 10, color: "#f5deb3", speed: 0.005 },
  { name: "Earth", radius: 140, size: 12, color: "#1e90ff", speed: 0.003 },
  { name: "Mars", radius: 180, size: 9, color: "#ff4500", speed: 0.0025 },
  { name: "Jupiter", radius: 240, size: 18, color: "#d2b48c", speed: 0.0015 },
  { name: "Saturn", radius: 300, size: 16, color: "#f4a460", speed: 0.0012 },
  { name: "Uranus", radius: 360, size: 14, color: "#40e0d0", speed: 0.001 },
  { name: "Neptune", radius: 420, size: 14, color: "#4169e1", speed: 0.0008 },
];;

function SolarSystem() {
  const canvasRef = useRef();
  const anglesRef = useRef(planetsData.map(() => Math.random() * Math.PI * 2));
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2 + pan.x;
      const cy = canvas.height / 2 + pan.y;

      // Draw Sun
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd700";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ffd700";
      ctx.fill();
      ctx.shadowBlur = 0;

      planetsData.forEach((planet, i) => {
        anglesRef.current[i] += planet.speed;

        const x = cx + planet.radius * zoom * Math.cos(anglesRef.current[i]);
        const y = cy + planet.radius * zoom * Math.sin(anglesRef.current[i]);

        // Orbit path
        ctx.beginPath();
        ctx.arc(cx, cy, planet.radius * zoom, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();

        // Planet
        ctx.beginPath();
        ctx.arc(x, y, planet.size * zoom, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = planet.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Planet name
        ctx.fillStyle = "white";
        ctx.font = `${12 * zoom}px sans-serif`;
        ctx.fillText(planet.name, x + 10 * zoom, y);
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, [pan, zoom]);

  // Mouse controls
  const handleMouseDown = (e) => {
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    setDragging(true);
  };
  const handleMouseMove = (e) => {
    if (dragging) {
      setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }
  };
  const handleMouseUp = () => setDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.2), 5));
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", cursor: dragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    />
  );
}

export default SolarSystem;
