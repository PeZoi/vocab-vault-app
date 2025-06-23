import { createApi } from '@reduxjs/toolkit/query/react';
import { CardMatchResponse } from 'types';
import { axiosBaseQuery } from './baseQuery';

export const cardMatchApi = createApi({
  reducerPath: 'cardMatchApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CardMatch'],
  endpoints: (builder) => ({
    getCardMatch: builder.query<CardMatchResponse, { id: any }>({
      query: ({ id }) => ({
        url: `/api/card-matches/get/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => [{ type: 'CardMatch', id }],
    }),
    isUnlockCardMatch: builder.query<any, string>({
      query: (id) => ({
        url: `/api/card-matches/is-unlock/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'CardMatch', id }],
    }),
  }),
});

export const {
  useGetCardMatchQuery,
  useIsUnlockCardMatchQuery,
} = cardMatchApi; 