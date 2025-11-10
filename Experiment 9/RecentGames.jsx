import React, { useEffect, useState } from "react";

function RecentGames({ steamId, apiKey }) {
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const url = `https://api.allorigins.win/raw?url=https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.response && data.response.games) {
          setRecent(data.response.games);
        } else setError("No recent games found.");
      } catch {
        setError("Failed to fetch recent games.");
      }
    };
    fetchRecent();
  }, [steamId, apiKey]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (recent.length === 0) return <p>No recently played games.</p>;

  return (
    <div style={{ margin: "20px" }}>
      <h2>Recently Played Games (Last 2 Weeks)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {recent.map((g) => (
          <div
            key={g.appid}
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`}
              alt={g.name}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h4>{g.name}</h4>
            <p style={{ fontSize: "13px", color: "gray" }}>
              Playtime (2 weeks): {(g.playtime_2weeks / 60).toFixed(1)} hrs
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentGames;