import React from 'react';

function PlayerCard({ player }) {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <h3>{player.player || 'Unknown Player'}</h3>
      <p><strong>Team:</strong> {player.team}</p>
      <p><strong>Position:</strong> {player.position}</p>
      <p><strong>Season:</strong> {player.season}</p>
      <p><strong>Category:</strong> {player.category}</p>
      <p><strong>Stat Type:</strong> {player.statType}</p>
      <p><strong>Stat:</strong> {player.stat}</p>
    </div>
  );
}

export default PlayerCard;
