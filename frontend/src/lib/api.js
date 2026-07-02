import axios from "axios";

const normalizeApiUrl = (url) => url?.replace(/\/+$/, "");
const apiBaseUrl = normalizeApiUrl(import.meta.env.VITE_API_URL);

if (!apiBaseUrl) {
  throw new Error("Missing VITE_API_URL. Set it to your deployed backend URL ending with /api.");
}

const api = axios.create({
  baseURL: apiBaseUrl,
});

// প্রতিটা request-এ localStorage থেকে token পড়ে header-এ attach করো
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
