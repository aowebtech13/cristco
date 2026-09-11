import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");

      const publicAuthPath = ["/login", "/register", "/verify-email"].includes(
        window.location.pathname
      );
      if (!publicAuthPath) {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: (endpoint, config = {}) => apiClient.get(endpoint, config),
  post: (endpoint, data = {}, config = {}) =>
    apiClient.post(endpoint, data, config),
  put: (endpoint, data = {}, config = {}) =>
    apiClient.put(endpoint, data, config),
  delete: (endpoint, config = {}) => apiClient.delete(endpoint, config),
};

export default api;
