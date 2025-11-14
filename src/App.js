import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import { CssBaseline, Box } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // GLOBAL PROJECT STATE
  const [projects, setProjects] = React.useState([]);

  return (
    <Router>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLoginSuccess={() => setIsLoggedIn(true)} />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  onLogout={() => setIsLoggedIn(false)}
                  projects={projects}
                  setProjects={setProjects}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/project/:id"
            element={
              isLoggedIn ? (
                <ProjectDetails
                  projects={projects}
                  setProjects={setProjects}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
