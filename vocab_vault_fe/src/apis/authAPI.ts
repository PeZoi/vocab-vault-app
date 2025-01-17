import { ApiResponse, SignInType, SignUpType, verifyType } from "types";
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

export const verifyAPI = async (value: verifyType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post(`/api/auth/verify?verifyCode=${value.verifyCode}&email=${value.email}`);
   return data;
}