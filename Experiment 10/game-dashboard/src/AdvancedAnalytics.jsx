import React, { useState } from "react";

function AdvancedAnalytics({ games }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!games || games.length === 0) return null;

  const totalPlaytime = games.reduce((sum, game) => sum + game.playtime_forever, 0);
  const playedGames = games.filter(g => g.playtime_forever > 0);
  
  // ... (getGamingHabits logic)

  // Top games by playtime
  const topGames = games
    .filter(g => g.playtime_forever > 0)
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 10);

  // Playtime trends
  const playtimeCategories = [
    { name: "Unplayed", count: games.filter(g => g.playtime_forever === 0).length, color: "#dc3545" },
    { name: "Tried (< 2h)", count: games.filter(g => g.playtime_forever > 0 && g.playtime_forever < 120).length, color: "#ffc107" },
    { name: "Played (2-10h)", count: games.filter(g => g.playtime_forever >= 120 && g.playtime_forever < 600).length, color: "#17a2b8" },
    { name: "Enjoyed (10-50h)", count: games.filter(g => g.playtime_forever >= 600 && g.playtime_forever < 3000).length, color: "#a6d36e" },
    { name: "Mastered (50h+)", count: games.filter(g => g.playtime_forever >= 3000).length, color: "#bf81de" }
  ];

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: "10px 20px",
        border: "none",
        borderBottom: active ? "3px solid #66c0f4" : "3px solid transparent",
        backgroundColor: "transparent",
        color: active ? "#66c0f4" : "#c7d5e0",
        cursor: "pointer",
        marginRight: "10px",
        fontSize: "16px",
        fontWeight: active ? "bold" : "normal"
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "#2a475e", // Dark card
      borderRadius: "8px", 
      border: "1px solid #406883",
      marginBottom: "20px",
      color: "#c7d5e0"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px", color: "white" }}>
        Advanced Game Analytics
      </h2>

      {/* Tab Navigation */}
      <div style={{ textAlign: "center", marginBottom: "30px", borderBottom: "1px solid #406883" }}>
        <TabButton id="overview" label="Overview" active={activeTab === "overview"} onClick={setActiveTab} />
        <TabButton id="trends" label="Trends" active={activeTab === "trends"} onClick={setActiveTab} />
        <TabButton id="insights" label="Insights" active={activeTab === "insights"} onClick={setActiveTab} />
      </div>

      {activeTab === "overview" && (
        <div>
          {/* Performance Metrics */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "30px"
          }}>
            {[
              { label: "Games Played", value: `${((playedGames.length / games.length) * 100).toFixed(1)}%`, color: "#66c0f4" },
              { label: "Days Played", value: (totalPlaytime / 60 / 24).toFixed(0), color: "#a6d36e" },
              { label: "Est. Library Value", value: `$${(games.length * 15).toFixed(0)}`, color: "#ffc107" }
            ].map(stat => (
              <div key={stat.label} style={{
                backgroundColor: "#1b2838",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                border: "1px solid #406883",
              }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: stat.color }}>
                  {stat.value}
                </div>
                <div style={{ color: "#c7d5e0", fontSize: "14px" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Top Games Chart */}
          <div style={{
            backgroundColor: "#1b2838",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #406883",
            marginBottom: "20px"
          }}>
            <h3 style={{ marginTop: 0, marginBottom: "10px", color: "white" }}>🏆 Top 10 Most Played Games</h3>
            {topGames.map((game, index) => (
              <div key={game.appid} style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: index < topGames.length - 1 ? "1px solid #2a475e" : "none"
              }}>
                <div style={{ 
                  width: "30px", 
                  textAlign: "center", 
                  fontWeight: "bold",
                  color: index < 3 ? "#ffd700" : "#c7d5e0"
                }}>
                  #{index + 1}
                </div>
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                  alt={game.name}
                  style={{ width: "60px", borderRadius: "4px", margin: "0 15px" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "14px", color: "white" }}>{game.name}</div>
                  <div style={{ color: "#c7d5e0", fontSize: "12px" }}>
                    {(game.playtime_forever / 60).toFixed(1)} hours
                  </div>
                </div>
                <div style={{
                  backgroundColor: "#2a475e",
                  height: "8px",
                  width: "100px",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    backgroundColor: "#66c0f4",
                    height: "100%",
                    width: `${(game.playtime_forever / topGames[0].playtime_forever) * 100}%`,
                    borderRadius: "4px"
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "trends" && (<p> I'm thinking to add stuff here later </p>)}
      {activeTab === "insights" && (<p> I'm thinking to add stuff here much later </p>)}
      
    </div>
  );
}

export default AdvancedAnalytics;