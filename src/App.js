import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectRoute from './routes/ProtectRoute';
import Login from './features/Auth/Login';
import Logout from './features/Auth/Logout';
import Home from './features/Home/Home';

const App = () => {


  return (
    <Router>
      <Routes>

        {/* Main page */}
        <Route path="/" element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        } />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Logout page */}
        <Route path="/logout" element={<Logout />} />

        {/* 404 naviate to Login */}
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  )
}

export default App