import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './components/Admin.jsx';
import Customer from './components/Customer.jsx';
import Login from './components/Login.jsx';
import MainLayout from './components/MainLayout.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" />} />
          <Route path="/customers" element={<Customer />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/admin"
            element={isAuthenticated ? <Admin /> : <Navigate to="/login" />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;