import React, { useEffect, useState } from "react";

function PlayerProfile({ steamId, apiKey }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = `https://api.allorigins.win/raw?url=https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.response && data.response.players.length > 0) {
          setProfile(data.response.players[0]);
        } else setError("Profile not found or Steam ID private.");
      } catch {
        setError("Failed to fetch profile info.");
      }
    };
    fetchProfile();
  }, [steamId, apiKey]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>Loading profile info ...</p>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        margin: "20px auto",
        width: "fit-content",
      }}
    >
      <img
        src={profile.avatarfull}
        alt="avatar"
        style={{ width: "80px", height: "80px", borderRadius: "8px", marginRight: "15px" }}
      />
      <div>
        <h3 style={{ margin: "0" }}>{profile.personaname}</h3>
        <p style={{ margin: "2px 0", color: "gray" }}>
          Country: {profile.loccountrycode || "N/A"}
        </p>
        <a
          href={profile.profileurl}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#0078ff" }}
        >
          View Steam Profile
        </a>
      </div>
    </div>
  );
}

export default PlayerProfile;