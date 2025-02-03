import { ApiResponse } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const getFlashCardAPI = async (id: any): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/flash-cards/get/${id}`);
   return data;
}