import { createApi } from '@reduxjs/toolkit/query/react';
import { VocabType } from 'types';
import { axiosBaseQuery } from './baseQuery';

export const vocabApi = createApi({
  reducerPath: 'vocabApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Vocab'],
  endpoints: (builder) => ({
    createVocab: builder.mutation<any, VocabType>({
      query: (vocab) => ({
        url: '/api/vocabs/create',
        method: 'POST',
        data: vocab,
      }),
    }),

    deleteVocab: builder.mutation<any, { id: any }>(
      {
        query: ({ id }) => ({
          url: `/api/vocabs/delete/${id}`,
          method: 'DELETE',
        }),
      }
    ),

    updateVocab: builder.mutation<any, { id: any; data: VocabType }>(
      {
        query: ({ id, data }) => ({
          url: `/api/vocabs/update/${id}`,
          method: 'PUT',
          data,
        }),
      }
    ),

    getSoundForWord: builder.query<any, { word: string }>({
      query: ({ word }) => ({
        url: `/api/proxy/sound?word=${word}`,
        method: 'GET',
        responseType: 'blob',
      }),
    }),
  }),
});


export const {
  useCreateVocabMutation,
  useDeleteVocabMutation,
  useUpdateVocabMutation,
  useGetSoundForWordQuery,
} = vocabApi; 