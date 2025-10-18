import React from 'react';

function Header() {
  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'center' }}>
      <h1>AwareDesk Gaming Edition</h1>
      <p>Game Performance Monitoring Dashboard (Experiment 5)</p>
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
  const games = [
    { title: 'GTA V', genre: 'Action', platform: 'PC' },
    { title: 'Red Dead Redemption 2', genre: 'Adventure', platform: 'PC' },
  ];

  return (
    <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', width: '25%' }}>
      <h3>Game Library</h3>
      {games.map((game, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <strong>{game.title}</strong><br />
          Genre: {game.genre}<br />
          Platform: {game.platform}
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ flex: 1, backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', marginLeft: '20px' }}>
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
    <div style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '8px', marginTop: '20px' }}>
      <p>Submitted by: Manit Saxena | Section: KRG-1 (B)</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', margin: 0, padding: 0 }}>
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
