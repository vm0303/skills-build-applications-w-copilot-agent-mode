import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiUrl = `${baseUrl}/api/activities/`;

  useEffect(() => {
    console.log(`Fetching activities from: ${apiUrl}`);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Activities data:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={activity.id || index}>
              <td>{activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
