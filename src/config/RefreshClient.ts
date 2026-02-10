import axios from "axios";

/* =========================
   REFRESH CLIENT (NO INTERCEPTORS)
========================= */
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshToken = async () => {
  const response = await refreshClient.post("/auth/refresh");
  return response.data;
};
