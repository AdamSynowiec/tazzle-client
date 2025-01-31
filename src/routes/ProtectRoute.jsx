import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectRoute = ({ children }) => {
  const { userCredentials } = useAuth();

  return userCredentials.userToken ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
