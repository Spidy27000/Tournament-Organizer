import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tournament from './pages/Tournament';
import Layout from './component/Layout';
import Create from './pages/Create';
import JoinTournament from './pages/JoinTournament';
import ViewTournament from './pages/ViewTournament';
import Team from './pages/Team';


function App() {

  const [user, setUser] = useState();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage and storing it
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  //Restricting Access to other pages if no user found
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <Layout>{children}</Layout>;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/signup" element={<Signup setUser={setUser}/>} />
        <Route path='/dashboard' element= {
          <ProtectedRoute>
            <Dashboard user={user}/>            
          </ProtectedRoute>
          }/>
          <Route path='/Tournament' element= {
          <ProtectedRoute>
            <Tournament user={user}/>
          </ProtectedRoute>
          }/>
          <Route path='/Create' element= {
          <ProtectedRoute>
            <Create user={user}/>
          </ProtectedRoute>
          }/>
          <Route path='/joinTournament/:tournamentName' element= {
          <ProtectedRoute>
            <JoinTournament user={user}/>
          </ProtectedRoute>
          }/>
          <Route path='/ViewTournament/:tournamentId' element= {
          <ProtectedRoute>
            <ViewTournament user={user}/>
          </ProtectedRoute>
          }/>
          <Route path='/Team' element= {
          <ProtectedRoute>
            <Team user={user}/>
          </ProtectedRoute>
          }/>                    
      </Routes>
    </Router>
  );
}

export default App;