import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/Login';
import Logout from './features/Logout';
import ProtectRoute from './routes/ProtectRoute';

const App = () => {


  return (
    <Router>
      <Routes>

        {/* Main page */}
        <Route path="/" element={
          <ProtectRoute><>HOME</></ProtectRoute>
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