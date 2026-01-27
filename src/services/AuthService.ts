import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";

// register user
export const registerUser = async (signUpData: RegisterData) => {
  const response = await apiClient.post("/auth/register", signUpData);
  return response.data;
};

// login user
export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post<LoginResponseData>(
    "/auth/login",
    loginData
  );

  // ✅ store token after login
  localStorage.setItem("accessToken", response.data.accessToken);

  return response.data;
};

// logout user
export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");

  // ✅ clear token
  localStorage.removeItem("accessToken");

  return response.data;
};

// get current user (protected)
export const getCurrentUser = async (userid:string | undefined) => {
  const response = await apiClient.get<User>(`/users/${userid}`);
  return response.data;
};

// refresh token
export const refreshToken = async () => {
  const response = await apiClient.post<LoginResponseData>("/auth/refresh");
  return response.data;
}


// update user details
export const updateUser = async (userId: string, userData: RegisterData) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
};
