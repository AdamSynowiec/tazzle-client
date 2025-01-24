import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const { login } = useAuth();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    login(userCredentials.email, userCredentials.password);
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userCredentials.email}
          onChange={inputHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userCredentials.password}
          onChange={inputHandler}
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Login;
