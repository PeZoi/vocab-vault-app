import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseQuery';

export const multipleChoiceApi = createApi({
  reducerPath: 'multipleChoiceApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['MultipleChoice'],
  endpoints: (builder) => ({
    isUnlockMultipleChoice: builder.query<any, string>({
      query: (id) => ({
        url: `/api/multiple-choices/is-unlock/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'MultipleChoice', id }],
    }),
    getMultipleChoice: builder.query<any, { id: string; totalQuestion: number }>({
      query: ({ id, totalQuestion }) => ({
        url: `/api/multiple-choices/get/${id}?totalQuestion=${totalQuestion}`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) => [{ type: 'MultipleChoice', id }],
    }),
    getResultMultipleChoice: builder.mutation<any, any[]>({
      query: (questionsIdList) => ({
        url: '/api/multiple-choices/get-result',
        method: 'POST',
        data: questionsIdList,
      }),
    }),
  }),
});

export const {
  useIsUnlockMultipleChoiceQuery,
  useGetMultipleChoiceQuery,
  useGetResultMultipleChoiceMutation,
} = multipleChoiceApi; 