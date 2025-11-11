import React, { useState, useEffect } from "react";
import "./index.css";
// We now only import SteamLogin, which will handle both login and demo
import SteamLogin from "./SteamLogin";
import PlayerProfile from "./PlayerProfile";
import RecentGames from "./RecentGames";
import GameAnalytics from "./GameAnalytics";
import AdvancedAnalytics from "./AdvancedAnalytics";
import QuickStats from "./QuickStats";
// We no longer import DemoMode
// import DemoMode from "./DemoMode";

const theme = {
  // ... (theme object is unchanged)
  bg: "#1b2838",
  bg_light: "#2a475e",
  bg_lighter: "#406883",
  text_light: "#c7d5e0",
  text_dark: "#333",
  accent: "#66c0f4",
  header: "#171a21",
};

// ... (TabButton component is unchanged)
const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: isActive ? theme.bg_light : "transparent",
      border: "none",
      borderBottom: isActive ? `3px solid ${theme.accent}` : `3px solid transparent`,
      color: isActive ? "white" : theme.text_light,
      padding: "10px 20px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.2s, color 0.2s",
    }}
  >
    {label}
  </button>
);

function App() {
  const [credentials, setCredentials] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  const handleLogin = (data) => setCredentials(data);

  const handleDemoMode = (mockGames, mockProfile) => {
    setGames(mockGames);
    setProfile(mockProfile);
    setIsDemoMode(true);
    setCredentials({ steamId: "demo", apiKey: "demo" });
  };

  useEffect(() => {
    // ... (fetchGames logic is unchanged)
    const fetchGames = async () => {
      if (!credentials || isDemoMode) return;
      setLoading(true);
      setError("");
      try {
        const url = `/api/steam/IPlayerService/GetOwnedGames/v0001/?key=${credentials.apiKey}&steamid=${credentials.steamId}&include_appinfo=true&include_played_free_games=true&format=json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.response && data.response.games) {
          setGames(data.response.games);
        } else setError("No games found or profile private.");
      } catch (err) {
        setError(`Failed to fetch games: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [credentials, isDemoMode]);

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh", color: theme.text_light }}>
      <header
        style={{
          // ... (header style is unchanged)
          backgroundColor: theme.header,
          color: "white",
          padding: "15px 30px",
          textAlign: "center",
          borderBottom: `2px solid ${theme.accent}`,
        }}
      >
        <h1>Steam Game Analytics Dashboard</h1>
        <p style={{ color: theme.text_light, fontSize: "20px" }}>
          Ready to regret some life decisions?
        </p>
      </header>

      {!credentials ? (
        // --- THIS IS THE CHANGE ---
        // We now only render the SteamLogin component.
        // It will contain its own "Demo Mode" button.
        <div style={{ padding: "20px" }}>
          <SteamLogin onSubmit={handleLogin} onUseDemoData={handleDemoMode} />
        </div>
      ) : (
        // --- MAIN APP VIEW (LOGGED IN) ---
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "20px" }}>
          {/* --- Tab Navigation --- */}
          <div style={{ marginBottom: "20px", borderBottom: `1px solid ${theme.bg_lighter}` }}>
            <TabButton
              label="Dashboard"
              isActive={activeView === "dashboard"}
              onClick={() => setActiveView("dashboard")}
            />
            <TabButton
              label="Full Library"
              isActive={activeView === "library"}
              onClick={() => setActiveView("library")}
            />
          </div>

          {/* ... (The rest of the component is unchanged) ... */}

          {/* --- CONDITIONAL VIEW: DASHBOARD --- */}
          {activeView === "dashboard" && (
            <div
              className="main-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "20px",
                alignItems: "start",
              }}
            >
              {/* Left Column (Main Analytics) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {!isDemoMode && (
                  <PlayerProfile steamId={credentials.steamId} apiKey={credentials.apiKey} />
                )}
                {isDemoMode && profile && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: theme.bg_light,
                      border: `1px solid ${theme.bg_lighter}`,
                      borderRadius: "8px",
                      padding: "15px",
                    }}
                  >
                    <img
                      src={profile.avatarfull}
                      alt="avatar"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <h3 style={{ margin: "0", color: "white" }}>{profile.personaname}</h3>
                      <p style={{ margin: "2px 0", color: theme.text_light }}>
                        Country: {profile.loccountrycode || "N/A"}
                      </p>
                      <span style={{ color: "#ffc107", fontSize: "12px" }}>🎮 Demo Mode</span>
                    </div>
                  </div>
                )}
                {games.length > 0 && (
                  <>
                    <GameAnalytics games={games} />
                    <AdvancedAnalytics games={games} />
                  </>
                )}
              </div>

              {/* Right Column (At-a-glance) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "20px" }}>
                {games.length > 0 && <QuickStats games={games} profile={profile} />}
                {!isDemoMode && games.length > 0 && (
                  <RecentGames steamId={credentials.steamId} apiKey={credentials.apiKey} />
                )}
              </div>
            </div>
          )}
          
          {/* --- CONDITIONAL VIEW: LIBRARY --- */}
          {activeView === "library" && (
            <div>
              {loading ? (
                <p style={{ textAlign: "center", fontSize: "18px" }}>Fetching library ...</p>
              ) : error ? (
                <p style={{ color: "#dc3545", textAlign: "center", fontSize: "18px" }}>{error}</p>
              ) : games.length > 0 ? (
                <div>
                  <h2
                    style={{
                      textAlign: "center",
                      marginBottom: "20px",
                      color: "white",
                    }}
                  >
                    🎮 Your Game Library ({games.length} games)
                  </h2>
                  <div className="game-grid">
                    {games.map((g) => (
                      <div key={g.appid} className="game-card">
                        <img
                          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`}
                          alt={g.name}
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2EzYjQxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                          }}
                        />
                        <h4>{g.name}</h4>
                        <p>
                          ⏱️ {(g.playtime_forever / 60).toFixed(1)} hrs
                          {g.playtime_forever === 0 && " (Unplayed)"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      <footer
        style={{
          // ... (footer style is unchanged)
          backgroundColor: theme.header,
          color: theme.text_light,
          textAlign: "center",
          padding: "15px",
          marginTop: "20px",
          fontSize: "12px",
          borderTop: `1px solid ${theme.bg_lighter}`,
        }}
      >
        <p>Made by the one and only Vide Coder - Manit Saxena</p>
      </footer>
    </div>
  );
}

export default App;