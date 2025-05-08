import { ApiResponse } from "types";
import axiosInstance from "utils/axiosInterceptor";

export const checkParagraphAPI = async (paragraph: string): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("paragraph", paragraph);
  const { data } = await axiosInstance.post(`/api/proxy/check-paragraph`, formData);
  return data;
}