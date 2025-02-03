import { ApiResponse } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const suggestEnAPI = async (prefix: string): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/proxy/suggestions-en?prefix=${prefix}`);
   return data;
}

export const suggestViAPI = async (word: string, prefix: string): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/proxy/suggestions-vi?word=${word}&prefix=${prefix}`);
   return data;
}

export const generateWordAPI = async (word: string): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/proxy/generate-word?word=${word}`);
   return data;
}

export const getSoundForWord = async (word: string = '') => {
   if (word) {
      const { data } = await axiosInstance.get(`/api/proxy/sound?word=${word}`, {
         responseType: 'blob'
      });
      return data;
   }
}