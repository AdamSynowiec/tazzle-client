import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {

    //check if user has access
    const hasAccess = false;

    return (
        hasAccess ? children : <Navigate to="/login" />
    )
}

export default ProtectRoute