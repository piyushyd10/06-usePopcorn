import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./App"; // reuse navbar styling
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (isAuthenticated) {
    return (
      <div style={{ marginTop: "4rem", textAlign: "center" }}>
        <p>You are already logged in.</p>
        <button className="btn-auth" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar movies={[]}>{/* empty center */}</Navbar>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{mode === "login" ? "Login" : "Create Account"}</h2>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button disabled={loading} className="btn-auth" type="submit">
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
          <button
            type="button"
            className="btn-auth btn-auth--secondary"
            onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
          >
            {mode === "login"
              ? "Need an account? Sign up"
              : "Have an account? Log in"}
          </button>
        </form>
      </div>
    </>
  );
}
