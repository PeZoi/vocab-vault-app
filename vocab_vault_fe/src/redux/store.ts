// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'pages/auth';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfigUser = {
   key: 'user',
   storage,
};

const persistedReducerUser = persistReducer(persistConfigUser, authReducer);

const store = configureStore({
   reducer: {
      auth: persistedReducerUser,
   },
});
const persistor = persistStore(store);

export { store, persistor };
