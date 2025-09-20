import React, { useEffect, useState } from "react";
import StaffMenu from "./StaffMenu";
import api from "../../lib/api";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ListAlt as OrdersIcon,
  AccessTime as ShiftsIcon,
  Person as ProfileIcon,
} from "@mui/icons-material";

import staffLogo from "../../assets/logo.png";
import sBg from "../../assets/s-bg.jpg";

// ❌ ডাবল হওয়ার কারণ: App.jsx-এ গ্লোবাল Navbar/Footer আছে
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

import Order from "./Order";
import Shifts from "./Shifts";
import Profile from "./Profile";

export default function StaffHome() {
  const [activePage, setActivePage] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ড্যাশবোর্ড কার্ডের রিয়েল ডেটা (backend থেকে)
  const [summary, setSummary] = useState({
    todayTotal: 0,
    pending: 0,
    delivered: 0,
    activeStaff: 0,
  });

  useEffect(() => {
    // GET /api/staff/summary  (role:staff টোকেন লাগবে)
    const loadSummary = async () => {
      try {
        const { data } = await api.get("/staff/summary");
        setSummary({
          todayTotal: data?.todayTotal ?? 0,
          pending: data?.pending ?? 0,
          delivered: data?.delivered ?? 0,
          activeStaff: data?.activeStaff ?? 0,
        });
      } catch (e) {
        // নেটওয়ার্ক/অথ হলে fallback স্ট্যাটিক দেখাবে
        console.error("SUMMARY_ERR", e?.response?.status, e?.response?.data);
      }
    };
    loadSummary();
  }, []);

  const stats = [
    {
      title: "Total Orders Today",
      value: String(summary.todayTotal),
      color: "#3B82F6",
      change: "",
    },
    {
      title: "Pending Orders",
      value: String(summary.pending),
      color: "#F59E0B",
      change: "",
    },
    {
      title: "Delivered Orders",
      value: String(summary.delivered),
      color: "#10B981",
      change: "",
    },
    {
      title: "Active Staff",
      value: String(summary.activeStaff),
      color: "#8B5CF6",
      change: "",
    },
  ];

  const navButtons = [
    { label: "Dashboard", key: "dashboard", color: "#F59E0B", icon: <DashboardIcon /> },
    { label: "Orders", key: "orders", color: "#FBBF24", icon: <OrdersIcon /> },
    { label: "Menu", key: "menu", color: "#F59E0B", icon: <DashboardIcon /> },
    { label: "Shifts", key: "shifts", color: "#F59E0B", icon: <ShiftsIcon /> },
    { label: "Profile", key: "profile", color: "#FBBF24", icon: <ProfileIcon /> },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${sBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* গ্লোবাল Navbar App.jsx এ already আছে */}
      {/* <Navbar /> */}

      {/* Sidebar Drawer toggle */}
      <IconButton
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          top: 80,
          left: 16,
          zIndex: 1200,
          backgroundColor: "#FFB347",
          "&:hover": { backgroundColor: "#FFA500" },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 240, backgroundColor: "rgba(255,255,255,0.95)" } }}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Avatar src={staffLogo} alt="Logo" sx={{ width: 80, height: 80 }} />
          {navButtons.map((btn) => (
            <Button
              key={btn.key}
              startIcon={btn.icon}
              onClick={() => {
                setActivePage(btn.key);
                setDrawerOpen(false);
              }}
              sx={{
                width: "100%",
                color: activePage === btn.key ? "white" : btn.color,
                backgroundColor: activePage === btn.key ? btn.color : "transparent",
                fontWeight: "bold",
                justifyContent: "flex-start",
                textTransform: "none",
                px: 2,
                "&:hover": {
                  backgroundColor: activePage === btn.key ? btn.color : "rgba(0,0,0,0.05)",
                },
              }}
            >
              {btn.label}
            </Button>
          ))}
        </Box>
      </Drawer>

      {/* Spacer for fixed navbar height */}
      <Box sx={{ height: { xs: 80, sm: 100 } }} />

      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 4,
          px: { xs: 2, lg: 20 },
          color: "#FFD700",
          textShadow: "1px 1px 2px black",
        }}
      >
        {activePage === "dashboard" && "📊 Dashboard Overview"}
        {activePage === "orders" && "📦 Order Management"}
        {activePage === "menu" && <StaffMenu />}
        {activePage === "shifts" && "⏰ Staff Shifts"}
        {activePage === "profile" && "👤 My Profile"}
      </Typography>

      {/* Body */}
      <Box sx={{ px: { xs: 2, lg: 20 }, pb: 8 }}>
        {activePage === "dashboard" && (
          <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card sx={{ p: 3, border: `2px solid ${stat.color}`, backgroundColor: "rgba(255,255,255,0.85)" }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: stat.color }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
                      {stat.value}
                    </Typography>
                    {stat.change && <Typography variant="body2">{stat.change}</Typography>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {activePage === "orders" && <Order />}
        {activePage === "shifts" && <Shifts />}
        {activePage === "profile" && <Profile />}
      </Box>

      {/* গ্লোবাল Footer App.jsx এ already আছে */}
      {/* <Footer /> */}
    </Box>
  );
}
