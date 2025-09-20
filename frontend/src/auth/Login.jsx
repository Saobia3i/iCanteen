// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.png";

import { loginUser } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // backend call (token + user return করে)
      const user = await loginUser({ email, password });

      // persist
      localStorage.setItem("user", JSON.stringify(user));

      // role অনুযায়ী redirect
      const role = (user?.role || "customer").toLowerCase();
      if (role === "staff") navigate("/staff", { replace: true });
      else navigate("/customer", { replace: true });
    } catch (error) {
      // error.details দেখাও (undefined undefined এড়াতে)
      const status = error?.response?.status;
      const data = error?.response?.data;
      const msg =
        data?.message ||
        (data && typeof data === "object" ? JSON.stringify(data) : null) ||
        error?.message ||
        "Login failed.";
      console.log("LOGIN_ERR:", status, data || msg);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Decorative panel (unchanged) */}
      <div className="auth-decorative-panel">
        <div className="auth-content">
            <div className="auth-brand">
              <img src={logo} alt="iCanteen Logo" />
              <h2>iCanteen</h2>
            </div>
          <h1>Welcome Back!</h1>
          <p>Log in to continue managing your canteen experience.</p>
        </div>
      </div>

      {/* Form panel (unchanged UI) */}
      <div className="auth-form-panel">
        <div className="auth-card">
           
          <h2 className="auth-title">Login</h2>

          {err && (
            <p style={{ color: "red", textAlign: "center" }}>
              {err}
            </p>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div style={{ marginBottom: "1rem" }}>
              <label>Email</label>
              <input
                className="auth-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>Password</label>
              <input
                className="auth-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#1677ff", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
