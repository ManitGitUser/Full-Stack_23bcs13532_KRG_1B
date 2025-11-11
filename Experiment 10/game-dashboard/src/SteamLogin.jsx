import React, { useState } from "react";

// --- MOCK DATA IS NOW INSIDE THIS FILE ---
const mockGames = [
  { appid: 730, name: "Counter-Strike 2", playtime_forever: 2400, rtime_last_played: Date.now() / 1000 - 86400 },
  { appid: 440, name: "Team Fortress 2", playtime_forever: 1800, rtime_last_played: Date.now() / 1000 - 172800 },
  { appid: 570, name: "Dota 2", playtime_forever: 3600, rtime_last_played: Date.now() / 1000 - 259200 },
  { appid: 271590, name: "Grand Theft Auto V", playtime_forever: 1200, rtime_last_played: 0 },
  { appid: 292030, name: "The Witcher 3", playtime_forever: 4800, rtime_last_played: Date.now() / 1000 - 604800 },
  { appid: 431960, name: "Wallpaper Engine", playtime_forever: 0, rtime_last_played: 0 },
  { appid: 1174180, name: "Red Dead Redemption 2", playtime_forever: 2100, rtime_last_played: 0 },
  { appid: 1091500, name: "Cyberpunk 2077", playtime_forever: 900, rtime_last_played: 0 }
];

const mockProfile = {
  personaname: "Demo Player",
  avatarfull: "https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg",
  loccountrycode: "US",
  profileurl: "https://steamcommunity.com/profiles/demo"
};

// We now accept 'onUseDemoData' as a prop
function SteamLogin({ onSubmit, onUseDemoData }) {
  const [steamId, setSteamId] = useState(localStorage.getItem("steamId") || "");
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!steamId || !apiKey) {
      alert("Please enter both Steam ID and API Key");
      return;
    }
    localStorage.setItem("steamId", steamId);
    localStorage.setItem("apiKey", apiKey);
    onSubmit({ steamId, apiKey });
  };

  return (
    <div style={{
      backgroundColor: "#2a475e",
      padding: "25px",
      border: "1px solid #406883",
      borderRadius: "8px",
      width: "450px", // Made it a bit wider
      margin: "40px auto",
      textAlign: "center",
      color: "#c7d5e0"
    }}>
      <h2 style={{ color: "white" }}>Steam Account Login</h2>
      <p style={{ fontSize: "13px", color: "#c7d5e0", marginBottom: "15px" }}>
        Enter your Steam ID and API Key for full analytics.
      </p>
      
      <div style={{
        backgroundColor: "#1b2838",
        padding: "10px 15px",
        borderRadius: "6px",
        marginBottom: "15px",
        fontSize: "12px",
        border: "1px solid #406883",
        textAlign: "left"
      }}>
        <strong>Note:</strong> An API Key is required by Steam to fetch your
        private game library. This app does not store your key.
        <p style={{ marginTop: "5px" }}>
          🔒 Unsure? <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onUseDemoData(mockGames, mockProfile);
            }} 
            style={{ color: "#66c0f4", fontWeight: "bold" }}
          >
            Try the preview with sample data first.
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter Steam ID (64-bit)"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #406883",
              backgroundColor: "#1b2838",
              color: "#c7d5e0",
              fontSize: "14px"
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Enter Steam API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #406883",
              backgroundColor: "#1b2838",
              color: "#c7d5e0",
              fontSize: "14px"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#66c0f4",
            color: "#171a21",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            width: "100%"
          }}
        >
          Fetch My Data
        </button>
      </form>
    </div>
  );
}

export default SteamLogin;