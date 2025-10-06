import React from "react";
import { useAuth } from "../context/authContext";
import Login from "../features/Auth/Login";

const ProtectRoute = ({ children }) => {
  const { userCredentials } = useAuth();
  return userCredentials.user_id ? children : <Login />;
};

export default ProtectRoute;
