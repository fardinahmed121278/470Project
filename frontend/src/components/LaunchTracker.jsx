import React, { useEffect, useState } from "react";

function LaunchTracker() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/upcoming")
      .then((res) => res.json())
      .then((data) => {
        setLaunches(data.slice(0, 5)); // next 5 launches
      })
      .catch((err) => console.error("Error fetching launches:", err));
  }, []);

  // Countdown Timer
  const getCountdown = (date) => {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Launched 🚀";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Agency logos (expandable later for NASA, ISRO, etc.)
  const getAgencyLogo = (name) => {
    if (name.toLowerCase().includes("spacex")) {
      return "/logos/spacex.png"; // Save SpaceX logo in public/logos/
    } else if (name.toLowerCase().includes("nasa")) {
      return "/logos/nasa.png";
    } else if (name.toLowerCase().includes("isro")) {
      return "/logos/isro.png";
    } else {
      return "/logos/rocket.png"; // default rocket icon
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('/space-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>
        🚀 Upcoming Rocket Launches
      </h1>

      {launches.length === 0 ? (
        <p style={{ fontSize: "1.2rem" }}>Loading launches...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {launches.map((launch) => (
            <div
              key={launch.id}
              style={{
                border: "1px solid #00d4ff",
                borderRadius: "15px",
                padding: "20px",
                background: "rgba(0, 0, 0, 0.7)",
                boxShadow: "0 0 15px #00d4ff",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* Agency Logo */}
              <img
                src={getAgencyLogo("SpaceX")} // Right now all SpaceX, later you can map
                alt="Agency Logo"
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  objectFit: "contain",
                }}
              />

              <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                {launch.name}
              </h2>
              <p>
                <strong>📅 Date:</strong>{" "}
                {new Date(launch.date_utc).toLocaleString()}
              </p>
              <p>
                <strong>⏳ Countdown:</strong>{" "}
                <span style={{ color: "#00ffcc", fontWeight: "bold" }}>
                  {getCountdown(launch.date_utc)}
                </span>
              </p>
              <p>
                <strong>📝 Details:</strong>{" "}
                {launch.details ? launch.details : "No details yet."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LaunchTracker;
