// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'pages/auth';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cardMatchApi, deckApi, flashCardApi, multipleChoiceApi, vocabApi } from './api';

const persistConfigUser = {
   key: 'user',
   storage,
};

const persistedReducerUser = persistReducer(persistConfigUser, authReducer);

const store = configureStore({
   reducer: {
      auth: persistedReducerUser,
      [deckApi.reducerPath]: deckApi.reducer,
      [vocabApi.reducerPath]: vocabApi.reducer,
      [flashCardApi.reducerPath]: flashCardApi.reducer,
      [multipleChoiceApi.reducerPath]: multipleChoiceApi.reducer,
      [cardMatchApi.reducerPath]: cardMatchApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         deckApi.middleware,
         vocabApi.middleware,
         flashCardApi.middleware,
         multipleChoiceApi.middleware,
         cardMatchApi.middleware,
      ),
});

const persistor = persistStore(store);

export { persistor, store };

