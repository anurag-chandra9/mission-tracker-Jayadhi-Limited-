import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MissionDetails from './pages/MissionDetails.jsx';
import CreateMission from './pages/CreateMission.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/mission/:id" element={token ? <MissionDetails /> : <Navigate to="/login" />} />
        <Route path="/create" element={token ? <CreateMission /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;