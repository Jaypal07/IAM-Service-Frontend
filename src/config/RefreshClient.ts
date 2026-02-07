import axios from "axios";

/* =========================
   REFRESH CLIENT (NO INTERCEPTORS)
========================= */
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://3.110.155.78.nip.io:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshToken = async () => {
  const response = await refreshClient.post("/auth/refresh");
  return response.data;
};
