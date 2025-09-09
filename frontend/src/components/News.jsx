// src/components/News.jsx
import React from "react";

const newsItems = [
  {
    title: "NASA discovers new exoplanet",
    image: "/images/exoplanet.jpg",
    summary: "Astronomers have discovered a new Earth-like exoplanet in the habitable zone.",
    link: "https://www.nasa.gov/news/exoplanet"
  },
  {
    title: "Mars Rover finds signs of ancient water",
    image: "/images/mars_rover.jpg",
    summary: "Curiosity Rover has detected minerals indicating ancient water on Mars.",
    link: "https://www.nasa.gov/mars-water"
  },
  {
    title: "James Webb Telescope captures stunning images",
    image: "/images/jwst.jpg",
    summary: "JWST reveals distant galaxies in unprecedented detail.",
    link: "https://www.nasa.gov/jwst"
  },
  {
    title: "SpaceX prepares for next Starship launch",
    image: "/images/spacex_starship.jpg",
    summary: "Starship is getting ready for its next test flight, aiming for orbital success.",
    link: "https://www.spacex.com/news"
  }
];

export default function News() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/space-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "50px 20px"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "3rem" }}>
        🌠 Space News & Updates
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {newsItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(0,0,0,0.7)",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              transition: "transform 0.2s",
            }}
            className="news-card"
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h2 style={{ marginBottom: "10px" }}>{item.title}</h2>
              <p style={{ marginBottom: "15px" }}>{item.summary}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#7fffd4",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
