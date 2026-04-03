import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiUrl = `${baseUrl}/api/users/`;

  useEffect(() => {
    console.log(`Fetching users from: ${apiUrl}`);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Users data:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
