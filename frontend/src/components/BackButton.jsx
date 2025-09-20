// src/components/BackButton.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton({ label = "← Back" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (pathname.startsWith("/staff")) {
      // staff page → সবসময় StaffHome এ নেবে
      navigate("/staff", { replace: true });
    } else {
      // অন্য সব → CustomerHome এ নেবে
      navigate("/customer", { replace: true });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-transparent text-white border border-white rounded-lg 
                 hover:bg-white/20 transition duration-200"
      style={{
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid white",
      }}
    >
      {label}
    </button>
  );
}
