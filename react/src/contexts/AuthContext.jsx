import { createContext, useContext, useState, useEffect } from "react";
import api from "@/utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const storedToken = localStorage.getItem("auth_token");

    if (!storedToken) {
      setLoading(false);
      return () => {
        active = false;
      };
    }

    // A token in localStorage is not proof of authentication. Validate it
    // with the API before allowing protected dashboard routes to render.
    api
      .get("/user")
      .then(({ data }) => {
        if (!active) return;

        setUser(data.user || data);
        setToken(storedToken);
      })
      .catch((error) => {
        if (!active) return;

        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setUser(null);
        setToken(null);

        if (error.response?.status !== 401) {
          console.error("Session validation failed:", error);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
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
    isAuthenticated: Boolean(token && user),
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
