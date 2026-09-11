import { createContext, useContext, useState, useEffect } from "react";
import api from "@/utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("auth_token", accessToken);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
