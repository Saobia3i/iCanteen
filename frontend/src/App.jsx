// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Pages
import CustomerHome from "./pages/customer/CustomerHome";
import StaffLayout from "./pages/staff/StaffLayout";
import StaffHome from "./pages/staff/StaffHome";
import Order from "./pages/staff/Order";
import Shifts from "./pages/staff/Shifts";


import CustomerProfile from "./pages/customer/Profile";
import StaffProfile from "./pages/staff/Profile";

// Auth
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";

// Shared UI
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GeminiChatWidget from "./components/GeminiChatWidget";

import Menu from "./pages/customer/Menu";
import AboutUs from "./pages/customer/AboutUs";
import Contact from "./pages/customer/Contact";

// --- tiny helper to hide chrome on auth routes (no route changes) ---
const AUTH_PREFIXES = ["/login", "/register", "/auth"];
function HideOnAuth({ children }) {
  const { pathname } = useLocation();
  const onAuth = AUTH_PREFIXES.some((p) => pathname.startsWith(p));
  return onAuth ? null : children;
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* hide navbar on /login, /register, /auth/* */}
      <HideOnAuth>
        <Navbar />
      </HideOnAuth>

      <div className="flex-1">
        <Routes>
          {/* Redirect root → /customer */}
          <Route path="/" element={<Navigate to="/customer" replace />} />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer */}
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="menu" element={<Menu />} /> {/* <-- SAFE */}
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />

          {/* Staff (nested) */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffHome />} />
            <Route path="orders" element={<Order />} />
            <Route path="shifts" element={<Shifts />} />
            <Route path="profile" element={<StaffProfile />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div style={{ padding: 24 }}>
                <h2>404 — Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </div>

      {/* hide footer on /login, /register, /auth/* */}
      <HideOnAuth>
        <GeminiChatWidget />
        <Footer />
        
      </HideOnAuth>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
