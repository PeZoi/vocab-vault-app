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