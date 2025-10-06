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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Zaloguj się
        </h1>
        <form onSubmit={formHandler} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adres e-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="twoj@email.com"
              value={userCredentials.email}
              onChange={inputHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hasło
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={userCredentials.password}
              onChange={inputHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
