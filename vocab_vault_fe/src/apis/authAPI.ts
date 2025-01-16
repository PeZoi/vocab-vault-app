import { ApiResponse, SignInType, SignUpType } from "types";
import axiosInstance from "utils/axiosInterceptor"

export const signInAPI = async (value: SignInType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/auth/login", value);
   return data;
}

export const signUpAPI = async (value: SignUpType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/auth/register", value);
   return data;
}

export const logOutAPI = async (): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get("/api/auth/logout");
   return data;
}

export const getProfileAPI = async (): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get("/api/users/profile");
   return data;
}