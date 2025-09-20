// src/components/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideChrome =
    location.pathname.startsWith("/Login") ||
    location.pathname.startsWith("/Register") ||
    location.pathname.startsWith("/auth");

  if (hideChrome) return null;

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-fg)",
      }}
    >
      <Typography variant="body2" sx={{ color: "var(--footer-fg)" }}>
        &copy; {new Date().getFullYear()} iCanteen. All rights reserved.
      </Typography>
    </Box>
  );
}
