import { createApi } from '@reduxjs/toolkit/query/react';
import { DeckResponseType, DeckRequestType } from 'types';
import { axiosBaseQuery } from './baseQuery';

export const deckApi = createApi({
  reducerPath: 'deckApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Deck'],
  endpoints: (builder) => ({
    getAllPublicDecks: builder.query<DeckResponseType[], void>({
      query: () => ({
        url: '/api/decks/get-all',
        method: 'GET',
      }),
      providesTags: ['Deck'],
    }),
    getMyDecks: builder.query<DeckResponseType[], void>({
      query: () => ({
        url: '/api/decks/my-decks',
        method: 'GET',
      }),
      providesTags: ['Deck'],
    }),
    getDeckById: builder.query<DeckResponseType, string>({
      query: (id) => ({
        url: `/api/decks/get-deck/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Deck', id }],
    }),
    getVocabTotalByDeckId: builder.query<number, string>({
      query: (id) => ({
        url: `/api/decks/get-vocab-total/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Deck', id }],
    }),
    createDeck: builder.mutation<DeckResponseType, DeckRequestType>({
      query: (deck) => ({
        url: '/api/decks/create',
        method: 'POST',
        data: deck,
      }),
      invalidatesTags: ['Deck'],
    }),
    updateDeck: builder.mutation<DeckResponseType, { id: any; data: Partial<DeckRequestType> }>({
      query: ({ id, data }) => ({
        url: `/api/decks/update/${id}`,
        method: 'PUT',
        data,
      }),
      // This will invalidate both the specific deck and all deck lists
      invalidatesTags: (result, error, { id }) => [
        { type: 'Deck', id },
        'Deck'
      ],
    }),
    deleteDeck: builder.mutation<DeckResponseType, { id: any }>({
      query: ({ id }) => ({
        url: `/api/decks/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Deck'],
    }),
  }),
});

export const {
  useGetAllPublicDecksQuery,
  useGetMyDecksQuery,
  useGetDeckByIdQuery,
  useGetVocabTotalByDeckIdQuery,
  useCreateDeckMutation,
  useUpdateDeckMutation,
  useDeleteDeckMutation
} = deckApi; 