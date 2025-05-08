import { ApiResponse, VocabType } from "types";
import axiosInstance from "utils/axiosInterceptor";
export const createVocabAPI = async (value: VocabType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/vocabs/create", value);
   return data;
}

export const deleteVocabAPI = async (id: any): Promise<ApiResponse> => {
   const { data } = await axiosInstance.delete(`/api/vocabs/delete/${id}`);
   return data;
}

export const updateVocabAPI = async (id: any, value: VocabType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.put(`/api/vocabs/update/${id}`, value);
   return data;
}