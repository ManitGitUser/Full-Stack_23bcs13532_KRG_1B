import React, { useState } from 'react';
import './index.css'; // Ensure this is imported

function Header() {
  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'center' }}>
      <h1>AwareDesk Gaming Edition</h1>
      <p>Game Performance Monitoring Dashboard (Experiment 6)</p>
    </header>
  );
}

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#555', padding: '8px' }}>
      <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</a>
      <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Game Library</a>
      <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Dashboard</a>
      <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Reports</a>
    </nav>
  );
}

function GameLibrary() {
  const [search, setSearch] = useState('');

  const games = [
    { title: 'GTA V', genre: 'Action', platform: 'PC' },
    { title: 'Red Dead Redemption 2', genre: 'Adventure', platform: 'PC' },
    { title: 'Far Cry 6', genre: 'Shooter', platform: 'PC' },
    { title: 'FIFA 24', genre: 'Sports', platform: 'Console' },
    { title: 'Cyberpunk 2077', genre: 'RPG', platform: 'PC' },
  ];

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '10px',
      border: '1px solid #ccc',
      width: '25%'
    }}>
      <h3>Game Library</h3>

      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '95%', padding: '5px', marginBottom: '10px' }}
      />

      {filteredGames.length > 0 ? (
        filteredGames.map((game, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            padding: '10px',
            marginBottom: '10px'
          }}>
            <strong>{game.title}</strong><br />
            Genre: {game.genre}<br />
            Platform: {game.platform}
          </div>
        ))
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{
      flex: 1,
      backgroundColor: 'white',
      padding: '10px',
      border: '1px solid #ccc',
      marginLeft: '20px'
    }}>
      <h3>Performance Summary</h3>
      <p>CPU Usage: 45%</p>
      <p>GPU Usage: 70%</p>
      <p>RAM Usage: 8 GB</p>
      <p>FPS: 80</p>

      <h4>Optimization Tips</h4>
      <ul>
        <li>Close background applications.</li>
        <li>Lower shadow quality for better FPS.</li>
        <li>Keep GPU drivers updated.</li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      backgroundColor: '#333',
      color: 'white',
      textAlign: 'center',
      padding: '8px',
      marginTop: '20px'
    }}>
      <p>Submitted by: Manit Saxena | Section: KRG-1 (B)</p>
    </div>
  );
}

function App() {
  return (
    <div style={{
      backgroundColor: '#f2f2f2',
      minHeight: '100vh'
    }}>
      <Header />
      <Navbar />
      <div style={{ display: 'flex', margin: '20px' }}>
        <GameLibrary />
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
}

export default App;