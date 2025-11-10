import React, { useState, useEffect } from "react";
import "./index.css";
import SteamLogin from "./SteamLogin";

function App() {
  const [credentials, setCredentials] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (data) => {
    setCredentials(data);
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (!credentials) return;
      setLoading(true);
      setError("");

      try {
        const url = `https://corsproxy.io/?https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${credentials.apiKey}&steamid=${credentials.steamId}&include_appinfo=true&include_played_free_games=true&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.response && data.response.games) {
          setGames(data.response.games);
        } else {
          setError("No games found or Steam profile is private.");
        }
      } catch (err) {
        setError("Failed to fetch data. Please check your Steam ID or API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [credentials]);

  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
      <header style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        textAlign: "center"
      }}>
        <h1>AwareDesk Gaming Edition</h1>
        <p>Steam Game Analytics Dashboard (Experiment 8)</p>
      </header>

      {!credentials ? (
        <SteamLogin onSubmit={handleLogin} />
      ) : loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Fetching your games...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <div style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px"
        }}>
          {games.map((game) => (
            <div key={game.appid} style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px"
            }}>
              <img
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                alt={game.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
              <h4>{game.name}</h4>
              <p style={{ fontSize: "13px", color: "gray" }}>
                Playtime: {(game.playtime_forever / 60).toFixed(1)} hrs
              </p>
            </div>
          ))}
        </div>
      )}

      <footer style={{
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        padding: "8px",
        marginTop: "20px"
      }}>
        <p>Submitted by: Manit Saxena | Section: KRG-1 (B)</p>
      </footer>
    </div>
  );
}

export default App;