import React, { useEffect, useState } from "react";

function RecentGames({ steamId, apiKey }) {
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const url = `/api/steam/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.response && data.response.games) {
          setRecent(data.response.games);
        } else setError("No recent games found.");
      } catch (err) {
        setError(`Failed to fetch recent games: ${err.message}`);
      }
    };
    fetchRecent();
  }, [steamId, apiKey]);

  // Card styles
  const cardStyle = {
    backgroundColor: "#2a475e", // Dark card
    border: "1px solid #406883",
    borderRadius: "8px",
    padding: "15px",
    height: "100%", // Fill grid cell
  };

  if (error) return <div style={cardStyle}><p style={{ color: "#dc3545" }}>{error}</p></div>;
  if (recent.length === 0) return <div style={cardStyle}><p>No recently played games.</p></div>;

  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0, marginBottom: "15px", color: "white" }}>Recently Played (2 Weeks)</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr", // Vertical list
          gap: "10px",
        }}
      >
        {recent.map((g) => (
          <div
            key={g.appid}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#1b2838",
              padding: "8px",
              borderRadius: "6px"
            }}
          >
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`}
              alt={g.name}
              style={{ width: "100px", borderRadius: "4px" }}
            />
            <div>
              <h4 style={{ margin: "0 0 5px 0", color: "white", fontSize: "14px" }}>{g.name}</h4>
              <p style={{ fontSize: "12px", color: "#c7d5e0", margin: 0 }}>
                {(g.playtime_2weeks / 60).toFixed(1)} hrs (2 weeks)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentGames;