import React, { useEffect, useState } from "react";

function PlayerProfile({ steamId, apiKey }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = `/api/steam/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}&format=json`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.response && data.response.players.length > 0) {
          setProfile(data.response.players[0]);
        } else setError("Profile not found or Steam ID private.");
      } catch (err) {
        setError(`Failed to fetch profile: ${err.message}`);
      }
    };
    fetchProfile();
  }, [steamId, apiKey]);

  if (error) return <p style={{ color: "#dc3545", padding: "20px" }}>{error}</p>;
  if (!profile) return <p style={{ padding: "20px" }}>Loading profile info ...</p>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#2a475e", // Dark card
        border: "1px solid #406883",
        borderRadius: "8px",
        padding: "15px",
        height: "100%", // Fill grid cell
      }}
    >
      <img
        src={profile.avatarfull}
        alt="avatar"
        style={{ width: "80px", height: "80px", borderRadius: "8px", marginRight: "15px" }}
      />
      <div>
        <h3 style={{ margin: "0", color: "white" }}>{profile.personaname}</h3>
        <p style={{ margin: "2px 0", color: "#c7d5e0" }}>
          Country: {profile.loccountrycode || "N/A"}
        </p>
        <a
          href={profile.profileurl}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#66c0f4", textDecoration: "none" }} // Steam blue
        >
          View Steam Profile
        </a>
      </div>
    </div>
  );
}

export default PlayerProfile;