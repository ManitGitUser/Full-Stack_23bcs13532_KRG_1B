import React from "react";

// --- NEW TIER LOGIC ---
// Helper function to determine the tier
const getTier = (value, tiers) => {
  if (value >= tiers.gold) return { level: 'Gold', color: '#ffd700' };
  if (value >= tiers.silver) return { level: 'Silver', color: '#c0c0c0' };
  if (value >= tiers.bronze) return { level: 'Bronze', color: '#cd7f32' };
  return { level: 'None', color: '#8b929a' };
};

function QuickStats({ games, profile }) {
  if (!games || games.length === 0) return null;

  const stats = {
    totalGames: games.length,
    totalHours: Math.round(games.reduce((sum, game) => sum + game.playtime_forever, 0) / 60),
    playedGames: games.filter(g => g.playtime_forever > 0).length,
    recentGames: games.filter(g => g.rtime_last_played > Date.now() / 1000 - 1209600).length,
  };

  // Calculate the percentage of library played
  const playedPercent = (stats.playedGames / stats.totalGames) * 100;

  // --- NEW TIER DEFINITIONS ---
  const achievementTiers = {
    collector: getTier(stats.totalGames, { bronze: 50, silver: 150, gold: 300 }),
    dedicated: getTier(stats.totalHours, { bronze: 500, silver: 1500, gold: 3000 }),
    explorer: getTier(playedPercent, { bronze: 50, silver: 75, gold: 95 }),
    active: getTier(stats.recentGames, { bronze: 3, silver: 7, gold: 10 }),
  };

  // Helper array to make rendering cleaner
  const tierData = [
    { 
      name: "Collector", 
      desc: `(${stats.totalGames} Games)`, 
      tier: achievementTiers.collector 
    },
    { 
      name: "Dedicated", 
      desc: `(${stats.totalHours}h Played)`, 
      tier: achievementTiers.dedicated 
    },
    { 
      name: "Explorer", 
      desc: `(${playedPercent.toFixed(0)}% Played)`, 
      tier: achievementTiers.explorer 
    },
    { 
      name: "Active", 
      desc: `(${stats.recentGames} Recent)`, 
      tier: achievementTiers.active 
    },
  ];

  return (
    <div style={{
      position: "sticky",
      top: "20px",
      backgroundColor: "#2a475e", // Dark card
      border: "1px solid #406883",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      color: "#c7d5e0" // Light text
    }}>
      <h3 style={{ margin: "0 0 20px 0", color: "white", textAlign: "center" }}>
        ⚡ Quick Stats
      </h3>
      
      {/* Top 4-grid stats (unchanged) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#66c0f4" }}>
            {stats.totalGames}
          </div>
          <div style={{ fontSize: "12px", color: "#c7d5e0" }}>Games</div>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#a6d36e" }}>
            {stats.totalHours}h
          </div>
          <div style={{ fontSize: "12px", color: "#c7d5e0" }}>Played</div>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
            {playedPercent.toFixed(0)}%
          </div>
          <div style={{ fontSize: "12px", color: "#c7d5e0" }}>Played</div>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
            {stats.recentGames}
          </div>
          <div style={{ fontSize: "12px", color: "#c7d5e0" }}>Recent</div>
        </div>
      </div>

      {/* --- NEW TIER-BASED ACHIEVEMENT SECTION --- */}
      <div style={{ borderTop: "1px solid #406883", paddingTop: "15px" }}>
        <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "white", textAlign: "center" }}>
          🏆 Achievements
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr', gap: "10px" }}>
          {tierData.map(ach => (
            <div key={ach.name} style={{
              backgroundColor: '#1b2838',
              padding: '10px',
              borderRadius: '6px',
              border: `1px solid ${ach.tier.level !== 'None' ? ach.tier.color : '#406883'}`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>{ach.name}</div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: ach.tier.color,
                margin: '4px 0'
              }}>
                {ach.tier.level !== 'None' ? `🏆 ${ach.tier.level}` : '-'}
              </div>
              <div style={{ fontSize: '11px', color: '#c7d5e0' }}>{ach.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* This "Gaming Level" is also a tier system, and it's already good! */}
      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#1b2838",
        borderRadius: "6px",
        textAlign: "center",
        border: "1px solid #406883"
      }}>
        <div style={{ fontSize: "12px", color: "#c7d5e0", marginBottom: "5px" }}>
          Gaming Level
        </div>
        <div style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: stats.totalHours > 1000 ? "#bf81de" : 
                 stats.totalHours > 500 ? "#66c0f4" :
                 stats.totalHours > 100 ? "#a6d36e" : "#ffc107"
        }}>
          {stats.totalHours > 1000 ? "🏆 Master" :
           stats.totalHours > 500 ? "🎮 Expert" :
           stats.totalHours > 100 ? "⭐ Enthusiast" : "🌟 Casual"}
        </div>
      </div>
    </div>
  );
}

export default QuickStats;