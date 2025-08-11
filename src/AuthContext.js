import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// API base; can be overridden with REACT_APP_API_BASE
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.token && parsed?.user) {
          setToken(parsed.token);
          setUser(parsed.user);
        }
      }
    } catch (e) {
      // ignore corrupt storage
    } finally {
      setInitializing(false);
    }
  }, []);

  function persist(next) {
    localStorage.setItem("auth", JSON.stringify(next));
  }

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    setUser(data.user);
    setToken(data.token);
    persist({ user: data.user, token: data.token });
    return data.user;
  }, []);

  const register = useCallback(
    async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      // Auto-login after registration
      await login(email, password);
      return data;
    },
    [login]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  }, []);

  const value = {
    user,
    token,
    initializing,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
