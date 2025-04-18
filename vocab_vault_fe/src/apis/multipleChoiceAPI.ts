import { ApiResponse } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const isUnlockMultipleChoiceAPI = async (id: any): Promise<ApiResponse> => {
  const { data } = await axiosInstance.get(`/api/multiple-choices/is-unlock/${id}`);
  return data;
}

export const getMultipleChoiceAPI = async (id: any, totalQuestion: number): Promise<ApiResponse> => {
  const { data } = await axiosInstance.get(`/api/multiple-choices/get/${id}?totalQuestion=${totalQuestion}`);
  return data;
}

export const getResultMultipleChoiceAPI = async (questionsIdList: any[]): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post(`/api/multiple-choices/get-result`, questionsIdList);
  return data;
}