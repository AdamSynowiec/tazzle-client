import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const { userCredentials, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Zamykaj menu po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Funkcja do generowania koloru na podstawie pierwszej litery
  const getColorByLetter = (letter) => {
    const colors = [
      "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
      "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
      "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
      "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#FFCDD2",
      "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B2DFDB"
    ];
    if (!letter) return "#000";
    const charCode = letter.toUpperCase().charCodeAt(0);
    const index = (charCode - 65) % colors.length;
    return colors[index];
  };

  // Funkcja do inicjałów
  const getInitials = (username) => {
    if (!username) return "";
    const names = username.split(" ");
    return names.map(word => word[0].toUpperCase()).join("");
  };

  return (
    <div className="h-svh">
      <div className="h-16">
        <div className="flex items-center justify-between h-full px-6 border-b">
          {/* Logo i nawigacja */}
          <div className="grid grid-cols-[250px_1fr]">
            <div className="flex items-center gap-1 hover:text-blue-600">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11 6.5h2M11 18h2m-7-5v-2m12 2v-2M5 8h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0 12h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm12 0h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0-12h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z"
                />
              </svg>

              <h1 className="font-poppins text-xl font-normal">
                <Link to={"/"}>Tazzle</Link>
              </h1>
            </div>
            <nav className="h-full">
              <ul className="h-full flex items-center justify-center gap-2 font-poppins text-sm font-normal">
                <li>
                  <Link to={"board"} className="hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                    Twoja praca
                  </Link>
                </li>
                <li>
                  <Link to={"projects"} className="hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                    Projekty
                  </Link>
                </li>
                <li>
                  <Link
                    to={"create"}
                    className="hover:bg-blue-600 p-2 rounded-md cursor-pointer bg-blue-500 p-2 rounded text-white font-medium"
                  >
                    Utwórz
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Awatar + menu */}
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-poppins text-sm font-light cursor-pointer"
              style={{ backgroundColor: getColorByLetter(getInitials(userCredentials.username)[0]) }}
            >
              {getInitials(userCredentials.username)}
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-sm font-poppins">
                <p className="px-4 py-2 text-gray-700 border-b">
                  {userCredentials.username}
                </p>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Wyloguj
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Główna sekcja */}
      <div className="grid grid-cols-[250px_1fr] h-[calc(100vh_-_64px)]">
        <div className="h-full p-6 border-r">
          <ul className="space-y-4">
            <li>
              <Link to={"board"} className="hover:bg-slate-100 rounded-md cursor-pointer">
                Twoja praca
              </Link>
            </li>
            <li>
              <Link to={"projects"} className="hover:bg-slate-100 rounded-md cursor-pointer">
                Projekty
              </Link>
            </li>
            <li>
              <Link to={"create"} className="hover:bg-slate-100 rounded-md cursor-pointer">
                Utwórz
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
