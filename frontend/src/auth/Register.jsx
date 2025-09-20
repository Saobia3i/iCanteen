// src/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.png";

// ⚠️ path ঠিক করো: src/auth → lib এ যেতে এক লেভেল আপ
import { registerUser } from "../lib/auth";

export default function Register() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("customer");
  const [err,setErr] = useState("");
  const [success,setSuccess] = useState("");
  const [loading,setLoading] = useState(false);

  const handleRegister = async (e)=>{
    e.preventDefault();
    setErr(""); setSuccess(""); setLoading(true);

    try {
      // backend call (token localStorage-এ সেট হবে registerUser এর ভিতরেই)
      const user = await registerUser({ name, email, password, role });

      // UI persistence (optional but handy)
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Registration successful! Redirecting...");

      // role normalize & redirect
      const r = (user?.role || role || "customer").toLowerCase();
      setTimeout(()=>{
        if (r === "staff") navigate("/staff", { replace:true });
        else navigate("/customer", { replace:true });
      }, 600);

    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      // 422 হলে প্রায়ই “The email has already been taken.”
      const msg =
        data?.message ||
        (data && typeof data === "object" ? JSON.stringify(data) : null) ||
        error?.message ||
        "Registration failed. Try a different email.";
      console.log("REG_ERR:", status, data || msg);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-decorative-panel">
        <div className="auth-content">
          <div className="auth-brand">
            <img src={logo} alt="iCanteen Logo" />
            <h2>iCanteen</h2>
          </div>
          <h1>Join Us!</h1>
          <p>Create your account to enjoy our canteen services.</p>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
           
          <h2 className="auth-title">Register</h2>

          {err && <p style={{ color:"red", textAlign:"center" }}>{err}</p>}
          {success && <p style={{ color:"green", textAlign:"center" }}>{success}</p>}

          <form onSubmit={handleRegister} className="login-form">
            <div style={{ marginBottom:"1rem" }}>
              <label>Name</label>
              <input
                className="auth-input"
                type="text"
                required
                value={name}
                onChange={e=>setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div style={{ marginBottom:"1rem" }}>
              <label>Email</label>
              <input
                className="auth-input"
                type="email"
                required
                value={email}
                onChange={e=>setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom:"1rem" }}>
              <label>Password</label>
              <input
                className="auth-input"
                type="password"
                required
                value={password}
                onChange={e=>setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div style={{ marginBottom:"1rem" }}>
              <label>Role</label>
              <select
                className="auth-input"
                value={role}
                onChange={e=>setRole(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p style={{ textAlign:"center", marginTop:"1rem" }}>
            Already have an account?{" "}
            <span
              style={{ color:"#1677ff", cursor:"pointer" }}
              onClick={()=>navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
