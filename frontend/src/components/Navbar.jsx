// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  ArrowBack,
  Dashboard,
  Home,
  Info,
  Logout,
  Mail,
  Menu as MenuIcon,
  Person,
  RestaurantMenu,
  ReceiptLong,
} from "@mui/icons-material";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load saved theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(savedTheme === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleToggle = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const isStaff = pathname.startsWith("/staff");
  const canGoBack = pathname !== "/" && pathname !== "/customer" && pathname !== "/staff";
  const homePath = isStaff ? "/staff" : "/customer";

  const menuItems = isStaff
    ? [
        { label: "Dashboard", path: "/staff", icon: <Dashboard /> },
        { label: "Orders", path: "/staff/orders", icon: <ReceiptLong /> },
        { label: "Menu", path: "/staff/menu", icon: <RestaurantMenu /> },
        { label: "Shifts", path: "/staff/shifts", icon: <AccessTime /> },
        { label: "Profile", path: "/staff/profile", icon: <Person /> },
      ]
    : [
        { label: "Home", path: "/customer", icon: <Home /> },
        { label: "Menu Items", path: "/menu", icon: <RestaurantMenu /> },
        { label: "Profile", path: "/customer/profile", icon: <Person /> },
        { label: "About Us", path: "/about-us", icon: <Info /> },
        { label: "Contact", path: "/contact", icon: <Mail /> },
      ];

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

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
    <>
      <Box sx={navStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Open menu">
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="open navigation menu"
              sx={{ color: "inherit" }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {canGoBack && (
            <Tooltip title="Back to home">
              <IconButton
                onClick={() => navigate(homePath, { replace: true })}
                aria-label="back to section home"
                sx={{ color: "inherit" }}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
          )}

          <Box sx={logoStyle} onClick={() => navigate(homePath)}>
            <img src={logo} alt="iCanteen Logo" style={{ width: 40, height: 40 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              iCanteen
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
            {darkMode ? "Dark" : "Light"} Mode
          </Typography>
          <Switch checked={darkMode} onChange={handleToggle} />
          <Button
            variant="contained"
            color={darkMode ? "warning" : "primary"}
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, py: 2 }}>
          <Box sx={{ px: 2, pb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="iCanteen Logo" style={{ width: 44, height: 44 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                iCanteen
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isStaff ? "Staff menu" : "Customer menu"}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                selected={pathname === item.path}
                onClick={() => goTo(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
