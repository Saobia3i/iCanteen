import api from "./api";

export async function registerUser(payload) {
  const { data } = await api.post("/register", payload);
  localStorage.setItem("token", data.token);
  return data.user;
}

export async function loginUser(payload) {
  const { data } = await api.post("/login", payload);
  localStorage.setItem("token", data.token);
  return data.user;
}

export async function fetchMe() {
  const { data } = await api.get("/me");
  return data;
}

/* export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
} */
