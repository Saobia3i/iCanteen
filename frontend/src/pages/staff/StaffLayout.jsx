// src/pages/staff/StaffLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import bgImage from '../../assets/s-bg.jpg';



// src/pages/staff/StaffLayout.jsx
export default function StaffLayout() {
  return (
    <div
      style={{
        position: 'relative',        // ✅ যোগ করুন
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
}
