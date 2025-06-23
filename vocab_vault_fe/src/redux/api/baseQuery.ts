import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axiosInstance from 'utils/axiosInterceptor';

export const axiosBaseQuery = (): BaseQueryFn => {
  return async ({ url, method, data, params, responseType }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        responseType,
      });
      // Return the raw response for blob data
      if (responseType === 'blob') {
        return { data: result.data };
      }
      return { data: result.data.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
}; 