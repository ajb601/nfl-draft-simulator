import React, { useState } from 'react';
import PlayerCard from './components/PlayerCard';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayerStats = async () => {
    setLoading(true);
  
    try {
      const res = await fetch('/.netlify/functions/getPlayerStats');
      const data = await res.json();
      console.log("API data:", data); // ← Log here
  
      setPlayers(data);
    } catch (err) {
      console.error('Error fetching player stats:', err);
    }
  
    setLoading(false);
  };  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>NFL Draft Simulator (Prototype)</h1>
      <button onClick={fetchPlayerStats}>
        {loading ? 'Loading...' : 'Get Alabama Players'}
      </button>

      {players.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          {players.map((player, index) => (
            <PlayerCard key={index} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
