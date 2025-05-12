import { ApiResponse, SignInType, SignUpType, verifyType } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const signInAPI = async (value: SignInType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/auth/login", value);
   return data;
}

export const signUpAPI = async (value: SignUpType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/auth/register", value);
   return data;
}

export const socialSignInAPI = async (loginType: string): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get("/api/auth/social-login?type=" + loginType);
   return data;
}

export const socialCallBackAPI = async (value: { loginType: string, code: string }): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/auth/social/callback?type=${value.loginType}&code=${value.code}`);
   return data;
}

export const logOutAPI = async (): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get("/api/auth/logout");
   return data;
}

export const refreshTokenAPI = async (): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/auth/refresh-token");
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

export const forgotPasswordAPI = async (value: { email: string }): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post(`/api/auth/forgot-password?email=${value.email}`);
   return data;
}

export const resetPasswordAPI = async (value: { token: string }): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post(`/api/auth/reset-password?token=${value.token}`);
   return data;
}

export const changePasswordAPI = async (value: { token: string, password: string }): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post(`/api/auth/change-password?token=${value.token}&password=${value.password}`);
   return data;
}

