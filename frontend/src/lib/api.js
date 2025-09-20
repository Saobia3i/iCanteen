
// D:\iCanteen-Dev\iCanteen-Dev\frontend\src\lib\api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // IMPORTANT
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
