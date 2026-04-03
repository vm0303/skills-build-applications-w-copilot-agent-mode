import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiUrl = `${baseUrl}/api/leaderboard/`;

  useEffect(() => {
    console.log(`Fetching leaderboard from: ${apiUrl}`);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id || index}>
              <td>{index + 1}</td>
              <td>{entry.user}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
