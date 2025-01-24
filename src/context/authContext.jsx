import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({});
  const navigate = useNavigate();
  const login = async (email, password) => {
    if (email === "admin" && password === "admin") {
      setUserCredentials({
        userId: 1,
        userToken: "123123",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("userCredentials", userCredentials);
  }, [userCredentials]);

  const value = { userCredentials, setUserCredentials, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
