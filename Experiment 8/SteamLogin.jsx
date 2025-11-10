import React, { useState } from "react";

function SteamLogin({ onSubmit }) {
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
      backgroundColor: "white",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: "350px",
      margin: "40px auto",
      textAlign: "center"
    }}>
      <h2>Steam Account Login</h2>
      <p style={{ fontSize: "13px", color: "gray" }}>
        Enter your Steam ID and API Key to fetch your data.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter Steam ID (64-bit)"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter Steam API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#333",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Fetch My Data
        </button>
      </form>

      <p style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
        🔒 We don’t store your credentials. They are only used locally.
      </p>
    </div>
  );
}

export default SteamLogin;
