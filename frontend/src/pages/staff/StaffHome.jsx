import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import sBg from "../../assets/s-bg.jpg";

export default function StaffHome() {
  const [summary, setSummary] = useState({
    todayTotal: 0,
    pending: 0,
    delivered: 0,
    activeStaff: 0,
  });

  useEffect(() => {
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
        console.error("SUMMARY_ERR", e?.response?.status, e?.response?.data);
      }
    };

    loadSummary();
  }, []);

  const stats = [
    { title: "Total Orders Today", value: String(summary.todayTotal), color: "#3B82F6" },
    { title: "Pending Orders", value: String(summary.pending), color: "#F59E0B" },
    { title: "Delivered Orders", value: String(summary.delivered), color: "#10B981" },
    { title: "Active Staff", value: String(summary.activeStaff), color: "#8B5CF6" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${sBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: { xs: 2, lg: 20 },
        py: { xs: 4, lg: 8 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "#FFD700",
          textShadow: "1px 1px 2px black",
        }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card sx={{ p: 3, border: `2px solid ${stat.color}`, backgroundColor: "rgba(255,255,255,0.85)" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: stat.color }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
