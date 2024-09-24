import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {

  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/signup" element={<Signup setUser={setUser}/>} />
        <Route path='/dashboard' element= {
          <ProtectedRoute>
            <Dashboard user={user}/>
          </ProtectedRoute>
          }/>
      </Routes>
    </Router>
  );
}

export default App;