import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import useAuth from "@/auth/store";
import { refreshToken } from "./RefreshClient";

/* =========================
   MAIN API CLIENT
========================= */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://3.110.155.78.nip.io:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   REFRESH STATE
========================= */
let isRefreshing = false;
let pendingQueue: ((token: string | null) => void)[] = [];

const queueRequest = (cb: (token: string | null) => void) => {
  pendingQueue.push(cb);
};

const resolveQueue = (token: string | null) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};

/* =========================
   RESPONSE INTERCEPTOR
========================= */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const is401 = error.response?.status === 401;

    if (!is401 || originalRequest.__isRetryRequest) {
      return Promise.reject(error);
    }

    originalRequest.__isRetryRequest = true;

    /* =========================
       IF ALREADY REFRESHING
    ========================= */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queueRequest((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    /* =========================
       START REFRESH FLOW
    ========================= */
    isRefreshing = true;

    try {
      console.log("Refreshing access token...");

      const loginResponse = await refreshToken(); // MUST use separate axios
      const newToken = loginResponse.accessToken;

      if (!newToken) {
        throw new Error("No access token returned");
      }

      // Update global auth state
      useAuth.getState().changeLocalLoginData(
        newToken,
        loginResponse.user,
        true
      );

      localStorage.setItem("accessToken", newToken);

      resolveQueue(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      console.error("Token refresh failed", err);

      resolveQueue(null);
      useAuth.getState().logout();
      localStorage.removeItem("accessToken");

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
