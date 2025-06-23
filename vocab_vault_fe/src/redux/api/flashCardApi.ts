import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseQuery';
import { FlashCardResponse } from 'types';

export const flashCardApi = createApi({
  reducerPath: 'flashCardApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['FlashCard'],
  endpoints: (builder) => ({
    getFlashCard: builder.query<FlashCardResponse, { id: any }>({
      query: ({ id }) => ({
        url: `/api/flash-cards/get/${id}`,
        method: 'GET'
      }),
      providesTags: ['FlashCard'],
    }),
  }),
});

export const {
  useGetFlashCardQuery,
} = flashCardApi; 