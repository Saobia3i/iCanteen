// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Switch } from "@mui/material";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(savedTheme === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleToggle = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  // Styles based on darkMode
  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 2rem",
    backgroundColor: darkMode ? "#333" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#333",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  };

  return (
    <Box sx={navStyle}>
      {/* Logo + Name */}
      <Box sx={logoStyle} onClick={() => navigate("/")}>
        <img src={logo} alt="iCanteen Logo" style={{ width: 40, height: 40 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          iCanteen
        </Typography>
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2">{darkMode ? "Dark" : "Light"} Mode</Typography>
        <Switch checked={darkMode} onChange={handleToggle} />
        <Button
          variant="contained"
          color={darkMode ? "warning" : "primary"}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
