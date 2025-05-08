import { ApiResponse } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const getCardMatchAPI = async (id: any): Promise<ApiResponse> => {
  const { data } = await axiosInstance.get(`/api/card-matches/get/${id}`);
  return data;
}

export const isUnlockCardMatchAPI = async (id: any): Promise<ApiResponse> => {
  const { data } = await axiosInstance.get(`/api/card-matches/is-unlock/${id}`);
  return data;
}