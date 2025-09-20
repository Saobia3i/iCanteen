// src/pages/staff/StaffLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import bgImage from '../../assets/s-bg.jpg';

export default function StaffLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',          // ensures at least full viewport height
        width: '100%',               // full width
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',     // cover entire area
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        overflowX: 'hidden',         // prevent horizontal scroll
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Optional overlay for better readability if needed */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)', // dark overlay for contrast
          zIndex: 0,
        }}
      />

      {/* Render the child page */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
}
