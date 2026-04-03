import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand fw-bold">OctoFit Tracker</span>
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
