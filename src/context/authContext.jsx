import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({});
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await fetch(
        `http://localhost:3001/v1/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Błąd logowania");

      setUserCredentials(data.data);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    setUserCredentials({});
    navigate("/login"); // Przekierowanie na stronę logowania
  };

  useEffect(() => {
  }, [userCredentials]);

  const value = { userCredentials, setUserCredentials, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
