// src/components/MeteorShower.jsx
import React, { useEffect, useRef } from "react";

function MeteorShower() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, "#0d0d1a");
    bgGradient.addColorStop(1, "#000");

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
      delta: 0.002 + Math.random() * 0.003,
    }));

    // Meteors
    const meteors = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      length: 80 + Math.random() * 120,
      speed: 4 + Math.random() * 4,
      angle: Math.PI / 6 + (Math.random() * 0.2 - 0.1),
      color: Math.random() < 0.8 ? "white" : "#00ffff",
    }));

    const sparks = [];

    const animate = () => {
      // Background
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((s) => {
        s.alpha += s.delta;
        if (s.alpha > 1 || s.alpha < 0.1) s.delta = -s.delta;

        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw meteors
      meteors.forEach((m) => {
        // Trail gradient
        const gradient = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x + m.length * Math.cos(m.angle),
          m.y + m.length * Math.sin(m.angle)
        );
        gradient.addColorStop(0, m.color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.random();
        ctx.shadowBlur = 8;
        ctx.shadowColor = m.color;

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x + m.length * Math.cos(m.angle),
          m.y + m.length * Math.sin(m.angle)
        );
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Add sparks
        sparks.push({ x: m.x, y: m.y, life: 10 + Math.random() * 10, color: m.color });

        // Move meteor
        m.x += m.speed * Math.cos(m.angle);
        m.y += m.speed * Math.sin(m.angle);

        // Reset if out of screen
        if (m.y > canvas.height || m.x > canvas.width) {
          m.x = Math.random() * canvas.width;
          m.y = Math.random() * -canvas.height;
          m.length = 80 + Math.random() * 120;
          m.speed = 4 + Math.random() * 4;
          m.angle = Math.PI / 6 + (Math.random() * 0.2 - 0.1);
          m.color = Math.random() < 0.8 ? "white" : "#00ffff";
        }
      });

      // Draw sparks
      sparks.forEach((s, idx) => {
        ctx.fillStyle = `rgba(255,255,255,${s.life / 20})`;
        ctx.fillRect(s.x, s.y, 2, 2);
        s.life -= 0.5;
        if (s.life <= 0) sparks.splice(idx, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}

export default MeteorShower;
