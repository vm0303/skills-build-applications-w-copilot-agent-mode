import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiUrl = `${baseUrl}/api/teams/`;

  useEffect(() => {
    console.log(`Fetching teams from: ${apiUrl}`);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Teams data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id || index}>
              <td>{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
