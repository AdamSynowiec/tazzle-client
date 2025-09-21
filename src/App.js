import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectRoute from "./routes/ProtectRoute";
import Login from "./features/Auth/Login";
import Logout from "./features/Auth/Logout";
import Home from "./features/Home/Home";
import { AuthProvider } from "./context/authContext";
import Create from "./features/Create/Create";
import Projects from "./features/Projects/Projects";
import ProjectsAdd from "./features/Projects/ProjectsAdd";
import ProjectBrowse from "./features/Projects/ProjectBrowse";
import Board from "./features/Board/Board";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main page */}
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          >
            <Route path="board" element={<Board />} />
            <Route path="create" element={<Create />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/add" element={<ProjectsAdd />} />
            <Route path="browse/:id" element={<ProjectBrowse />} />
          </Route>

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Logout page */}
          <Route path="/logout" element={<Logout />} />

          {/* 404 naviate to Login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
