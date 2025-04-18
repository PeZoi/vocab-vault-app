import { ApiResponse, DeckRequestType } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const createDeckAPI = async (value: DeckRequestType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.post("/api/decks/create", value);
   return data;
}

export const getAllDeckPublicAPI = async (): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get("/api/decks/get-all");
   return data;
}

export const getAllMyDeckAPI = async (): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get("/api/decks/my-decks");
   return data;
}

export const getDeckByIdAPI = async (id: any): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/decks/get-deck/${id}`);
   return data;
}

export const getVocabTotalByDeckIdAPI = async (id: any): Promise<ApiResponse> => {
   const { data } = await axiosInstance.get(`/api/decks/get-vocab-total/${id}`);
   return data;
}

export const deleteDeckByIdAPI = async (id: any): Promise<ApiResponse> => {
   const { data } = await axiosInstance.delete(`/api/decks/delete/${id}`);
   return data;
}

export const updateDeckAPI = async (id: any, value: DeckRequestType): Promise<ApiResponse> => {
   const { data } = await axiosInstance.put(`/api/decks/update/${id}`, value);
   return data;
}